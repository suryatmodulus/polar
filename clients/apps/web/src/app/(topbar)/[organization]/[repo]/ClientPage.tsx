import IssuesLookingForFunding from '@/components/Organization/IssuesLookingForFunding'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { ArrowForwardOutlined } from '@mui/icons-material'
import {
  ListResourceIssueFunding,
  Organization,
  Repository,
} from '@polar-sh/sdk'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
import {
  Avatar,
  ShadowBoxOnMd,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'polarkit/components/ui/atoms'
import { Separator } from 'polarkit/components/ui/separator'
import { Fragment } from 'react'

const ClientPage = ({
  organization,
  repository,
  issuesFunding,
  totalIssueCount,
}: {
  organization: Organization
  repository: Repository
  issuesFunding: ListResourceIssueFunding
  totalIssueCount: number
}) => {
  const tabsTriggerClassName =
    'data-[state=active]:rounded-full data-[state=active]:bg-blue-50 data-[state=active]:text-blue-500 dark:data-[state=active]:bg-blue-950 hover:text-blue-500 dark:data-[state=active]:text-blue-300 data-[state=active]:shadow-none'

  return (
    <div className="flex flex-col gap-y-24 py-12">
      <div className="flex w-full max-w-4xl flex-col gap-y-16">
        <h1 className="text-2xl !font-normal">{repository.name}</h1>
        {repository.description && (
          <p className="dark:text-polar-50 text-5xl !font-normal leading-snug text-gray-950">
            {repository.description}
          </p>
        )}
        <Separator className="h-1 w-16 bg-black dark:bg-white" />
        <div className="flex flex-row gap-x-32">
          <div className="flex flex-col gap-y-1">
            <span className="dark:text-polar-300 text-gray-500">Creator</span>
            <Link href={`/${repository.organization.name}`}>
              {repository.organization.pretty_name}
            </Link>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="dark:text-polar-300 text-gray-500">Stars</span>
            <span>{repository.stars}</span>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="dark:text-polar-300 text-gray-500">
              Repository
            </span>
            <Link
              className="flex flex-row items-center gap-x-2"
              href={`https://github.com/${repository.organization.name}/${repository.name}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {'GitHub'}
              <ArrowUpRightIcon className="h-5 w-5" />
            </Link>
          </div>
          {repository.homepage && (
            <div className="flex flex-col gap-y-1">
              <span className="dark:text-polar-300 text-gray-500">Website</span>
              <Link
                className="flex flex-row items-center gap-x-2"
                href={repository.homepage ?? '#'}
                rel="noopener noreferrer"
                target="_blank"
              >
                {new URL(repository.homepage).hostname}
                <ArrowUpRightIcon className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex w-full flex-row gap-x-24">
        <div className="flex max-w-4xl flex-col gap-y-32">
          <img
            className="rounded-3xl shadow-2xl dark:shadow-none"
            src="https://res.cloudinary.com/read-cv/image/upload/c_limit,h_2048,w_2048/v1/1/profileItems/2Vsd5ZTtWrTba9h5GeSbJqySWWJ2/newProfileItem/3317a7d1-451d-42ec-aaae-a5a53f00a26d.png?_a=DATC1RAAZAA0"
          />

          <Tabs defaultValue="readme">
            <TabsList
              className={
                'flex bg-transparent ring-0 dark:bg-transparent dark:ring-0'
              }
            >
              <TabsTrigger className={tabsTriggerClassName} value="readme">
                README
              </TabsTrigger>
              <TabsTrigger className={tabsTriggerClassName} value="posts">
                Posts
              </TabsTrigger>
              <TabsTrigger
                className={tabsTriggerClassName}
                value="subscriptions"
              >
                Subscriptions
              </TabsTrigger>
              <TabsTrigger
                className={tabsTriggerClassName}
                value="documentation"
              >
                Documentation
              </TabsTrigger>
              <TabsTrigger className={tabsTriggerClassName} value="issues">
                Fundable Issues ({totalIssueCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent className="py-6" value="readme">
              <div className="dark:bg-polar-900 dark:border-polar-800 flex flex-col gap-y-8 rounded-3xl border border-gray-100 bg-white p-12 shadow-sm">
                <div className="dark:text-polar-500 font-mono text-xs">
                  README.md
                </div>
                <Markdown className="prose dark:prose-invert dark:prose-a:text-blue-400 prose-a:text-blue-500 prose-a:no-underline prose-img:rounded-3xl prose-headings:leading-normal prose-headings:font-normal dark:text-polar-200 w-full max-w-full font-normal leading-relaxed">{`# Illa genus

## Suasit talia dispar pater gentes

Lorem markdownum pollice dixit alimentaque cruor, moto similis Cytherea,
sagittas nam Sardibus. Tibiaque **dumque vimque portas** invitae, et petiti
concrevit formam adfectasse breve parentum in fine veste
[hoc](http://tectis.io/velut.html). Parcite cucurri quo ignes haec furor cum
exanimi namque adiciuntque Turno ortus donec per fugiuntque casses et negat.
Omnia novum sublime, ne ingentes imagine simili: aetas nec, sed gratus, in.

> Iovis morus matris petit, et cuspis amantem et dicente natisque; coniuge rege
> sine. Ipsius acta coniunx attonitum submoverat vidit dedecet. *Ut tuum*, huc.

## Quae subsedit valentior tum lucum qui erat

Pariter diu et nam superare nomine, carinis opem nihil demittit deus sacra labor
curalium capillis paulum. [Piceumque neque
hac](http://pudorque.net/suoveluti.aspx) dolorem esse. Tempore confundas atlas
Maeonios depositoque erat luctatur ut gener, et videnda nec pisce, superis
unice. Et fit praeconsumere te letifera leaena potest, quos ille laedere orsa
lucis matri quisquis munera locumque, quam. Sola petatur possit et ad ignis ubi
fortissime prius peregrina Thetis lingua, fuit claudor **Cupidinis**.

Nam ingemuere secum, ego ultima pontus nequiquam femina sagacior parabat
Corythumque ait hic siqua. Flores mota enim coniunx destinat spoliantis tu
semper corpus, **succincta** undas. Vota hoc orant te ego non accipiter thalamo
trahit. Educat curam cedere iungi, *a* dixit litoreo miliaque iacet, vel est
*talia verba* est quercus munere. Erecthida si lunae, deam sonarent cupiens
morte; loca quod deum fugit, tam **Aetnae fera**, quam inventos.

## Modo sole putares vagantes guttura

Flamma digna; ut ferit aure animus dolorem genetrix: isdem. Haud amat alas
exspatiemur convicia.

    dhcp_cursor_surface(honeypot(login, boolean(namespaceBasicRaw), batch),
            botCiscSpider(domainExtranet, 338809) - ddr,
            boolean_copyright_processor(clob_ad, retina_terminal,
            frameworkPetaflops));
    parameterFile(remote_raw.backup_standalone(num_keywords.terabyte(type,
            io_ppm), software(hard), resolution), cyberspaceUp);
    keyBatch.compression -= 1 + network;
    intelligenceImpression = data(unicodeDial, primaryZoneWiki);
    if (fullVirtualGnutella(copy_insertion(left), commercialLinkFunction *
            cpsMinicomputer, mirrored_flatbed_cyberbullying)) {
        rawDownSearch(scrollMatrix, type * 1, reciprocal_veronica);
        repeater_newbie = -4;
    } else {
        media_directory_file *= 4;
        lte = exifCompression;
        leakTerabyte(ajaxCpa, 78, columnPlay);
    }

Arma mente vox nocti [et tenerum](http://est.org/stygate.html) poena quo affata
aconiton in cecidit. Vocato fortior tamen, [Seriphon iurasse](http://simul.net/)
alteraque stabat populusque confudit equi.`}</Markdown>
              </div>
            </TabsContent>
            <TabsContent className="py-6" value="issues">
              <ShadowBoxOnMd>
                <div className="p-4">
                  <IssuesLookingForFunding
                    organization={organization}
                    repository={repository}
                    issues={issuesFunding}
                  />
                </div>
              </ShadowBoxOnMd>
            </TabsContent>
          </Tabs>
        </div>
        <div className="sticky top-32 flex h-full flex-col gap-y-12">
          <div className="flex flex-col gap-y-6">
            <h2 className="text-xl !font-normal">Subscribers</h2>
            <div className="flex flex-row flex-wrap gap-3">
              {new Array(9).fill(0).map((_, idx) => (
                <Fragment key={idx}>
                  <Avatar className="h-10 w-10" name={'Hello'} avatar_url="" />
                </Fragment>
              ))}
              {
                <div className="dark:border-polar-700 dark:bg-polar-900 dark:text-polar-400 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-400 dark:border-2">
                  +98
                </div>
              }
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <h2 className="text-xl !font-normal">Contributors</h2>
            <div className="flex flex-col gap-y-4">
              <p className="dark:text-polar-300 text-gray-500">
                This repository doesn't have any contributors yet. Want to help
                out? Check out the issues.
              </p>
              <Link
                href={`#`}
                className="flex flex-row items-center gap-x-2 text-sm text-blue-500 dark:text-blue-400"
              >
                <span>Check out the issues</span>
                <ArrowForwardOutlined className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientPage
