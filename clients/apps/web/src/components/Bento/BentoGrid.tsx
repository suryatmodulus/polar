import { BentoItem } from './BentoItem'
import { ContributionCard } from './Cards/ContributionCard'
import { TwitterCard } from './Cards/TwitterCard'

export interface BentoGridProps {
  gap?: number
}

export const BentoGrid = ({ gap = 24 }: BentoGridProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      <ContributionCard />
      <TwitterCard />
      {Array.from({ length: 2 * 12 }).map((_, index) => (
        <BentoItem key={index} />
      ))}
    </div>
  )
}
