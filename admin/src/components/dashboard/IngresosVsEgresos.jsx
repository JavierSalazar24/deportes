import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { BarChart3, TrendingUp } from 'lucide-react'
import { CustomTooltip } from './CustomTooltip'

export function IngresosVsEgresos({ ingresosEgresos }) {
  const [chartType, setChartType] = useState('area')

  return (
    <div className='bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden'>
      <div className='p-5 border-b border-gray-200 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Ingresos vs Gastos
          </h3>
          <p className='text-sm text-gray-500'>
            Comparativa mensual {new Date().getFullYear()}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setChartType('area')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              chartType === 'area'
                ? 'bg-teal-500/20 text-teal-400'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <TrendingUp className='w-4 h-4' />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              chartType === 'bar'
                ? 'bg-teal-500/20 text-teal-400'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BarChart3 className='w-4 h-4' />
          </button>
        </div>
      </div>

      <div className='p-5'>
        <div className='h-72'>
          {ingresosEgresos.length === 0 ? (
            <p className='text-center text-gray-400 text-xl font-medium'>
              No hay datos para graficar.
            </p>
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              {chartType === 'area' ? (
                <AreaChart data={ingresosEgresos}>
                  <defs>
                    <linearGradient
                      id='colorIngresos'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#14b8a6' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#14b8a6' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id='colorGastos'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#ef4444' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#ef4444' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='#dddddd' />
                  <XAxis dataKey='month' stroke='#6b7280' fontSize={12} />
                  <YAxis
                    stroke='#6b7280'
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        active={true}
                        payload={ingresosEgresos}
                        label='Ingresos vs Gastos'
                      />
                    }
                  />
                  <Area
                    type='monotone'
                    dataKey='ingresos'
                    name='Ingresos'
                    stroke='#00ab78'
                    strokeWidth={2}
                    fillOpacity={1}
                    fill='url(#colorIngresos)'
                  />
                  <Area
                    type='monotone'
                    dataKey='gastos'
                    name='Gastos'
                    stroke='#ef4444'
                    strokeWidth={2}
                    fillOpacity={1}
                    fill='url(#colorGastos)'
                  />
                </AreaChart>
              ) : (
                <BarChart data={ingresosEgresos}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#dddddd' />
                  <XAxis dataKey='month' stroke='#6b7280' fontSize={12} />
                  <YAxis
                    stroke='#6b7280'
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        active={true}
                        payload={ingresosEgresos}
                        label='Ingresos vs Gastos'
                      />
                    }
                  />
                  <Bar
                    dataKey='ingresos'
                    name='Ingresos'
                    fill='#00ab78'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='gastos'
                    name='Gastos'
                    fill='#ef4444'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        <div className='flex items-center justify-center gap-6 mt-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-success'></div>
            <span className='text-sm text-gray-400'>Ingresos</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <span className='text-sm text-gray-400'>Gastos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
