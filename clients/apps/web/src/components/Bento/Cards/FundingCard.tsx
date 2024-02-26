import { Organization } from '@polar-sh/sdk'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from 'polarkit/components/ui/atoms'
import { useSearchIssues } from 'polarkit/hooks'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { BentoItem } from '../BentoItem'

export interface FundingCardProps {
  organization: Organization
}

export const FundingCard = ({ organization }: FundingCardProps) => {
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [pageIndex])

  const issues = useSearchIssues({
    organizationName: organization.name,
  })

  const issue = useMemo(
    () => issues.data?.items?.[pageIndex],
    [pageIndex, issues.data],
  )

  return (
    <BentoItem
      className="dark:hover:bg-polar-800 flex flex-col transition-colors"
      rowSpan={3}
      colSpan={6}
    >
      <AnimatePresence>
        {issue && (
          <motion.div
            className="absolute inset-0 h-full w-full p-8"
            key={issue.id}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link
              className="flex h-full flex-col justify-between gap-y-4"
              href={`/${issue.repository.organization.name}/${issue.repository.name}/issues/${issue.number}`}
            >
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col gap-y-4">
                  <p className="dark:text-polar-500 text-sm">
                    Issues looking for funding
                  </p>
                  <h3 className="text-lg">{issue.title}</h3>
                </div>
                <div className="flex flex-row gap-x-1.5">
                  {new Array(3).fill(0).map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={twMerge(
                        'dark:bg-polar-600 h-2 w-2 rounded-full dark:hover:bg-white',
                        index === pageIndex && 'dark:bg-blue-500',
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setPageIndex(index)
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-row items-end gap-x-8">
                <div className="flex w-full flex-col gap-y-1">
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
                    <div className="dark:bg-polar-700 relative flex h-2 w-full flex-row items-center overflow-hidden rounded-md bg-blue-50">
                      <motion.div
                        className="h-full rounded-md bg-blue-500"
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
                <Link
                  href={`/${issue.repository.organization.name}/${issue.repository.name}/issues/${issue.number}`}
                >
                  <Button className="px-5 py-4" size="sm">
                    Fund Issue
                  </Button>
                </Link>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </BentoItem>
  )
}
