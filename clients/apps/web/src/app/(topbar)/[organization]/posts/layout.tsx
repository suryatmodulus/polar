import EmptyLayout from '@/components/Layout/EmptyLayout'
import { OrganizationPublicPageNav } from '@/components/Organization/OrganizationPublicPageNav'
import { getServerSideAPI } from '@/utils/api'
import { Organization, Platforms, UserRead } from '@polar-sh/sdk'
import { notFound } from 'next/navigation'
import { Avatar } from 'polarkit/components/ui/atoms'
import React from 'react'

const cacheConfig = {
  next: {
    revalidate: 30, // 30 seconds
  },
}

export default async function Layout({
  params,
  children,
}: {
  params: { organization: string }
  children: React.ReactNode
}) {
  const api = getServerSideAPI()

  let organization: Organization | undefined
  let authenticatedUser: UserRead | undefined

  try {
    const [loadOrganization, loadAuthenticatedUser] = await Promise.all([
      api.organizations.lookup(
        {
          platform: Platforms.GITHUB,
          organizationName: params.organization,
        },
        cacheConfig,
      ),
      // Handle unauthenticated
      api.users.getAuthenticated({ cache: 'no-store' }).catch(() => {
        return undefined
      }),
    ])

    organization = loadOrganization
    authenticatedUser = loadAuthenticatedUser
  } catch (e) {
    notFound()
  }

  if (!organization) {
    notFound()
  }

  return (
    <EmptyLayout>
      <div className="flex min-h-screen flex-col justify-between">
        <div className="flex shrink-0 flex-col">
          <div className="mx-auto mt-4 flex w-full max-w-7xl shrink-0 flex-col px-4 md:space-y-8">
            <div className="flex h-full w-full flex-col md:gap-y-12">
              <div className="flex w-1/2 flex-col gap-y-8">
                <div className="flex flex-row items-center gap-x-6">
                  <Avatar
                    className="h-16 w-16"
                    avatar_url={organization.avatar_url}
                    name={organization.name}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl">
                      {organization.pretty_name ?? organization.name}
                    </h3>
                    {!!organization.pretty_name && (
                      <span className="dark:text-polar-500">
                        @{organization.name}
                      </span>
                    )}
                  </div>
                </div>
                {organization.bio && (
                  <>
                    <p className="dark:text-polar-50 text-3xl !font-normal leading-normal text-gray-950">
                      {organization.bio}
                    </p>
                  </>
                )}
              </div>
              <OrganizationPublicPageNav
                className="hidden md:flex"
                organization={organization}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </EmptyLayout>
  )
}
