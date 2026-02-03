export const TimeBlock = ({ value, label }) => (
    <div className='flex flex-col items-center'>
      <div className='relative group'>
        <div className='absolute inset-0 bg-blue-500/20 rounded-lg blur-md group-hover:blur-lg transition-all opacity-50'></div>
        <div className='relative bg-gradient-to-b from-card to-gray-100 border border-blue-500/30 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 min-w-[40px] md:min-w-[48px]'>
          <span className='text-xl md:text-2xl font-bold text-blue-500 tabular-nums tracking-tight'>
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className='text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mt-1.5 font-medium'>
        {label}
      </span>
    </div>
  )