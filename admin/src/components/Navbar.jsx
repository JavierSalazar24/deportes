import { ButtonSidebar } from './header/ButtonSidebar'
import { CountdownPartido } from './header/CountdownPartido'
import { DropDownNavbar } from './header/DropDownNavbar'

export const Navbar = ({ toggleSidebar }) => {
  return (
    <header className='bg-white shadow-sm border-b border-gray-100 z-10 '>
      <div className='flex items-center justify-between h-auto min-h-[72px] md:h-20'>
        <ButtonSidebar toggleSidebar={toggleSidebar} />

        <div className='flex items-center'>
          <CountdownPartido />
        </div>

        <DropDownNavbar />
      </div>
    </header>
  )
}
