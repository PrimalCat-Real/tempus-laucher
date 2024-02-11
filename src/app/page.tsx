'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { toast } from 'sonner';
import { relaunch } from '@tauri-apps/api/process';
import { redirectServersPage } from '@/auth/redirect';
import { checkAndUpdateLauncher } from '@/lib/update';
import writeConfig, { config, readConfig, updateConfigValue } from '@/config/launcher';
import { readTextFile } from '@tauri-apps/api/fs';
import { atom, useRecoilState } from 'recoil';
import { useSSR } from '@/store/store';
import { recoilPersist } from 'recoil-persist'
import { usernameState } from '@/lib/user';
import { Mod, folderPathState, modsConfigState } from '@/lib/data';
import { invoke } from '@tauri-apps/api/tauri';

const { persistAtom } = recoilPersist()


export default function Home() {
  const [userName, setUserName] = useRecoilState(usernameState)
  const [modsConfig, setModsConfig] = useRecoilState(modsConfigState);
  const [folderPath, setFolderPath] = useRecoilState(folderPathState)
  useEffect(() => {
  }, []);
  // get mods
  useEffect(() => {
    const fetchFileNames = async () => {

      try {
        
        const response: string[] = await invoke('read_files_from_folder', { folderPath: folderPath + '/instances/Vanilla/mods' });
        // // setFileNames(response);
        console.log(response);
        const updatedModsConfig: Mod[] = modsConfig.map(mod => {
          // let test = ['sodium-extra-0.5.4+mc1.20.4-build.116.jar', 'sodium-fabric-0.5.8+mc1.20.4.jar']
          const foundFile = response.find(file => {
              return file.includes(mod.name) && file.includes(mod.version.split('.')[0]) && file.includes(mod.version.split('.')[1]);
          });
          // const found = response.some(file => {
          //   // Проверяем, содержит ли ответ имя и версию мода из конфига
          //   return file.includes(mod.name) || file.includes(mod.version);
          // });
        
          // const active = !response.some(file => file.endsWith(mod.name + '.disabled')); // Проверяем, заканчивается ли файл на ".disabled"
          const disabledMod = response.some(file => file.startsWith(mod.name) && file.endsWith('.disabled'));
        
          
          
          return {
            ...mod,
            filePathName: `${folderPath}\\instances\\Vanilla\\mods\\${foundFile}` || "",
            active: (foundFile && foundFile.endsWith('.disabled')) ?  true : false,
            installed: foundFile ? true : false
          };
        });
        setModsConfig(updatedModsConfig)
        // setModsConfig(updatedModsConfig)
        // console.log("mods conf", updatedModsConfig);
        
        // setData(updatedModsConfig)
       
        
      } catch (error) {
        console.error('Error fetching file names:', error);
      }
    };

    fetchFileNames();
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

