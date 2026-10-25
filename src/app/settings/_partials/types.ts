import { type ReactNode } from 'react'

export interface SectionProps extends ReactProps {
  id: string
  title: ReactNode
  keyword: string
}
