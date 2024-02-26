import GitHubIcon from '@/components/Icons/GitHubIcon'
import EmptyLayout from '@/components/Layout/EmptyLayout'
import { externalURL } from '@/components/Organization'
import { OrganizationPublicPageNav } from '@/components/Organization/OrganizationPublicPageNav'
import { getServerSideAPI } from '@/utils/api'
import { LanguageOutlined, MailOutline } from '@mui/icons-material'
import { Organization, Platforms, UserRead } from '@polar-sh/sdk'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Avatar } from 'polarkit/components/ui/atoms'
import React, { PropsWithChildren } from 'react'

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
              <div className="flex w-2/3 flex-col gap-y-8">
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
                    <p className="dark:text-polar-50 text-3xl !font-normal leading-normal text-gray-950 [text-wrap:pretty]">
                      {organization.bio}
                    </p>
                  </>
                )}
                <div className="flex flex-row items-center gap-x-4">
                  <SocialLink href={`https://github.com/${organization.name}`}>
                    <GitHubIcon width={20} height={15} />
                  </SocialLink>
                  <SocialLink
                    href={`https://twitter.com/${organization.twitter_username}`}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 300 300.251"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
                        fill="currentColor"
                      />
                    </svg>
                  </SocialLink>
                  {organization.blog && (
                    <SocialLink href={externalURL(organization.blog)}>
                      <LanguageOutlined fontSize="small" />
                    </SocialLink>
                  )}
                  <SocialLink href={`mailto:${organization.email}`}>
                    <MailOutline fontSize="small" />
                  </SocialLink>
                </div>
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

const SocialLink = (props: PropsWithChildren<{ href?: string }>) => {
  if (!props.href) return null

  return (
    <Link
      target="_blank"
      rel="noopener nofollow"
      className="dark:bg-polar-700 dark:hover:bg-polar-600 dark:text-polar-200 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100"
      href={props.href}
    >
      {props.children}
    </Link>
  )
}
