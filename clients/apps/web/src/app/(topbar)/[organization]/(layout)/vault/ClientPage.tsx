'use client'

import { vaultCollectionMocks } from '@/app/maintainer/[organization]/(topbar)/vault/data'
import { StaggerReveal } from '@/components/Shared/StaggerReveal'
import { VaultCollectionTile } from '@/components/Vault/VaultTile'
import { Organization } from '@polar-sh/sdk'
import Link from 'next/link'

const ClientPage = ({ organization }: { organization: Organization }) => {
  return (
    <div className="flex w-full flex-col gap-y-8">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-medium">Vault</h2>
      </div>
      <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {vaultCollectionMocks.map((collection) => (
          <StaggerReveal.Child
            key={collection.id}
            className="flex flex-grow flex-col"
          >
            <Link href={`/${organization?.name}/vault/${collection.slug}`}>
              <VaultCollectionTile
                collection={collection}
                link={`/${organization?.name}/vault/${collection.slug}`}
              />
            </Link>
          </StaggerReveal.Child>
        ))}
      </StaggerReveal>
    </div>
  )
}

export default ClientPage
