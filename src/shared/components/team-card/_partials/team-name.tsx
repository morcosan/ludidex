import { TextField } from '@design-system'
import { debounce } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorNotice } from './error-notice'

interface TeamNameProps {
  name: string
  value: string
  editing?: boolean
  invalid?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
}

export const TeamName = (props: TeamNameProps) => {
  const { name, value, editing, invalid, onChange, onBlur } = props
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState(value)
  const debouncedFnRef = useRef<ReturnType<typeof debounce>>(null)
  const isPendingRef = useRef(false)
  const onChangeRef = useRef(onChange)

  const handleChange = (nextValue: string) => {
    setInputValue(nextValue)
    isPendingRef.current = true
    debouncedFnRef.current?.(nextValue)
  }

  const handleBlur = () => {
    debouncedFnRef.current?.flush()
    onBlur?.()
  }

  useEffect(() => {
    debouncedFnRef.current = debounce((nextValue: string) => {
      isPendingRef.current = false
      onChangeRef.current?.(nextValue)
    }, 300)
    return () => debouncedFnRef.current?.cancel()
  }, [])

  useEffect(() => {
    if (!editing) {
      debouncedFnRef.current?.cancel()
      isPendingRef.current = false
    }
    if (!isPendingRef.current) {
      setInputValue(value)
    }
  }, [editing, value])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  return (
    <>
      {editing ? (
        <TextField
          id="team-card-name"
          size="md"
          value={inputValue}
          invalid={invalid}
          ariaDescribedBy={invalid ? 'team-card-name-error' : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <h3 className={cx(!name && 'text-color-text-placeholder')}>{name || t('general.label.newTeam')}</h3>
      )}
      {editing && invalid && (
        <ErrorNotice id="team-card-name-error" text={t('general.notice.invalidTeamName')} className="mt-xs-1" />
      )}
    </>
  )
}
