import { useEffect, useRef } from 'react'
import { Transformer } from 'markmap-lib/no-plugins'
import { Markmap } from 'markmap-view'

type MindmapProps = {
  markdown: string
}

// Reuse one transformer instance (it holds markdown-it configuration)
const transformer = new Transformer()

function Mindmap({ markdown }: MindmapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return

    const { root } = transformer.transform(markdown)
    // initialExpandLevel: using 2 to show skill categories and skills, but hide the skills details
    const mindmap = Markmap.create(
      svg,
      { autoFit: true, duration: 300, initialExpandLevel: 2 },
      root,
    )

    const fit = () => {
      void mindmap.fit()
    }
    const resizeObserver = new ResizeObserver(fit)
    resizeObserver.observe(container)
    window.addEventListener('resize', fit)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', fit)
      mindmap.destroy()
    }
  }, [markdown])

  return (
    <div className="skill-mindmap" ref={containerRef}>
      <svg ref={svgRef} role="img" aria-label="Interactive mindmap of skills" />
    </div>
  )
}

export default Mindmap
