'use client'

import { useEffect, useRef, useState } from 'react';
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
import { Mod, actionStatusState, folderPathState, modsConfigState } from '@/lib/data';
import { invoke } from '@tauri-apps/api/tauri';
import { checkFileExisting } from '@/lib/utils';

const { persistAtom } = recoilPersist()


export default function Home() {
  const [userName, setUserName] = useRecoilState(usernameState)
  const [modsConfig, setModsConfig] = useRecoilState(modsConfigState);
  const [folderPath, setFolderPath] = useRecoilState(folderPathState)
  const [actionStatus, setActionStatus] = useRecoilState(actionStatusState);

  
  const toastShown = useRef(false);

  // update checker
  useEffect(() => {
    checkUpdate().then(({ shouldUpdate, manifest }) => {
      if (shouldUpdate && manifest) {
        if (!toastShown.current) {
          const { version: newVersion, body: releaseNotes } = manifest;
          toast('Доступно обновление ' + newVersion, {
            action: {
              label: 'Undo',
              onClick: () => {console.log('Undo')
              startInstall(newVersion)
              } 
            },
          });
        }
        toastShown.current = true;
      }else{
        if (!toastShown.current) {
          toast.info('Нету обновлений')
        }
        toastShown.current = true;
      }
    });
  }, []);

  function startInstall(newVersion: string) {
    installUpdate().then(relaunch);
  }
  // get mods
  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response: string[] = await invoke('read_files_from_folder', { folderPath: folderPath + '/instances/Vanilla/mods' });
        // // setFileNames(response);
        console.log(response);
        console.log(modsConfig);
        const updatedModsConfig: Mod[] = modsConfig.map(mod => {
          const foundFile = response.find(file => {
              const versionParts = mod.version.split('-');
              let allPartsIncluded = true;

              for (const part of versionParts) {
                // console.log(file, part);
                
                  if (!file.includes(part)) {
                      allPartsIncluded = false;
                      break;
                  }
              }
              // console.log(file, file.includes(mod.name), allPartsIncluded)
              return (file.includes(mod.name) && allPartsIncluded) || file.includes(mod.filePathName);
          });
        
          // const active = !response.some(file => file.endsWith(mod.name + '.disabled')); // Проверяем, заканчивается ли файл на ".disabled"
          const disabledMod = response.some(file => file.startsWith(mod.name) && file.endsWith('.disabled'));
          return {
            ...mod,
            filePathName: `${folderPath}\\instances\\Vanilla\\mods\\${foundFile}` || "",
            active: (foundFile && foundFile.endsWith('.disabled')) ?  false : true,
            installed: foundFile ? true : false
          };
        });
        setModsConfig(updatedModsConfig)
        
        
        
      } catch (error) {
        console.error('Error fetching file names:', error);
      }
    };

    fetchFileNames();
  }, []);


  useEffect(() => {
    const checkFolderExist = async () => {
      const isGameExist = await checkFileExisting(folderPath + '\\instances\\Vanilla');
      const isDatastore = await checkFileExisting(folderPath + '\\datastore');
      const isJava = await checkFileExisting(folderPath + '\\java');
  
      if (isGameExist && isDatastore && isJava) {
        setActionStatus("play");
      } else {
        setActionStatus("download");
      }
    };
    checkFolderExist(); // Run the function when component mounts
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

