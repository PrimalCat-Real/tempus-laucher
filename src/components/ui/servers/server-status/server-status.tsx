'use client'

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

interface ServerStatusResponse {
    online: boolean;
    players: {
      online: number;
      max: number;
    };
    // Add more properties as needed
  }
  

const ServerStatus = () => {

const [status, setStatus] = useState<ServerStatusResponse>(
  {
    "online": false,
    "players": {
        "online": 0,
        "max": 0,
    },
}
);

useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const address = 'tempusvanilla.gomc.fun';
        const query = true; // Enable query lookup
        const timeout = 5.0; // Timeout in seconds
  
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${address}?query=${query}&timeout=${timeout}`);
        if (!response.ok) {
          throw new Error('Failed to fetch server status');
        }
  
        const data = await response.json();
        status.online = data.online
        status.players = data.players
        setStatus(status);
      } catch (error) {
        console.error('Error fetching server status:', error);
      }
    };
  
    fetchServerStatus(); // Fetch once immediately after component mounts
  
    const intervalId = setInterval(fetchServerStatus, 10000); // Fetch every 10 seconds
  
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);
    // const test_data = {
    //     status: "online"
    // }

    const [online] = useState(0);
    const [maxOnline] = useState(100);
  return (
      <div className='flex z-20  items-center gap-2 self-end indicator-bg-color translate-x-1 min-h-[30px] px-4 rounded-l-lg' style={{ pointerEvents: 'none' }}>
          <span className="relative flex h-2 w-2">
              <span className={cn("transition-colors animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75", status && status.online  ? 'bg-green-400' : 'bg-red-500')}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2 bg-green-500", status && status.online  ? 'bg-green-400' : 'bg-red-500')}></span>
          </span>
          {status.players.online} / {status.players.max}
      </div>
  )
}

export default ServerStatus