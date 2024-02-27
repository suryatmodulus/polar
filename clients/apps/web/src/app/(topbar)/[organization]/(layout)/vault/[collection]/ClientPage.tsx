'use client'

import { StaggerReveal } from '@/components/Shared/StaggerReveal'
import { VaultCollection } from '@/components/Vault/VaultCollection'
import { VaultEntityTile } from '@/components/Vault/VaultTile'
import { Organization } from '@polar-sh/sdk'
import Link from 'next/link'

const ClientPage = ({
  organization,
  collection,
}: {
  organization: Organization
  collection: VaultCollection
}) => {
  return (
    <div className="flex w-full flex-col gap-y-8">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-medium">{collection.name}</h2>
      </div>
      <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {collection.entities.map((entity) => (
          <StaggerReveal.Child
            key={entity.id}
            className="flex flex-grow flex-col"
          >
            <Link
              href={`/${organization?.name}/vault/${collection.slug}/${entity.slug}`}
            >
              <VaultEntityTile
                entity={entity}
                link={`/${organization?.name}/vault/${collection.slug}/${entity.slug}`}
              />
            </Link>
          </StaggerReveal.Child>
        ))}
      </StaggerReveal>
    </div>
  )
}

export default ClientPage
