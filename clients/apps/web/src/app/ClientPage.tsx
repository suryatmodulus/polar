'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import {
  ArrowForward,
  BoltOutlined,
  DiamondOutlined,
  FavoriteBorderOutlined,
  ViewDayOutlined,
} from '@mui/icons-material'
import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import NextLink, { LinkProps } from 'next/link'
import { LogoIcon } from 'polarkit/components/brand'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Gradient } from '../components/LandingPage/MeshGradient'

const featureCards = [
  {
    title: 'Subscriptions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis lacus risus. Nulla facilisi.',
    icon: <BoltOutlined fontSize="inherit" />,
  },
  {
    title: 'Benefits',
    description: '',
    icon: <DiamondOutlined fontSize="inherit" />,
  },
  {
    title: 'Posts',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis lacus risus. Nulla facilisi.',
    icon: <ViewDayOutlined fontSize="inherit" />,
  },
  {
    title: 'Funding',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis lacus risus. Nulla facilisi.',
    icon: <FavoriteBorderOutlined fontSize="inherit" />,
  },
]

const Link = ({
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps & { className?: string }>) => {
  const variants: Variants = {
    initial: {
      y: '100%',
    },
    animate: {
      y: '0%',
      transition: {
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  }

  const variantsOutgoing: Variants = {
    initial: {
      y: '0%',
    },
    animate: {
      y: '-100%',
      transition: {
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  }

  return (
    <motion.div
      className="overflow-hidden"
      initial="initial"
      whileHover="animate"
    >
      <NextLink {...props} className="relative">
        <motion.div
          className={twMerge('absolute', className)}
          variants={variants}
        >
          {children}
        </motion.div>
        <motion.div className={className} variants={variantsOutgoing}>
          {children}
        </motion.div>
      </NextLink>
    </motion.div>
  )
}

const ClientPage = () => {
  const ref = useRef(null)

  useEffect(() => {
    const gradient = new Gradient()
    /** @ts-ignore */
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <>
      <main className="flex flex-col bg-black text-white">
        <motion.header
          className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-full max-w-screen-2xl flex-row items-center justify-between py-16"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 1.2, duration: 1 } },
          }}
          initial="initial"
          animate="animate"
        >
          <div className="flex flex-row items-center gap-x-24">
            <Link href="/">
              <LogoIcon className="h-16 w-16" />
            </Link>
            <ul className="flex flex-row gap-x-12 text-xl font-light">
              <Link href="#maintainer">Creator</Link>
              <Link href="#backer">Supporter</Link>
              <Link href="#community">Community</Link>
              <Link href="#company">Company</Link>
            </ul>
          </div>
          <div className="flex flex-row items-center gap-x-24">
            <ul className="flex flex-row gap-x-12 text-xl font-light">
              <Link href="/login">Log in</Link>
            </ul>
          </div>
        </motion.header>
        <motion.section
          ref={ref}
          className="relative flex h-screen w-full flex-col justify-between p-32 "
        >
          <canvas
            id="gradient-canvas"
            className="absolute inset-0 z-0 h-full w-full"
            data-transition-in
          />
          <motion.div
            className="relative mx-auto flex max-w-screen-2xl flex-grow flex-col items-center justify-center gap-y-16 lg:gap-y-24"
            variants={{
              initial: { opacity: 1 },
              animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-center text-5xl leading-snug tracking-tight lg:text-[calc(100vw_/_20)]">
              <TextReveal>
                A creator platform for
                <br className="hidden lg:block" />
              </TextReveal>
              <TextReveal>Developers</TextReveal>
            </h1>
            <TextReveal>
              <p className="text-xl font-light md:text-3xl">
                Turn your coding endeavors into a sustainable income
              </p>
            </TextReveal>
            <motion.div
              className="flex flex-row items-center gap-x-12"
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { duration: 1, delay: 1.5 },
                },
              }}
            >
              <button className="flex flex-row items-center gap-x-4 whitespace-nowrap rounded-full bg-blue-500 px-8 py-4 font-light text-white shadow-sm transition-colors duration-300 hover:bg-white hover:text-blue-500 md:text-xl">
                <span>Create with Polar</span>
                <ArrowForward />
              </button>

              <Link
                className="flex flex-row items-center gap-x-4 whitespace-nowrap bg-transparent py-4 font-light md:text-xl"
                href="https://github.com/polarsource/polar"
              >
                <span>Open Source</span>
                <ArrowUpRightIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
        <motion.section className="flex w-full flex-row justify-between gap-y-12 bg-white p-32 text-gray-950">
          <div className="mx-auto flex max-w-screen-2xl flex-row justify-between gap-24">
            <div className="flex w-1/3 flex-col gap-y-12">
              <h1 className="text-6xl !font-medium">Grow an audience</h1>
              <p className="max-w-lg text-2xl leading-normal text-gray-600">
                Distribute exclusive content & transform your coding passion
                into a monthly income stream.
              </p>
            </div>
            <div className="grid w-2/3 grid-cols-3 gap-8">
              <div className="row-span-1 flex flex-col gap-y-8 rounded-[2rem] bg-blue-50 bg-opacity-50 p-10">
                <LogoIcon className="-ml-2 h-16 w-16 text-blue-500" />
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-4xl !font-medium leading-tight text-blue-500">
                    Grow an audience
                    <br />
                    <span className="text-4xl !font-medium text-gray-500">
                      with Polar for Business
                    </span>
                  </h3>
                </div>
              </div>
              <div className="col-span-2 row-span-1 flex flex-col items-center justify-center gap-y-2 rounded-[2rem] bg-blue-50 bg-opacity-50 p-10">
                <h3 className="text-4xl !font-medium text-blue-500">
                  Grow an audience
                </h3>
                <h3 className="text-4xl !font-medium text-gray-500">
                  with Subscriptions Tiers
                </h3>
              </div>

              {featureCards.map((card, i) => (
                <div
                  key={i}
                  className={`row-span-1 flex flex-col gap-y-8 rounded-[2rem] bg-blue-50 bg-opacity-50 p-10 ${
                    i % 3 === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <div className="self-start rounded-full bg-blue-100">
                    <div className="flex h-16 w-16 items-center justify-center text-3xl text-blue-500">
                      {card.icon}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <h3 className="text-4xl !font-medium">{card.title}</h3>
                    <h3 className="text-4xl !font-medium text-gray-500">
                      {card.description}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        {/*  <motion.footer className="flex w-full flex-col items-center bg-black p-32">
          <div
            className={twMerge(
              'flex w-full flex-col gap-x-16 gap-y-24 md:max-w-7xl md:flex-row md:justify-between md:gap-y-12',
            )}
          >
            <div className="flex flex-col gap-y-8">
              <h3 className="dark:text-polar-50 text-xl">Creator</h3>
              <div className="flex flex-col gap-y-1">
                <FooterLink href="/new">Subscriptions</FooterLink>
                <FooterLink href="/new">Benefits</FooterLink>
                <FooterLink href="/new">Posts</FooterLink>
                <FooterLink href="/new">Backlog Funding</FooterLink>
                <FooterLink href="https://docs.polar.sh">
                  Documentation
                </FooterLink>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <h3 className="dark:text-polar-50 text-xl">Supporter</h3>
              <div className="flex flex-col gap-y-1">
                <FooterLink href="/new">Subscriptions</FooterLink>
                <FooterLink href="/new">Benefits</FooterLink>
                <FooterLink href="/new">Posts</FooterLink>
                <FooterLink href="/new">Backlog Funding</FooterLink>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <h3 className="dark:text-polar-50 text-xl">Company</h3>
              <div className="flex flex-col gap-y-1">
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="https://blog.polar.sh">Blog</FooterLink>
                <FooterLink href="https://polarsource.github.io/legal/terms.pdf">
                  Terms of Service
                </FooterLink>
                <FooterLink href="https://polarsource.github.io/legal/privacy-policy.pdf">
                  Privacy Policy
                </FooterLink>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <h3 className="dark:text-polar-50 text-xl">Community</h3>
              <div className="flex flex-col gap-y-1">
                <FooterLink href="https://discord.gg/STfRufb32V">
                  Join our Discord
                </FooterLink>
                <FooterLink href="https://github.com/polarsource">
                  Github
                </FooterLink>
                <FooterLink href="https://x.com/polar_sh">
                  X / Twitter
                </FooterLink>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <h3 className="dark:text-polar-50 text-xl">Support</h3>
              <div className="flex flex-col gap-y-1">
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="mailto:support@polar.sh">Contact</FooterLink>
              </div>
            </div>
          </div>
        </motion.footer> */}
      </main>
    </>
  )
}

export default ClientPage

const FooterLink = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      className="flex flex-row items-center gap-x-1 text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
      {...props}
    >
      {props.children}
    </Link>
  )
}

const variants: Variants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: '0%',
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
}

const TextReveal = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div {...props} className="relative h-fit overflow-hidden">
      <motion.div variants={variants}>{children}</motion.div>
    </motion.div>
  )
}
