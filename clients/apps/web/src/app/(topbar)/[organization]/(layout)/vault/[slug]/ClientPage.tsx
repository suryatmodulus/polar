'use client'

import { StaggerReveal } from '@/components/Shared/StaggerReveal'
import { Slideshow } from '@/components/Vault/Slideshow'
import {
  VaultEntity,
  resolveVaultEntityTypeIcon,
} from '@/components/Vault/VaultEntity'
import { ArrowBackOutlined, StarRounded } from '@mui/icons-material'
import { Organization } from '@polar-sh/sdk'
import Link from 'next/link'
import { ShadowBoxOnMd } from 'polarkit/components/ui/atoms'
import { useMemo } from 'react'

const ClientPage = ({
  organization,
  entity,
}: {
  organization: Organization
  entity: VaultEntity
}) => {
  const stars = useMemo(() => Math.random() * 4 + 1, [])
  const TypeIcon = resolveVaultEntityTypeIcon(entity.type)

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Link
        className="flex flex-row items-center gap-x-2 text-sm text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
        href={`/${organization.name}/vault`}
      >
        <ArrowBackOutlined fontSize="inherit" />
        <span>Back to Vault</span>
      </Link>
      <StaggerReveal className="flex flex-col gap-y-8">
        {entity.image && (
          <StaggerReveal.Child>
            <Slideshow images={[entity.image]} />
          </StaggerReveal.Child>
        )}
        <div className="flex flex-row gap-x-8">
          <StaggerReveal.Child className="w-2/3">
            <ShadowBoxOnMd className="flex flex-col gap-y-6">
              <div className="flex flex-row items-center justify-between">
                <span className="flex flex-row items-center gap-x-2 text-sm font-medium text-blue-500 dark:text-blue-400">
                  <TypeIcon fontSize="small" />
                  {entity.type}
                </span>
                <div className="flex flex-row items-center gap-x-2">
                  <div className="flex flex-row items-center">
                    {Array(Math.floor(stars))
                      .fill(0)
                      .map((_, i) => (
                        <StarRounded
                          className="text-blue-500 dark:text-blue-400"
                          fontSize="inherit"
                          key={i}
                        />
                      ))}
                    {Array(5 - Math.floor(stars))
                      .fill(0)
                      .map((_, i) => (
                        <StarRounded
                          className="dark:text-polar-600 text-gray-300"
                          fontSize="inherit"
                          key={i}
                        />
                      ))}
                  </div>
                  <span>
                    {Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      maximumFractionDigits: 1,
                    }).format(stars)}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-medium">{entity.name}</h2>

              <p className="dark:text-polar-500 whitespace-break-spaces leading-relaxed text-gray-500">
                {entity.description}
              </p>
            </ShadowBoxOnMd>
          </StaggerReveal.Child>
        </div>
      </StaggerReveal>
    </div>
  )
}

export default ClientPage
