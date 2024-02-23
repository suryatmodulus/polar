import { Organization, SubscriptionTier } from '@polar-sh/sdk'
import Link from 'next/link'
import { Button } from 'polarkit/components/ui/atoms'
import { BentoItem } from '../BentoItem'

export interface SubscriptionCardProps {
  organization: Organization
  subscriptionTier: SubscriptionTier
}

export const SubscriptionCard = ({
  organization,
  subscriptionTier,
}: SubscriptionCardProps) => {
  return (
    <BentoItem
      className="flex flex-col justify-between gap-y-8 p-8"
      colSpan={2}
      rowSpan={2}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row justify-between">
          <h3>{subscriptionTier.name}</h3>
          <span>${subscriptionTier.price_amount / 100}</span>
        </div>
        <p className="dark:text-polar-500 text-sm">
          {subscriptionTier.description}
        </p>
      </div>
      <div className="flex flex-row items-center gap-x-6">
        <Button className="self-start" size="sm">
          Subscribe
        </Button>
        <Link
          className="text-xs text-blue-500 dark:text-blue-400"
          href={`/${organization.name}/subscriptions#${organization.name}`}
        >
          Benefits
        </Link>
      </div>
    </BentoItem>
  )
}
