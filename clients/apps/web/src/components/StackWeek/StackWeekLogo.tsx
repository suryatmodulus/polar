import { LogoIcon } from 'polarkit/components/brand'
import { twMerge } from 'tailwind-merge'

export interface StackWeekLogoProps {
  radius: number
  animate?: boolean
}

export const StackWeekLogo = ({ radius, animate }: StackWeekLogoProps) => {
  const offset = radius * 0.75

  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-full"
      style={{
        width: radius,
        height: radius,
        border: `${Math.ceil(radius / 100)}px solid white`,
      }}
    >
      <LogoIcon size={radius / 2} />
      <div
        className={twMerge(
          'absolute inset-0 h-full w-full fill-white font-semibold uppercase tracking-wide',
          animate ? 'animate-spin [animation-duration:20s]' : '',
        )}
        style={{ fontSize: radius * 0.12 }}
      >
        <svg
          x="0"
          y="0"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          enable-background={`new 0 0 ${radius * 2} ${radius * 2}`}
          xmlSpace="preserve"
        >
          <defs>
            <path
              transform={`rotate(40, ${radius}, ${radius})`}
              id="circlePath"
              d={`
M ${radius}, ${radius}
m -${offset}, 0
a ${offset},${offset} 0 0,1 ${offset * 2},0
a ${offset},${offset} 0 0,1 -${offset * 2},0
`}
            />
          </defs>
          <g>
            <text>
              <textPath xlinkHref="#circlePath" textLength={offset * 6.1}>
                Stack Week · Stack Week · Stack Week ·
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
