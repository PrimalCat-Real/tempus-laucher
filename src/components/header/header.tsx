'use client'
import Coin from '@/components/icons/coin'
import Logo from '@/components/icons/logo'
import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Bell, UserCog } from 'lucide-react'
import React, { useState } from 'react'
import User from './user'
import { useRecoilState } from 'recoil'
import { usernameState } from '@/lib/user'

const Header = () => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [userName, setUserName] = useRecoilState(usernameState)
    const [inputUserName, setInputUserName] = useState('')

    const changeUserName = async () => {
        setUserName(inputUserName)
        onClose()
    };
  return (
      <header className='text-primary flex justify-between items-center min-h-16  z-10 p-4'>
          <Logo></Logo>
          <div className="user-things flex h-full items-center gap-4 ">
              <span className='coins h-full flex gap-2 items-center'>
                  <Coin></Coin>
                  0 COIN
              </span>
              <div className='user bg-background h-full w-min rounded-lg flex items-center gap-4 px-4'>
                  {/* <User></User> */}
                  <Bell size={20}></Bell>
                  <UserCog className='cursor-pointer' onClick={onOpen} size={20}></UserCog>
                  <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalBody className='min-h-[240px] flex flex-col justify-center text-primary gap-6'>
                            <Input
                                type="text"
                                className='max-h-[50px] w-full'
                                label="Имя пользователя"
                                value={inputUserName}
                                onChange={(e) => setInputUserName(e.target.value)}
                                // onKeyDown={handleKeyDown}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        changeUserName();
                                    }
                                }}
                            />
                            <Button onClick={changeUserName} color="primary" className='h-[50px] w-full text-background'>
                                Сменить
                            </Button>
                        </ModalBody>
                        </>
                    )}
                    </ModalContent>
                </Modal>
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