'use client'

import { FundingCard } from '@/components/Bento/Cards/FundingCard'
import { ProjectCard } from '@/components/Bento/Cards/ProjectCard'
import { Post } from '@/components/Feed/Posts/Post'
import { FreeTierSubscribe } from '@/components/Organization/FreeTierSubscribe'
import SubscriptionTierCard from '@/components/Subscriptions/SubscriptionTierCard'
import SubscriptionTierSubscribeButton from '@/components/Subscriptions/SubscriptionTierSubscribeButton'
import { useTrafficRecordPageView } from '@/utils/traffic'
import {
  ListResourceArticle,
  ListResourceRepository,
  ListResourceSubscriptionSummary,
  ListResourceSubscriptionTier,
  Organization,
  SubscriptionTier,
  SubscriptionTierType,
} from '@polar-sh/sdk'
import Link from 'next/link'
import { useMemo } from 'react'

const ClientPage = ({
  organization,
  pinnedArticles,
  subscriptionTiers,
  subscriptionSummary,
  repositories,
}: {
  organization: Organization
  pinnedArticles: ListResourceArticle
  subscriptionTiers: ListResourceSubscriptionTier
  subscriptionSummary: ListResourceSubscriptionSummary
  repositories: ListResourceRepository
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

  const topRepository = useMemo(
    () =>
      repositories.items?.sort((a, b) => {
        return (b.stars ?? 0) - (a.stars ?? 0)
      })[0],
    [repositories],
  )

  const pinnedArticle = useMemo(
    () => pinnedArticles.items?.[0],
    [pinnedArticles],
  )

  return (
    <div className="flex w-full flex-row items-stretch gap-x-24">
      <div className="flex w-full flex-col gap-y-16">
        <div className="flex h-fit w-full flex-row justify-stretch gap-x-8">
          {topRepository && <ProjectCard repository={topRepository} />}
          <FundingCard organization={organization} />
        </div>
        {(pinnedArticles.items?.length ?? 0) > 0 && (
          <div className="flex flex-col gap-y-8">
            <h3 className="text-lg">Pinned Posts</h3>
            <div className="flex flex-col gap-y-4">
              <div className="flex w-full flex-col gap-y-6">
                {pinnedArticles.items?.map((post) => (
                  <Post article={post} key={post.id} highlightPinned />
                ))}
              </div>
            </div>
          </div>
        )}
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
              <SubscriptionTierCard subscriptionTier={tier} variant="small">
                {tier.type === 'free' ? (
                  <FreeTierSubscribe
                    subscriptionTier={tier}
                    organization={organization}
                  />
                ) : (
                  <SubscriptionTierSubscribeButton
                    organization={organization}
                    subscriptionTier={tier}
                    subscribePath="/subscribe"
                  />
                )}
              </SubscriptionTierCard>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientPage
