import { Organization } from '@polar-sh/sdk'
import { useSearchIssues, useSubscriptionTiers } from 'polarkit/hooks'
import { BentoItem } from './BentoItem'
import { ContributionCard } from './Cards/ContributionCard'
import { FundingCard } from './Cards/FundingCard'
import { GitHubCard } from './Cards/GitHubCard'
import { SubscriptionCard } from './Cards/SubscriptionCard'
import { TwitterCard } from './Cards/TwitterCard'
import { WebsiteCard } from './Cards/WebsiteCard'

export interface BentoGridProps {
  organization: Organization
  gap?: number
}

export const BentoGrid = ({ organization, gap = 20 }: BentoGridProps) => {
  const subscriptionTier = useSubscriptionTiers(
    organization.name,
  ).data?.items?.find((tier) => tier.is_highlighted)

  const issue = useSearchIssues({
    organizationName: organization.name,
  }).data?.items?.[0]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      <ContributionCard />
      {subscriptionTier && (
        <SubscriptionCard
          organization={organization}
          subscriptionTier={subscriptionTier}
        />
      )}
      {subscriptionTier && (
        <SubscriptionCard
          organization={organization}
          subscriptionTier={subscriptionTier}
        />
      )}
      {issue && <FundingCard issue={issue} />}
      <div
        className="col-span-2 row-span-2 grid aspect-square"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
          gap: `${gap}px`,
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
      {Array.from({ length: 14 }).map((_, index) => (
        <BentoItem key={index} />
      ))}
    </div>
  )
}
