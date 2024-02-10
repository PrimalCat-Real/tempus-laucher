'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { toast } from 'sonner';
import { relaunch } from '@tauri-apps/api/process';
import { redirectServersPage } from '@/auth/redirect';
import { checkAndUpdateLauncher } from '@/lib/update';
import { storePaths } from '@/lib/utils';
import writeConfig, { config, readConfig, updateConfigValue } from '@/config/launcher';
import { readTextFile } from '@tauri-apps/api/fs';
import { atom, useRecoilState } from 'recoil';
import { useSSR } from '@/store/store';
import { recoilPersist } from 'recoil-persist'
import { usernameState } from '@/lib/user';

const { persistAtom } = recoilPersist()


export default function Home() {
  const [userName, setUserName] = useRecoilState(usernameState)
  useEffect(() => {
  }, []);
  useEffect(() => {
    
    checkAndUpdateLauncher();
    // redirectServersPage();

  //   const userName = localStorage.getItem('userName');
    if (userName !== null && userName.length > 0) {
      redirect('/servers');
    } else {
      redirect('/login');
    }
  }, []);
  return (
    null
  ); // You can render some content here if needed
}

