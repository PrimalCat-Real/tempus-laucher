'use client'

import { vanillaStatusState } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Skeleton } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';



const ServerStatus = () => {

const [isLoaded, setIsLoaded] = React.useState(false);
const [status, setStatus] =  useRecoilState(vanillaStatusState)

useEffect(() => {
  const fetchServerStatus = async () => {
    try {
      const address = 'play.tempus-vanilla.fun';
      const query = true; // Enable query lookup
      const timeout = 5.0; // Timeout in seconds

      const response = await fetch(`https://api.mcstatus.io/v2/status/java/${address}?query=${query}&timeout=${timeout}`);
      
      if (!response.ok) {
        setIsLoaded(false)
        throw new Error('Failed to fetch server status');
      }
      setIsLoaded(true)

      const data = await response.json();
      // console.log(data);
      
      setStatus({
        online: data.online,
        players: data.players
      });
      // console.log(status.online);
    } catch (error) {
      console.error('Error fetching server status:', error);
    }
  };

  fetchServerStatus();
  setInterval(fetchServerStatus, 10000)
}, []); 
  return (
    <Skeleton isLoaded={isLoaded} className="rounded-l-lg self-end translate-x-1">
      <div className='flex z-20  items-center gap-2 self-end indicator-bg-color translate-x-1 min-h-[30px] px-4 rounded-l-lg' style={{ pointerEvents: 'none' }}>
          <span className="relative flex h-2 w-2">
              <span className={cn("transition-colors animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75", status && status.online  ? 'bg-green-400' : 'bg-red-500')}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2 bg-green-500", status && status.online  ? 'bg-green-400' : 'bg-red-500')}></span>
          </span>
          
          {status.players.online} / 100
          {/* / {status.players.max} */}
          
          
      </div>
    </Skeleton>
  )
}

export default ServerStatus