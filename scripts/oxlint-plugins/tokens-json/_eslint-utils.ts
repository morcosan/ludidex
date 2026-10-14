import { z, type ZodArray, type ZodObject } from 'zod'
import { evaluateNode, getDefaultExport, getLocFromPath, NotStaticError } from './_json-utils.ts'

type ZodIssue = z.ZodError['issues'][number]
type ErrorId = {
  invalidJson: string
  invalidKeyExtra: string
  invalidKeyMissing: string
  invalidSchema: string
}

const defineJsonValidation = (schema: ZodArray | ZodObject, errorId: ErrorId) => {
  return (context: any) => ({
    Program: (program: any) => {
      const root = getDefaultExport(program)
      if (!root) {
        context.report({ node: program, messageId: errorId.invalidJson, data: { message: 'Missing default export' } })
        return
      }

      let value: unknown
      try {
        value = evaluateNode(root)
      } catch (error) {
        context.report({
          node: error instanceof NotStaticError ? error.node : root,
          messageId: errorId.invalidJson,
          data: { message: error instanceof Error ? error.message : String(error) },
        })
        return
      }

      const result = schema.safeParse(value)
      if (result.success) return

      flattenUnionIssues(result.error.issues).forEach((issue) => {
        if (issue.code === 'unrecognized_keys') {
          issue.keys.forEach((key) => {
            context.report({
              node: root,
              loc: getLocFromPath(root, [...issue.path, key]) ?? root.loc,
              messageId: errorId.invalidKeyExtra,
              data: { key },
            })
          })
        } else {
          const key = issue.path.join('.')
          context.report({
            node: root,
            loc: getLocFromPath(root, issue.path) ?? root.loc,
            messageId: key ? errorId.invalidKeyMissing : errorId.invalidSchema,
            data: {
              key,
              error: issue.message.replace('Invalid input: ', '').replaceAll('"', "'"),
              message: issue.message,
            },
          })
        }
      })
    },
  })
}

const getIssueSpecificity = (issues: ZodIssue[]) => {
  const maxDepth = Math.max(...issues.map((i) => i.path.length), 0)
  const hasMissingKey = issues.some((i) => i.code === 'invalid_type' && i.path.length > 0)
  return maxDepth * 10 + (hasMissingKey ? 1 : 0)
}

const flattenUnionIssues = (issues: ZodIssue[]): ZodIssue[] => {
  return issues.flatMap((issue) => {
    if (issue.code === 'invalid_union') {
      const bestBranch = issue.errors.reduce((best, current) => {
        return getIssueSpecificity(current) >= getIssueSpecificity(best) ? current : best
      })
      return flattenUnionIssues(bestBranch.map((inner) => ({ ...inner, path: [...issue.path, ...inner.path] })))
    }
    return [issue]
  })
}

export { defineJsonValidation, type ErrorId }
