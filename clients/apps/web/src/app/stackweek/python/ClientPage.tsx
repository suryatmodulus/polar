'use client'

import { StackWeekLogo } from '@/components/StackWeek/StackWeekLogo'
import { HTMLMotionProps, Variants, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Gradient } from '../../../components/LandingPage/MeshGradient'

const ClientPage = () => {
  const ref = useRef(null)

  useEffect(() => {
    const gradient = new Gradient()
    /** @ts-ignore */
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <>
      <main className="flex h-full flex-col bg-black text-white">
        <motion.section
          ref={ref}
          className="relative flex h-full min-h-screen w-full flex-col justify-between px-8 py-32 xl:p-24"
        >
          <canvas
            id="gradient-canvas"
            className="absolute inset-0 z-0 h-full w-full"
            data-transition-in
          />
          <motion.div
            className="relative mx-auto flex max-w-screen-2xl flex-grow flex-col items-center justify-center gap-y-24"
            variants={{
              initial: { opacity: 1 },
              animate: { opacity: 1, transition: { staggerChildren: 0.5 } },
            }}
            initial="initial"
            animate="animate"
          >
            <TextReveal>
              <StackWeekLogo radius={200} animate />
            </TextReveal>
            <h1 className="text-center text-5xl !font-medium leading-snug tracking-tight lg:text-[calc(100vw_/_20)]">
              <TextReveal className="[text-wrap:balance]">
                Artificial Intelligence & Python
              </TextReveal>
            </h1>
            <TextReveal>
              <p className="max-w-2xl text-center text-xl font-light !leading-normal [text-wrap:pretty] md:text-3xl">
                Celebrating a new generation of APIs for LLM models & modern web
                applications
              </p>
            </TextReveal>
          </motion.div>
        </motion.section>
      </main>
    </>
  )
}

export default ClientPage

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 3,
    },
  },
}

const TextReveal = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div {...props} className="relative h-fit">
      <motion.div variants={variants}>{children}</motion.div>
    </motion.div>
  )
}
