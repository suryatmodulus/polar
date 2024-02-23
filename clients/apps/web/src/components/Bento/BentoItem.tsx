import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export interface BentoItemProps extends PropsWithChildren {
  className?: string
  colSpan?: number
  rowSpan?: number
}

export const BentoItem = ({
  className,
  colSpan = 1,
  rowSpan = 1,
  children,
}: BentoItemProps) => {
  return (
    <div
      className={twMerge(
        'dark:bg-polar-900 dark:border-polar-800 relative flex min-h-[64px] overflow-hidden rounded-3xl border',
        colSpan === rowSpan ? 'aspect-square' : '',
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <div className={twMerge('absolute inset-0 p-4', className)}>
        {children}
      </div>
    </div>
  )
}
