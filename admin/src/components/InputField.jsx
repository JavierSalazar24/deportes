import { Eye } from 'lucide-react'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import { useLocation } from 'react-router'

export const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  disabled,
  opcSelect = [],
  accept = '',
  loadOptions = () => {},
  classInput = 'md:col-span-1',
  document = false,
  autofocus = false,
  step = '0.01',
  multiple = false,
  placeholder = ''
}) => {
  const { pathname } = useLocation()

  return (
    <div className={`sm:col-span-6 ${classInput}`}>
      <div className='flex justify-between'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </label>
        {document && (
          <a
            href={document}
            target='_blank'
            className='text-sm text-gray-700 hover:opacity-80 cursor-pointer'
          >
            <Eye className='h-6' />
          </a>
        )}
      </div>
      <div className='mt-1'>
        {type === 'select' ? (
          <select
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
          >
            {opcSelect.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        ) : type === 'async' ? (
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            name={name}
            id={name}
            value={value}
            placeholder='Selecciona una opción...'
            onChange={onChange}
            isDisabled={disabled}
            required={required}
            classNames={{
              control: () =>
                'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-100'
            }}
          />
        ) : type === 'async-multi' ? (
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            isDisabled={disabled}
            isMulti
            required={required}
            classNames={{
              control: () =>
                'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-100'
            }}
          />
        ) : type === 'select-normal' ? (
          <Select
            options={opcSelect}
            isMulti
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            isDisabled={disabled}
            required={required}
            classNames={{
              control: () =>
                'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md border disabled:bg-gray-100'
            }}
          />
        ) : type === 'file' ? (
          <>
            <input
              accept={accept}
              type={type}
              name={name}
              id={name}
              multiple={multiple}
              onChange={onChange}
              disabled={disabled}
              required={required}
              className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
            />
          </>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            id={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            required={required}
            rows={
              ['/logs', '/limpieza-logs'].includes(pathname) && value !== ''
                ? 8
                : 3
            }
            className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
          />
        ) : type === 'number' ? (
          <input
            type={type}
            name={name}
            autoFocus={autofocus}
            id={name}
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => {
              const v = parseFloat(e.target.value)
              if (v >= 0 || isNaN(v)) onChange(e)
            }}
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault()
              }
            }}
            onWheel={(e) => e.target.blur()}
            disabled={disabled}
            required={required}
            step={step}
            min={0}
            className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
          />
        ) : (
          <input
            type={type}
            name={name}
            autoFocus={autofocus}
            id={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100'
          />
        )}
      </div>
    </div>
  )
}
