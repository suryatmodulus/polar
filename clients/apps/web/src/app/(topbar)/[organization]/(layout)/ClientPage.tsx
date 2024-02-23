'use client'

import { BentoGrid } from '@/components/Bento/BentoGrid'
import { BentoItem } from '@/components/Bento/BentoItem'
import { ContributionCard } from '@/components/Bento/Cards/ContributionCard'
import { FundingCard } from '@/components/Bento/Cards/FundingCard'
import { GitHubCard } from '@/components/Bento/Cards/GitHubCard'
import { TwitterCard } from '@/components/Bento/Cards/TwitterCard'
import { WebsiteCard } from '@/components/Bento/Cards/WebsiteCard'
import SubscriptionGroupIcon from '@/components/Subscriptions/SubscriptionGroupIcon'
import { resolveBenefitIcon } from '@/components/Subscriptions/utils'
import { useTrafficRecordPageView } from '@/utils/traffic'
import {
  ListResourceArticle,
  ListResourceSubscriptionSummary,
  ListResourceSubscriptionTier,
  Organization,
  SubscriptionTier,
  SubscriptionTierType,
} from '@polar-sh/sdk'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from 'polarkit/components/ui/atoms'
import { Separator } from 'polarkit/components/ui/separator'
import { getCentsInDollarString } from 'polarkit/money'
import { useMemo } from 'react'

const ClientPage = ({
  organization,
  subscriptionTiers,
  subscriptionSummary,
}: {
  organization: Organization
  pinnedArticles: ListResourceArticle
  subscriptionTiers: ListResourceSubscriptionTier
  subscriptionSummary: ListResourceSubscriptionSummary
}) => {
  useTrafficRecordPageView({ organization })

  const highlightedTiers = useMemo(
    () =>
      subscriptionTiers?.items?.filter(
        (tier) => tier.is_highlighted || tier.type === 'free',
      ) ?? [],
    [subscriptionTiers],
  )

  const subscribersCount = subscriptionSummary.pagination.total_count

  const getSubscriptionTierAudience = (tier: SubscriptionTier) => {
    switch (tier.type) {
      case SubscriptionTierType.INDIVIDUAL:
        return 'For Individuals'
      case SubscriptionTierType.BUSINESS:
        return 'For Businesses'
    }
  }

  return (
    <div className="flex w-full flex-row items-stretch gap-x-24">
      <div className="flex w-full flex-col gap-y-16">
        <BentoGrid>
          <ContributionCard />
          <div
            className="col-span-2 row-span-2 grid aspect-square"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
              gap: `${20}px`,
            }}
          >
            <GitHubCard organization={organization} />
            {organization.twitter_username && (
              <TwitterCard username={organization.twitter_username} />
            )}
            {organization.blog && <WebsiteCard website={organization.blog} />}
            {organization.twitter_username && (
              <TwitterCard username={organization.twitter_username} />
            )}
          </div>
          <FundingCard organization={organization} />
          {Array.from({ length: 32 }).map((_, index) => (
            <BentoItem key={index} />
          ))}
        </BentoGrid>
      </div>
      {(highlightedTiers?.length ?? 0) > 0 && (
        <div className="flex w-96 flex-col justify-start gap-y-6">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg">Subscriptions</h3>
              <Link
                className="flex flex-row items-center gap-x-2 text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                href={`/${organization.name}/subscriptions`}
              >
                <span className="text-xs">View All</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-start gap-6 overflow-x-auto px-4 pb-6 md:mx-0 md:flex-col md:px-0 md:pb-0">
            {highlightedTiers?.map((tier) => (
              <Link
                key={tier.id}
                className="flex flex-shrink-0 flex-row items-center gap-x-2 md:w-full"
                href={`/${organization.name}/subscriptions#${tier.name}`}
              >
                <Card className="dark:hover:bg-polar-800 h-full w-full overflow-hidden transition-colors hover:bg-blue-50 md:h-fit">
                  <CardHeader className="flex flex-col gap-y-2 p-6 pb-0">
                    <span className="dark:text-polar-500 text-xs text-gray-500">
                      {getSubscriptionTierAudience(tier)}
                    </span>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row gap-x-2">
                        <SubscriptionGroupIcon
                          className="text-[20px]"
                          type={tier.type}
                        />
                        <h3 className="font-medium">{tier.name}</h3>
                      </div>
                      <div>
                        $
                        {getCentsInDollarString(tier.price_amount, false, true)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-y-4 px-6 pb-6 pt-4">
                    <p className="dark:text-polar-400 text-sm leading-normal text-gray-600">
                      {tier.description}
                    </p>
                  </CardContent>
                  {tier.benefits.length > 0 && (
                    <>
                      <Separator />
                      <CardFooter className="flex flex-col items-start gap-y-2 p-6">
                        {tier.benefits?.map((benefit) => (
                          <div
                            key={benefit.id}
                            className="dark:text-polar-200 flex flex-row items-start text-gray-950"
                          >
                            <div className="flex flex-row items-center gap-x-2 text-blue-500 dark:text-blue-400">
                              <span className="flex h-6 w-6 shrink-0  flex-row items-center justify-center rounded-full bg-blue-50 text-[14px] dark:bg-blue-950">
                                {resolveBenefitIcon(benefit, 'inherit')}
                              </span>
                              <span className="text-xs">
                                {benefit.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </CardFooter>
                    </>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientPage
