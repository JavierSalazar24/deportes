export const MetricBox = ({ icon: Icon, label, value, sub, color, bg }) => (
  <div className={`rounded-lg p-2 flex flex-col justify-center ${bg}`}>
    <div className='flex items-center gap-1.5 mb-2 justify-center'>
      <Icon size={12} className={color} />
      <span className='text-[11px] text-gray-500 uppercase tracking-tight'>
        {label}
      </span>
    </div>
    <span className='text-sm font-bold text-gray-700 leading-tight text-center'>
      {value}{' '}
      {sub && (
        <span className='text-[11px] font-normal text-gray-400 ml-0.5'>
          {sub}
        </span>
      )}
    </span>
  </div>
)
