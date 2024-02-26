import { Organization } from '@polar-sh/sdk'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Card } from 'polarkit/components/ui/atoms'
import { useSearchIssues } from 'polarkit/hooks'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export interface FundingCardProps {
  organization: Organization
}

export const FundingCard = ({ organization }: FundingCardProps) => {
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % 3)
    }, 8000)

    return () => clearInterval(interval)
  }, [pageIndex])

  const issues = useSearchIssues({
    organizationName: organization.name,
  })

  const issue = useMemo(
    () => issues.data?.items?.[pageIndex],
    [pageIndex, issues.data],
  )

  if (!issue) return null

  return (
    <Card className="dark:hover:bg-polar-800 relative flex h-full w-full flex-col overflow-hidden transition-colors">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          className="h-full w-full p-8"
          key={issue.id}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
        >
          <Link
            className="flex h-full flex-col justify-between gap-y-4"
            href={`/${issue.repository.organization.name}/${issue.repository.name}/issues/${issue.number}`}
          >
            <div className="flex w-full flex-row justify-between">
              <div className="flex flex-col gap-y-4">
                <p className="dark:text-polar-500 text-sm text-gray-500">
                  Issues looking for funding
                </p>
                <h3 className="line-clamp-2 h-16 text-lg">{issue.title}</h3>
              </div>
              <div className="flex flex-row gap-x-1.5">
                {new Array(3).fill(0).map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={twMerge(
                      'dark:bg-polar-600 dark:hover:bg-polar-300 h-2 w-2 rounded-full transition-colors',
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
            <div className="flex w-full flex-row items-end gap-x-6">
              <div className="flex w-full flex-col gap-y-2">
                <div className="flex flex-row items-center justify-between text-sm">
                  <h3>Pledged</h3>
                  <span>
                    ${issue.funding.pledges_sum?.amount ?? 0}{' '}
                    {typeof issue.funding.funding_goal?.amount !==
                      'undefined' &&
                      `/ ${issue.funding.funding_goal?.amount ?? 0}`}
                  </span>
                </div>
                <div>
                  <div className="dark:bg-polar-700 relative flex h-1 w-full flex-row items-center overflow-hidden rounded-md bg-blue-50">
                    <motion.div
                      className="h-full rounded-md bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          typeof issue.funding.funding_goal?.amount !==
                          'undefined'
                            ? `${
                                ((issue.funding.pledges_sum?.amount ?? 0) /
                                  (issue.funding.funding_goal?.amount ?? 0)) *
                                100
                              }%`
                            : (issue.funding.pledges_sum?.amount ?? 0) > 0
                              ? '100%'
                              : 0,
                      }}
                      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </div>
                </div>
              </div>
              <Link
                href={`/${issue.repository.organization.name}/${issue.repository.name}/issues/${issue.number}`}
              >
                <Button size="sm">Fund Issue</Button>
              </Link>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
