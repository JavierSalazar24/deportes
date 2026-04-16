import { Menu } from 'lucide-react'

export const ButtonSidebar = ({ toggleSidebar }) => {
  return (
    <div className='flex items-center'>
      <button
        onClick={toggleSidebar}
        className='p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden cursor-pointer'
      >
        <Menu size={20} />
      </button>
    </div>
  )
}
