import { ReactNode, CSSProperties } from 'react'
import { spring, interpolate } from 'remotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale'
type SpringConfig = 'smooth' | 'snappy'

interface AnimatedElementProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  totalFrames?: number
  springConfig?: SpringConfig
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: CSSProperties
}

const springConfigs = {
  smooth: { damping: 20, stiffness: 50, mass: 1 },
  snappy: { damping: 15, stiffness: 100 },
}

export function AnimatedElement({
  children,
  animation = 'fadeUp',
  delay = 0,
  totalFrames = 60,
  springConfig = 'smooth',
  as: Component = 'div',
  className,
  style,
}: AnimatedElementProps) {
  const { frame, fps, ref } = useScrollFrame({ totalFrames: totalFrames + delay })

  const delayedFrame = Math.max(0, frame - delay)

  const springValue = spring({
    frame: delayedFrame,
    fps,
    config: springConfigs[springConfig],
  })

  const getAnimationStyle = (): CSSProperties => {
    switch (animation) {
      case 'fadeUp':
        return {
          opacity: springValue,
          transform: `translateY(${interpolate(springValue, [0, 1], [40, 0])}px)`,
        }
      case 'fadeIn':
        return {
          opacity: springValue,
        }
      case 'slideLeft':
        return {
          opacity: springValue,
          transform: `translateX(${interpolate(springValue, [0, 1], [60, 0])}px)`,
        }
      case 'slideRight':
        return {
          opacity: springValue,
          transform: `translateX(${interpolate(springValue, [0, 1], [-60, 0])}px)`,
        }
      case 'scale':
        return {
          opacity: springValue,
          transform: `scale(${interpolate(springValue, [0, 1], [0.8, 1])})`,
        }
      default:
        return {}
    }
  }

  const animatedStyle: CSSProperties = {
    ...getAnimationStyle(),
    willChange: 'transform, opacity',
    ...style,
  }

  return (
    // @ts-expect-error - Dynamic component type
    <Component ref={ref} className={className} style={animatedStyle}>
      {children}
    </Component>
  )
}

export function useStaggeredAnimation(
  itemCount: number,
  options: {
    baseDelay?: number
    staggerDelay?: number
    totalFrames?: number
    springConfig?: SpringConfig
  } = {}
) {
  const {
    baseDelay = 0,
    staggerDelay = 8,
    totalFrames = 60,
    springConfig = 'smooth',
  } = options

  const maxDelay = baseDelay + (itemCount - 1) * staggerDelay
  const { frame, fps, ref } = useScrollFrame({ totalFrames: totalFrames + maxDelay })

  const getItemStyle = (index: number, animation: AnimationType = 'fadeUp'): CSSProperties => {
    const itemDelay = baseDelay + index * staggerDelay
    const delayedFrame = Math.max(0, frame - itemDelay)

    const springValue = spring({
      frame: delayedFrame,
      fps,
      config: springConfigs[springConfig],
    })

    switch (animation) {
      case 'fadeUp':
        return {
          opacity: springValue,
          transform: `translateY(${interpolate(springValue, [0, 1], [40, 0])}px)`,
          willChange: 'transform, opacity',
        }
      case 'fadeIn':
        return {
          opacity: springValue,
          willChange: 'opacity',
        }
      case 'slideLeft':
        return {
          opacity: springValue,
          transform: `translateX(${interpolate(springValue, [0, 1], [60, 0])}px)`,
          willChange: 'transform, opacity',
        }
      case 'slideRight':
        return {
          opacity: springValue,
          transform: `translateX(${interpolate(springValue, [0, 1], [-60, 0])}px)`,
          willChange: 'transform, opacity',
        }
      case 'scale':
        return {
          opacity: springValue,
          transform: `scale(${interpolate(springValue, [0, 1], [0.8, 1])})`,
          willChange: 'transform, opacity',
        }
      default:
        return {}
    }
  }

  return { ref, getItemStyle, frame, fps }
}
