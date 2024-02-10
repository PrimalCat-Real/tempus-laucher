'use client'

import React, { ReactNode } from 'react'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';


const RecoilProvider = ({children} : {children: ReactNode}) => {
  return (
    <RecoilRoot>{children}</RecoilRoot>
  )
}

export default RecoilProvider