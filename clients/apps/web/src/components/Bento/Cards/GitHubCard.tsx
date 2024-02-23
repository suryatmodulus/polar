import GitHubIcon from '@/components/Icons/GitHubIcon'
import { Organization } from '@polar-sh/sdk'
import Link from 'next/link'
import { BentoItem } from '../BentoItem'

export interface GitHubCardProps {
  organization: Organization
}

export const GitHubCard = ({ organization }: GitHubCardProps) => {
  return (
    <Link
      href={`https://github.com/${organization.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BentoItem className="dark:hover:bg-polar-800 flex flex-col items-center justify-center transition-colors hover:text-blue-500">
        <GitHubIcon width={30} height={30} />
      </BentoItem>
    </Link>
  )
}
