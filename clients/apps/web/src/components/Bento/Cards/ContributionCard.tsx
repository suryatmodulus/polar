import Link from 'next/link'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { BentoItem } from '../BentoItem'

export const ContributionCard = () => {
  const dots = useMemo(
    () =>
      new Array(52 * 7).fill(0).map((_, i) => {
        const idx = Math.random()
        const bg =
          idx > 0.9
            ? 'dark:bg-blue-500'
            : idx > 0.7
              ? 'dark:bg-blue-700'
              : idx > 0.5
                ? 'dark:bg-blue-950'
                : ''
        return (
          <div
            key={i}
            className={twMerge(
              'dark:bg-polar-800 aspect-square rounded-full',
              bg,
            )}
          />
        )
      }),
    [],
  )

  return (
    <BentoItem
      className="flex flex-col justify-between gap-y-4 p-8"
      rowSpan={2}
      colSpan={5}
    >
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-y-1">
          <h3 className="text-lg">Contributions</h3>
          <p className="dark:text-polar-500 text-sm">Last 52 weeks</p>
        </div>
        <Link className="text-xs text-blue-500 dark:text-blue-400" href="#">
          View all activity
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-1">
        {dots}
      </div>
    </BentoItem>
  )
}
