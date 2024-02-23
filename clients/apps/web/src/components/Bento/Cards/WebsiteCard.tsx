import { LanguageOutlined } from '@mui/icons-material'
import Link from 'next/link'
import { BentoItem } from '../BentoItem'

export interface WebsiteCardProps {
  website: string
}

export const WebsiteCard = ({ website }: WebsiteCardProps) => {
  return (
    <Link href={website} target="_blank" rel="noopener noreferrer">
      <BentoItem className="dark:hover:bg-polar-800 flex flex-col items-center justify-center text-4xl transition-colors hover:text-blue-500">
        <LanguageOutlined fontSize="inherit" />
      </BentoItem>
    </Link>
  )
}
