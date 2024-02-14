'use client'

import { useEffect, useRef, useState } from 'react';
import { redirect } from 'next/navigation';
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { toast } from 'sonner';
import { relaunch } from '@tauri-apps/api/process';
import { redirectServersPage } from '@/auth/redirect';
import writeConfig, { config, readConfig, updateConfigValue } from '@/config/launcher';
import { readTextFile } from '@tauri-apps/api/fs';
import { atom, useRecoilState } from 'recoil';
import { useSSR } from '@/store/store';
import { recoilPersist } from 'recoil-persist'
import { usernameState } from '@/lib/user';
import { Mod, actionStatusState, folderPathState, modsConfigState } from '@/lib/data';
import { invoke } from '@tauri-apps/api/tauri';
import { checkFileExisting } from '@/lib/utils';
import { Version, findDifferentKeys, getServerVersion } from '@/lib/update';

const { persistAtom } = recoilPersist()


export default function Home() {
  const [userName, setUserName] = useRecoilState(usernameState)
  
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
              label: 'Обновить',
              onClick: () => {
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
  


  useEffect(() => {
    const fetchData = async () => {

      try {
        let localObj: Version | null = null;
        // alert(`${selectedFolderPath}\\instances\\Vanilla\\versions.json`)

        const localObjString: string | null = await invoke('read_json_file', { path: `${folderPath}\\instances\\Vanilla\\versions.json` });

        if (localObjString !== null) {
            localObj = JSON.parse(localObjString);
        }

        // console.log('Local Object:', localObj);

        const versionUrl = `https://tempus.rest:8000/versions/vanilla/versions.json`;
        const remoteObj = await getServerVersion(versionUrl);
        const isEqualPacks = JSON.stringify(localObj?.vanilla.resourcepack_tempus) === JSON.stringify(remoteObj?.vanilla.resourcepack_tempus);
        const isEqualMods = JSON.stringify(localObj?.vanilla.mods) === JSON.stringify(remoteObj?.vanilla.mods);
        // const diffLog = findDifferentKeys(remoteObj, localObj)
        
        
        // console.log('Remote Object:', remoteObj);
        // console.log('diffLog', diffLog);

        console.log("isEqualMods", isEqualMods);
        
        if (!isEqualPacks || !isEqualMods) {
          setActionStatus("update");
          const diffLog = findDifferentKeys(remoteObj, localObj)
          console.log(diffLog); 
        }
        
      } catch (err) {
        console.error('Error comparing versions:', err);
      }
    };


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
    checkFolderExist().then(fetchData); // Run the function when component mounts
  }, []); 

  useEffect(() => {
    
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

