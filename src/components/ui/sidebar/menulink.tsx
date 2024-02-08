'use client'

import { SideNavItem } from '@/lib/types'
import { cn, removeLanguagePrefix } from '@/lib/utils'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/dist/client/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const MenuLink = ({item} : {item: SideNavItem}) => {
 const pathname = usePathname()

  return (
      <Tooltip
          placement="right"
          content={item.title}
          color="secondary"
          className='text-primary bg-default-100'
        >

          <Link
              className={cn('text-secondary-foreground flex items-center gap-2 capitalize transition-all duration-200', {
            'text-secondary custom-hover-shadow': pathname === item.path,
          })}
              href={item.path}
        >
              {item.icon}
          </Link>
      </Tooltip>
    )
}

export default MenuLink