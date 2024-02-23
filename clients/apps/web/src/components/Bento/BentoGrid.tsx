export interface BentoGridProps extends React.PropsWithChildren {
  gap?: number
}

export const BentoGrid = ({ gap = 20, children }: BentoGridProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
        gridAutoFlow: 'dense',
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  )
}
