import Coin from '@/components/icons/coin'
import Logo from '@/components/icons/logo'
import { Avatar } from '@nextui-org/react'
import { Bell, UserCog } from 'lucide-react'
import React from 'react'
import User from './user'

const Header = () => {
  return (
      <header className='text-primary flex justify-between items-center min-h-16  z-10 p-4'>
          <Logo></Logo>
          <div className="user-things flex h-full items-center gap-4 ">
              <span className='coins h-full flex gap-2 items-center'>
                  <Coin></Coin>
                  100 COIN
              </span>
              <div className='user bg-background h-full w-min rounded-lg flex items-center gap-4 px-4'>
                  {/* <User></User> */}
                  <Bell size={20}></Bell>
                  <UserCog size={20}></UserCog>
              </div>
              <div className='user bg-background h-full w-min rounded-lg flex items-center gap-4 pl-4'>
                  <User></User>
                  <Avatar name="primalcat" radius="sm" src="https://github.com/shadcn.png" />
              </div>
              
          </div>
      </header>
  )
}

export default Header