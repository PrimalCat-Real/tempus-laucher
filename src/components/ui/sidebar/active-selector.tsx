'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn, removeLanguagePrefix } from '@/lib/utils';
import { SideNavItem } from '@/lib/types';

const ActiveSelector = ({ items }: {items:SideNavItem[]}) => {

const pathname = usePathname();
const [activeIndex, setActiveIndex] = useState(0);



useEffect(() => {
  setActiveIndex(items.findIndex((item) => item.path === removeLanguagePrefix(pathname)));
}, [pathname, items]);


  
  const topStyle = activeIndex !== -1 ? { top: `${activeIndex * 43.5 + 18}px` } : {};
  return (
      <div
          style={topStyle}
          className={cn('absolute transition-all duration-300 bg-primary-foreground custom-hover-shadow h-9 w-0.5 rounded-full -z-10 left-0')}
      >
      </div>
  );
};

export default ActiveSelector;