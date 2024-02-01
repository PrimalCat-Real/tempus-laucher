'use client'

import React, { useState } from 'react'

const ServerStatus = () => {

    // const test_data = {
    //     status: "online"
    // }

    const [online] = useState(0);
    const [maxOnline] = useState(100);
  return (
      <div className='flex z-20  items-center gap-2 self-end indicator-bg-color translate-x-1 min-h-[30px] px-4 rounded-l-lg' style={{ pointerEvents: 'none' }}>
          <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {online} / {maxOnline}
      </div>
  )
}

export default ServerStatus