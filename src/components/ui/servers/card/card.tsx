'use client'

import {createDir, writeBinaryFile} from '@tauri-apps/api/fs';

import { CircularProgress, Progress, Tooltip } from '@nextui-org/react'
import { Download, FolderSearch, PackageOpen, RefreshCcw } from 'lucide-react'
import React, { SetStateAction, useEffect, useState } from 'react'
import {open, save} from '@tauri-apps/api/dialog'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Input } from '../../input';
import { ResponseType, getClient } from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri';
import { Command } from '@tauri-apps/api/shell'
import { listen, Event  } from '@tauri-apps/api/event';
import Play from '@/components/icons/play';
import { checkFileExisting, downloadAndUnzip, downloadFile } from '@/lib/utils';
import { ResourcePack, findDifferentKeys, getResourcePack } from '@/lib/update';


interface CardActionProps {
  // Define any props if needed
}

type Status = 'download' | 'update' | 'play';
type indicatorStatus = 'unziping' | 'playing' | 'downloading' | 'error' | false

const gameDat = {
  name: "Vanilla",
}

const CardAction: React.FC<CardActionProps> = () => {
  
  const [userName, setUserName] = useState('');

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [status, setStatus] = useState<Status>('download');

  const [downloadStatus, setDownloadStatus] = useState<indicatorStatus>(false)


  
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadName, setDownloadName] = useState("");



  const [selectedFolderPath, setSelectedFolderPath] = useState<string | string[]>();

  const gameApiUrl =  process.env.GAME_API_BASE_URL
  const JAVA_URL_17 = `https://tempus.rest/files/java/17.0.1+12.zip`;

  const VANILLA_URL = `https://tempus.rest/files/Vanilla.zip`;
  const DATASTORE_URL = `https://tempus.rest/files/datastore.zip`;

  const VANILLA_PATH = `${selectedFolderPath}/instances/Vanilla`

  // minecraft paths
  const DATASTORE_PATH = `${selectedFolderPath}/datastore`

  const JAVA_17 = `${selectedFolderPath}/java/17.0.1+12`


  useEffect(() => {
    const getLauncherPath = async () => {
    const storedPath = localStorage.getItem('gameFolderPath');
    if (storedPath) {
      setSelectedFolderPath(storedPath)
    } else {
      // Assuming appLocalDataDir() returns a Promise, await it
      const { appLocalDataDir } = await import('@tauri-apps/api/path');
      const tauriAppDataDirectory = await appLocalDataDir();
      setSelectedFolderPath(tauriAppDataDirectory)
    }
      
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
        
    

    // console.log(isJava, selectedFolderPath+'/java');
    // console.log(isDatastore, selectedFolderPath+'/datastore');
    // console.log(isGameExist, selectedFolderPath+'/instances/Vanilla');
    

    
    
  
    };
    getLauncherPath();
  }, []);

  useEffect(() => {
    // check updates
    const fetchData = async () => {

      try {
        let localObj: ResourcePack | null = null;

        const localObjString: string | null = await invoke('read_json_file', { path: `${selectedFolderPath}\\instances\\Vanilla\\versions.json` });

        if (localObjString !== null) {
            localObj = JSON.parse(localObjString);
        }

        console.log('Local Object:', localObj);

        const resourcePackUrl = `https://tempus.rest:8000/versions/vanilla/versions.json`;
        const remoteObj = await getResourcePack(resourcePackUrl);
        const isEqual = JSON.stringify(localObj?.vanilla.resourcepack_tempus) === JSON.stringify(remoteObj?.vanilla.resourcepack_tempus);

        console.log('Remote Object:', remoteObj);


        if (!isEqual) {
          setStatus("update");
          const diffLog = findDifferentKeys(remoteObj, localObj)
          console.log(diffLog);
          
        }
        
      } catch (err) {
        console.error('Error comparing versions:', err);
      }
    };
  
    const checkFolderExist = async () => {
      const isGameExist = await checkFileExisting(selectedFolderPath + '\\instances\\Vanilla');
      const isDatastore = await checkFileExisting(selectedFolderPath + '\\datastore');
      const isJava = await checkFileExisting(selectedFolderPath + '\\java');
  
      if (isGameExist && isDatastore && isJava) {
        setStatus("play");
      } else {
        setStatus("download");
      }
    };
  
    checkFolderExist().then(fetchData);
  }, [selectedFolderPath]);
  
  useEffect(() => {
    
    listen('downloadStart', (event) => {
      setDownloadStatus("downloading")
      setDownloadName(event.payload as string)
      // console.log("Testing", parseFloat(event.payload as string));
    });
    listen('downloadProgress', (event) => {
      setDownloadProgress(parseFloat(event.payload as string));
      // console.log("Testing", parseFloat(event.payload as string));
    });

    listen('unzipStart', (event) => {
      setDownloadStatus("unziping")
      setDownloadName(event.payload as string);
    });

    listen('startGame', (event) => {
      setDownloadStatus("playing")
    });
    listen('endGame', (event) => {
      setDownloadStatus(false)
    });

    // listen('unzipProgress', (event) => {
    //   setDownloadProgress(parseFloat(event.payload as string));
    //   console.log("Unzip progress:", event.payload);
    // });
    
  }, []);

  // check updates modpack
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // @TODO move to variable
  //     const resourcePackUrl = `https://tempus.rest:8000/versions/vanilla/versions.json`; 
  //     await getResourcePack(resourcePackUrl).then((data) => {
  //         if (data) {
  //             console.log(data);
  //         }
  //     });
  //     try {
  //       console.log(selectedFolderPath+'\\instances\\Vanilla\\versions.json'); 
  //       const result = await invoke('read_json_file', { path: selectedFolderPath+'\\instances\\Vanilla\\versions.json' });
  //       console.log('File contents:', result);
  //     } catch (err) {
  //       console.error('Error reading file:', err);
  //     }
  //   };

  //   fetchData();
  // }, []); 




  const handleOpenDialog = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
        title: 'select game path',
      });

      if (selectedPath) {
        console.log("Set folder path");
        
        setSelectedFolderPath(String(selectedPath) + '\\tempus');
        localStorage.setItem('gameFolderPath', String(selectedPath) + '\\tempus');
      }
    } catch (error) {
      console.error('Error opening dialog:', error);
    }
  };

  const handleProcces = async () => {
    if(status === 'update'){
      await downloadFile(selectedFolderPath + '\\instances\\Vanilla', 'https://tempus.rest/files/Vanilla/versions.json', 'versions.json', 'Версии');
      await downloadFile(selectedFolderPath + '\\instances\\Vanilla\\resourcepacks', 'https://tempus.rest/files/Vanilla/resourcepacks/', '	Faithful_64x.zip', 'Faithful');
      await downloadFile(selectedFolderPath + '\\instances\\Vanilla\\resourcepacks', 'https://tempus.rest/files/Vanilla/resourcepacks/', 'Tempus_pack_.zip', 'Tempus_pack');
      await downloadFile(selectedFolderPath + '\\instances\\Vanilla\\resourcepacks', 'https://tempus.rest/files/Vanilla/resourcepacks/', 'ksepsp-9-0-3.zip', 'ksepsp');

    }else{
      await invoke('create_directory', { dist: selectedFolderPath }).catch(err => console.error(err));
      await invoke('create_directory', { dist: selectedFolderPath+'/java' }).catch(err => console.error(err));
      await invoke('create_directory', { dist: selectedFolderPath+'/instances' }).catch(err => console.error(err));
      // alert(JAVA_URL_17)
      // alert(DATASTORE_URL)
      // alert(VANILLA_URL)
      // загрузка джава и распаковка
      await downloadAndUnzip(selectedFolderPath+'/java', JAVA_URL_17, '17.0.1+12.zip', 'Java')
      await downloadAndUnzip(selectedFolderPath + '', DATASTORE_URL, 'datastore', 'Minecraft')
      await downloadAndUnzip(selectedFolderPath+'/instances', VANILLA_URL, 'Vanilla.zip', 'Vanilla')
      
    }
    
    // close dialog
    onClose()
    setStatus("play")
    // setIsDownloading(true);
    // java
    
    // await handleOpenDialog()
    
    //
    // 
    
    // setIsDownloading(false);
    // await downloadJava()
    // await downloadFile();
    // onClose()
  };



  const handleAction = async () => {
    if(status === "download"){
      console.log(selectedFolderPath);
      // open download dialog
      onOpen()
    }else if(status === "play"){
      await handlePlay()
    }else if(status === "update"){
      await updateGame()
    }
    
  }

  const updateGame = async () => {
    try{
      // new Command('echo', ['Test'])
      // change update link 
      onOpen()
      
  
    }catch (error) {
      console.error('Error update game', error);
    }
  }


  const handlePlay = async () => {
    try{
      // new Command('echo', ['Test'])
      await invoke('start_command', {globalPath: selectedFolderPath, gameName: "Vanilla", userName: userName}).catch(err => console.error(err));
      
    }catch (error) {
      console.error('Error start game', error);
    }
  }


  

  return (
    <div>
      { downloadStatus === "playing" && <div className="absolute w-full bg-background/5 rounded-md backdrop-blur-sm h-full top-0 left-0 z-40 flex justify-center items-center">
        <CircularProgress
          aria-label="Loading..."
          className="self-center"
          classNames={{
            svg: 'w-24 h-24 drop-shadow-md',
            indicator: 'stroke-white',
            track: 'stroke-foreground',
            value: 'text-xl font-semibold text-white',
          }}
          color="secondary"
          showValueLabel={true}
        />
      </div>}
      <Tooltip
          placement="top"
          content={status === "play" ? "Играть" : (status === "update" ? "Обновить" :"Скачать") }
          color="secondary"
          className='text-primary bg-default-100'
        >
          <button onClick={handleAction} className='bg-default-100 h-14 w-14 rounded-md flex justify-center items-center cursor-pointer z-20'>
            
              {status === "play" ? (
                  <Play></Play>
              ) : status === "update" ? (
                  <RefreshCcw ></RefreshCcw >
              ) : (
                <Download></Download>
              )}
              
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                      {(onClose) => (
                          <>
                              <ModalHeader className="flex flex-col gap-1 text-primary">{downloadName}</ModalHeader>
                              <ModalBody className="">
                                {
                                  downloadStatus === "unziping" ? (
                                    <CircularProgress
                                      className="self-center"
                                      classNames={{
                                        svg: 'w-36 h-36 drop-shadow-md',
                                        indicator: 'stroke-white',
                                        track: 'stroke-foreground',
                                        value: 'text-3xl font-semibold text-white',
                                      }}
                                      color="secondary"
                                    />
                                  ) :
                                  downloadStatus === "downloading"  ? (
                                    <CircularProgress
                                      aria-label="Loading..."
                                      value={downloadProgress}
                                      className="self-center"
                                      classNames={{
                                        svg: 'w-36 h-36 drop-shadow-md',
                                        indicator: 'stroke-white',
                                        track: 'stroke-foreground',
                                        value: 'text-3xl font-semibold text-white',
                                      }}
                                      color="secondary"
                                      showValueLabel={true}
                                    />
                                  ) : downloadStatus === "error"  ? (
                                    <CircularProgress
                                      aria-label="Error"
                                      value={downloadProgress}
                                      className="self-center"
                                      classNames={{
                                        svg: 'w-36 h-36 drop-shadow-md',
                                        indicator: 'stroke-red-300',
                                        track: 'stroke-red-500',
                                        value: 'text-3xl font-semibold text-white',
                                      }}
                                      color="secondary"
                                      showValueLabel={true}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex justify-center flex-col gap-4">
                                      <Button
                                        startContent={<PackageOpen />}
                                        endContent={<FolderSearch className="ml-auto" />}
                                        onClick={handleOpenDialog}
                                        color="secondary"
                                        className="bg-foreground flex justify-start"
                                      >
                                        <span className="overflow-hidden dir-rtl">{selectedFolderPath}</span>
                                      </Button>
                                      <Button onClick={handleProcces} color="primary" className='text-background'>
                                        Скачать
                                      </Button>
                                    </div>
                                  )};
                              </ModalBody>
                          </>
                    )}
                  </ModalContent>
              </Modal>
          </button>
      </Tooltip>
    </div>
    )
      
}

export default CardAction