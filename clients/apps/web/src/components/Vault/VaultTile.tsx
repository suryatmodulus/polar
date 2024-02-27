import { DrawOutlined } from '@mui/icons-material'
import { useRef } from 'react'
import { VaultCollection } from './VaultCollection'
import { VaultEntity } from './VaultEntity'

export interface VaultCollectionTileProps {
  collection: VaultCollection
  link: string
}

export const VaultCollectionTile = ({
  collection,
}: VaultCollectionTileProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="dark:bg-polar-900 dark:border-polar-700 dark:hover:bg-polar-800 flex h-full flex-col gap-y-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
    >
      <div className="flex aspect-square flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-2xl dark:bg-black">
        <DrawOutlined className="text-6xl" fontSize="inherit" />
      </div>
      <div className="flex h-full flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <h2 className="dark:text-polar-50 truncate text-gray-950">
            {collection.name}
          </h2>
        </div>
        <p className="dark:text-polar-500 mb-4 line-clamp-2 h-full text-sm text-gray-500">
          {collection.description}
        </p>
      </div>
    </div>
  )
}

export interface VaultEntityTileProps {
  entity: VaultEntity
  link: string
}

export const VaultEntityTile = ({ entity }: VaultEntityTileProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="dark:bg-polar-900 dark:border-polar-700 dark:hover:bg-polar-800 flex h-full flex-col gap-y-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
    >
      <div
        className="aspect-video flex-shrink-0 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${entity.image})` }}
      />
      <div className="flex h-full flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-blue-500 dark:text-blue-400">
            {entity.type}
          </span>
          <h2 className="dark:text-polar-50 truncate text-gray-950">
            {entity.name}
          </h2>
        </div>
        <p className="dark:text-polar-500 mb-4 line-clamp-2 h-full text-sm text-gray-500">
          {entity.description}
        </p>
      </div>
    </div>
  )
}
