export const ChartCard = ({ title, subtitle, children, actions }) => {
  return (
    <div className='bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden'>
      <div className='p-5 border-b border-gray-200 flex items-center justify-between'>
        <div>
          <h3 className='font-semibold text-foreground'>{title}</h3>
          {subtitle && (
            <p className='text-sm text-muted-foreground mt-0.5'>{subtitle}</p>
          )}
        </div>
        {actions && <div className='flex items-center gap-2'>{actions}</div>}
      </div>
      <div className='px-5 py-3'>{children}</div>
    </div>
  )
}
