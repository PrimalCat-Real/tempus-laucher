import { LayoutDashboard, Settings } from 'lucide-react'
import React from 'react'
import MenuLink from './menulink'
import { SideNavItem } from '@/lib/types'
import ActiveSelector from './active-selector'

const Sidebar = () => {

  const SIDE_NAV_ITEMS: SideNavItem[] = 
    [
      {
        path: '/servers',
        title: 'Сервера',
        icon: <LayoutDashboard></LayoutDashboard>,
      },
      {
        path: '/settings',
        title: 'Настройки',
        icon: <Settings ></Settings >,
      }
    ]


  return (
      <aside className='sticky top-0 left-0 min-w-[60px] h-full bg-background rounded-md py-6 text-primary flex flex-col items-center'>
          <nav className='flex  gap-5 flex-col'>

              {SIDE_NAV_ITEMS.map((item, index) => {return(
                  <MenuLink key={index} item={item}></MenuLink>
              )})}

              <ActiveSelector items={SIDE_NAV_ITEMS}></ActiveSelector>
          </nav>
          {/* <LayoutDashboard></LayoutDashboard>
          <Bell></Bell> */}
      </aside>
  )
}

export default Sidebar