
import React from 'react'
import { PieChartGrid } from './charts/PieChart'
import { TooltipChart } from './charts/TooltipChart'

export const DashboardGrid = () => {

  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
      <PieChartGrid/>
      <TooltipChart/>
    </div>
  )
}

