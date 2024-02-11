"use client"

import { usernameState } from '@/lib/user'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { redirect, useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

const Page = () => {
  // const [userName, setUserName] = useState('');
  const [userName, setUserName] = useRecoilState(usernameState)
  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    // Save the username to local storage
    // localStorage.setItem('userName', userName);
    
    // Use the router to navigate to /servers
    router.push('/servers');
  };


  return (
    <div className='flex flex-col w-full gap-4'>
      <Input
        type="text"
        className='max-h-[50px] w-full'
        label="Имя пользователя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleLogin();
          }
      }}
      />
      <Button onClick={handleLogin} color="primary" className='h-[50px] w-full text-background'>
        Войти
      </Button>
    </div>
  );
};

export default Page;