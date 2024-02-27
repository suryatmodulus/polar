'use client'

import { DashboardBody } from '@/components/Layout/DashboardLayout'
import { StaggerReveal } from '@/components/Shared/StaggerReveal'
import { VaultEntityTile } from '@/components/Vault/VaultTile'
import { useCurrentOrgAndRepoFromURL } from '@/hooks'
import { AddOutlined } from '@mui/icons-material'
import Link from 'next/link'
import { Button } from 'polarkit/components/ui/atoms'
import { vaultMocks } from './data'

const ClientPage = () => {
  const { org } = useCurrentOrgAndRepoFromURL()

  return (
    <DashboardBody>
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-medium">Overview</h2>
          <Link href={`/maintainer/${org?.name}/products/new`}>
            <Button className="h-8 w-8 rounded-full">
              <AddOutlined fontSize="inherit" />
            </Button>
          </Link>
        </div>
        <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vaultMocks.map((entity) => (
            <StaggerReveal.Child
              key={entity.id}
              className="flex flex-grow flex-col"
            >
              <Link href={`/maintainer/${org?.name}/vault/${entity.slug}`}>
                <VaultEntityTile
                  link={`/maintainer/${org?.name}/vault/${entity.slug}`}
                  entity={entity}
                />
              </Link>
            </StaggerReveal.Child>
          ))}
        </StaggerReveal>
      </div>
    </DashboardBody>
  )
}

export default ClientPage
