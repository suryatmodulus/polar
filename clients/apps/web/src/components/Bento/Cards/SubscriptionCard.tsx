import { resolveBenefitIcon } from '@/components/Subscriptions/utils'
import { Organization, SubscriptionTier } from '@polar-sh/sdk'
import Link from 'next/link'
import { Button } from 'polarkit/components/ui/atoms'
import { twMerge } from 'tailwind-merge'
import { BentoItem } from '../BentoItem'

export interface SubscriptionCardProps {
  organization: Organization
  subscriptionTier: SubscriptionTier
  minimized?: boolean
}

export const SubscriptionCard = ({
  organization,
  subscriptionTier,
  minimized,
}: SubscriptionCardProps) => {
  const rowSpan = minimized ? 3 : 5

  return (
    <BentoItem
      className={twMerge(
        'flex flex-col gap-y-8 p-8',
        minimized && 'justify-between',
      )}
      colSpan={3}
      rowSpan={rowSpan}
    >
      <div className="flex flex-col gap-y-4">
        <div className={twMerge('row flex justify-between')}>
          <h3>{subscriptionTier.name}</h3>
          <span>${subscriptionTier.price_amount / 100}</span>
        </div>
        <p
          className={twMerge('dark:text-polar-500', minimized ? 'text-sm' : '')}
        >
          {subscriptionTier.description}
        </p>
      </div>
      {!minimized && (
        <div className="flex h-full flex-col gap-y-2">
          {subscriptionTier.benefits?.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-row items-start text-blue-500 dark:text-[--var-dark-fg-color]"
            >
              <span className="flex h-6 w-6 shrink-0 flex-row items-center justify-center rounded-full bg-blue-50 text-[14px] dark:bg-[--var-dark-border-color]">
                {resolveBenefitIcon(benefit, 'inherit')}
              </span>
              <span className="ml-3 text-sm leading-relaxed">
                {benefit.description}
              </span>
            </div>
          ))}
        </div>
      )}
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
