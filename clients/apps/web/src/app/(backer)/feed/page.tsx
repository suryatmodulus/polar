import { Feed } from '@/components/Feed/Feed'
import Link from 'next/link'
import { Avatar, ShadowBoxOnMd } from 'polarkit/components/ui/atoms'

const featuredCreators = [
  {
    name: 'Kludex',
    avatarUrl: 'https://avatars.githubusercontent.com/u/7353520?v=4',
  },
  {
    name: 'emilwidlund',
    avatarUrl: 'https://avatars.githubusercontent.com/u/10053249?v=4',
  },
  {
    name: 'Sparckles',
    avatarUrl: 'https://avatars.githubusercontent.com/u/123258275?v=4',
  },
  {
    name: 'fief-dev',
    avatarUrl: 'https://avatars.githubusercontent.com/u/97037414?v=4',
  },
  {
    name: 'tuist',
    avatarUrl: 'https://avatars.githubusercontent.com/u/38419084?v=4',
  },
]

export default async function Page() {
  return (
    <div className="relative flex flex-row items-start gap-x-24">
      <div className="flex w-full max-w-xl flex-col gap-y-8 pb-12">
        <Feed />
      </div>
      <ShadowBoxOnMd>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg">Popular Creators</h3>
          <div className="flex flex-col">
            {featuredCreators.map((creator) => (
              <Link key={creator.name} href={`/${creator.name}`}>
                <Avatar avatar_url={creator.avatarUrl} name={creator.name} />
              </Link>
            ))}
          </div>
        </div>
      </ShadowBoxOnMd>
    </div>
  )
}
