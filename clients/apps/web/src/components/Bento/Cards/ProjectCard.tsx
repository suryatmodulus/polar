import { StarIcon } from '@heroicons/react/20/solid'
import { HiveOutlined } from '@mui/icons-material'
import { Repository } from '@polar-sh/sdk'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from 'polarkit/components/ui/atoms'

export interface ProjectCardProps {
  repository: Repository
}

export const ProjectCard = ({ repository }: ProjectCardProps) => {
  return (
    <Card className="dark:hover:bg-polar-800 relative flex h-full w-full flex-col overflow-hidden transition-colors">
      <motion.div
        className="h-full w-full p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link
          className="flex h-full flex-col justify-between gap-y-4"
          href={`/${repository.organization.name}/${repository.name}`}
        >
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row items-center justify-between">
                <p className="dark:text-polar-500 text-sm text-gray-500">
                  Highlighted Project
                </p>
                <span className="dark:text-polar-500 flex flex-row items-center gap-x-1 text-sm text-gray-500">
                  <StarIcon className="h-4 w-4" />
                  <span className="mt-.5">{repository.stars}</span>
                </span>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <HiveOutlined
                  className="text-blue-500 dark:text-blue-400"
                  fontSize="small"
                />
                <h3 className="text-lg">{repository.name}</h3>
              </div>
            </div>
            <p className="line-clamp-2 text-xl">{repository.description}</p>
          </div>
        </Link>
      </motion.div>
    </Card>
  )
}
