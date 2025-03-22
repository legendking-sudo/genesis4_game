import { Chart } from "@/components/ui/chart"
import type * as React from "react"

const ChartContainer = ({
  className,
  children,
  xAxisLabel,
  yAxisLabel,
}: { className?: string; children: React.ReactNode; xAxisLabel?: string; yAxisLabel?: string }) => {
  return (
    <div className={className}>
      {children}
      {xAxisLabel && <div>{xAxisLabel}</div>}
      {yAxisLabel && <div>{yAxisLabel}</div>}
    </div>
  )
}

const ChartGrid = () => {
  return <div className="chart-grid"></div>
}

const ChartLine = () => {
  return <div className="chart-line"></div>
}

interface ChartLineSeriesProps {
  data: { [key: string]: any }[]
  xAccessor: (d: { [key: string]: any }) => string | number
  yAccessor: (d: { [key: string]: any }) => number
  className?: string
}

const ChartLineSeries = ({ data, xAccessor, yAccessor, className }: ChartLineSeriesProps) => {
  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={index} style={{ left: `${xAccessor(item)}`, bottom: `${yAccessor(item)}` }}></div>
      ))}
    </div>
  )
}

const ChartTooltip = () => {
  return <div className="chart-tooltip"></div>
}

const ChartXAxis = () => {
  return <div className="chart-x-axis"></div>
}

const ChartYAxis = () => {
  return <div className="chart-y-axis"></div>
}

export { Chart, ChartContainer, ChartGrid, ChartLine, ChartLineSeries, ChartTooltip, ChartXAxis, ChartYAxis }

