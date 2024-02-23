import { Issue } from '@polar-sh/sdk'
import { motion } from 'framer-motion'
import { BentoItem } from '../BentoItem'

export interface FundingCardProps {
  issue: Issue
}

export const FundingCard = ({ issue }: FundingCardProps) => {
  return (
    <BentoItem
      className="flex flex-col justify-between gap-y-4 p-8"
      rowSpan={2}
      colSpan={3}
    >
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col gap-y-2">
          <p className="dark:text-polar-500 text-sm">
            Issue looking for funding
          </p>
          <h3 className="text-lg">{issue.title}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-sm font-medium">Pledged</h3>
          {
            <span>
              ${issue.funding.pledges_sum?.amount ?? 0} / $
              {issue.funding.funding_goal?.amount ?? 0}
            </span>
          }
        </div>
        <div>
          <div className="relative flex h-2 w-full flex-row items-center overflow-hidden rounded-md bg-blue-50 dark:bg-blue-950">
            <motion.div
              className="h-full rounded-md bg-blue-500 dark:bg-blue-400"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((issue.funding.pledges_sum?.amount ?? 0) /
                    (issue.funding.funding_goal?.amount ?? 0)) *
                  100
                }%`,
              }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </div>
      </div>
    </BentoItem>
  )
}
