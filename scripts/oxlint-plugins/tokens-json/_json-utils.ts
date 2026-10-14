import type { SourceLocation } from 'estree'

const unwrap = (node: any): any => {
  while (
    node &&
    (node.type === 'TSAsExpression' ||
      node.type === 'TSSatisfiesExpression' ||
      node.type === 'TSNonNullExpression' ||
      node.type === 'ParenthesizedExpression')
  ) {
    node = node.expression
  }
  return node
}

const getPropName = (prop: any): PropertyKey | undefined => {
  if (prop.type !== 'Property' || prop.computed) return undefined
  if (prop.key.type === 'Identifier') return prop.key.name
  if (prop.key.type === 'Literal') return String(prop.key.value)
  return undefined
}

const getDefaultExport = (program: any): any | null => {
  const decl = program.body.find((n: any) => n.type === 'ExportDefaultDeclaration')
  return decl ? unwrap(decl.declaration) : null
}

class NotStaticError extends Error {
  node: any
  constructor(node: any) {
    super(`Unsupported (non-static) expression: ${node?.type}`)
    this.node = node
  }
}

const evaluateNode = (raw: any): unknown => {
  const node = unwrap(raw)
  switch (node?.type) {
    case 'Literal':
      return node.regex || node.bigint ? undefined : node.value
    case 'TemplateLiteral':
      if (node.expressions.length > 0) throw new NotStaticError(node)
      return node.quasis.map((q: any) => q.value.cooked).join('')
    case 'UnaryExpression':
      if (node.operator === '-' || node.operator === '+') {
        const v = evaluateNode(node.argument)
        if (typeof v === 'number') return node.operator === '-' ? -v : v
      }
      throw new NotStaticError(node)
    case 'ArrayExpression':
      return node.elements.map((el: any) => {
        if (!el || el.type === 'SpreadElement') throw new NotStaticError(el ?? node)
        return evaluateNode(el)
      })
    case 'ObjectExpression': {
      const obj: Record<string, unknown> = {}
      for (const prop of node.properties) {
        const name = prop.type === 'Property' ? getPropName(prop) : undefined
        if (name === undefined) throw new NotStaticError(prop)
        obj[String(name)] = evaluateNode(prop.value)
      }
      return obj
    }
    default:
      throw new NotStaticError(node)
  }
}

const getLocFromPath = (rootNode: any, path: PropertyKey[]): SourceLocation | null => {
  let current: any = unwrap(rootNode)
  let parent: any = null

  for (let i = 0; i < path.length; i++) {
    const key = path[i]
    const isLast = i === path.length - 1

    parent = current
    if (typeof key === 'symbol' || !current) return parent?.loc ?? null

    if (current.type === 'ArrayExpression') {
      current = unwrap(current.elements?.[key as number]) ?? null
    } else if (current.type === 'ObjectExpression') {
      const prop = current.properties?.find((p: any) => getPropName(p) === key)
      current = isLast ? (prop?.key ?? null) : (unwrap(prop?.value) ?? null)
    } else {
      return parent?.loc ?? null
    }
  }

  return current?.loc ?? parent?.loc ?? null
}

export { evaluateNode, getDefaultExport, getLocFromPath, NotStaticError }
