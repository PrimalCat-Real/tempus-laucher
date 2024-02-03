'use client'

import {createDir, writeBinaryFile} from '@tauri-apps/api/fs';

import { CircularProgress, Progress, Tooltip } from '@nextui-org/react'
import { Download, FolderSearch, PackageOpen } from 'lucide-react'
import React, { SetStateAction, useEffect, useState } from 'react'
import {open, save} from '@tauri-apps/api/dialog'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Input } from '../../input';
import { ResponseType, getClient } from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri';
import { Command } from '@tauri-apps/api/shell'
import { listen, Event  } from '@tauri-apps/api/event';


interface CardActionProps {
  // Define any props if needed
}


const CardAction: React.FC<CardActionProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | string[]>();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUnzipping, setIsUnzipping] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadName, setDownloadName] = useState("")

  useEffect(() => {
    const getLauncherPath = async () => {
      const { appLocalDataDir } = await import('@tauri-apps/api/path');
      const tauriAppDataDirectory = await appLocalDataDir();
      setSelectedFolderPath(tauriAppDataDirectory);
    };
    getLauncherPath();
  }, []);

  useEffect(() => {
    listen('downloadProgress', (event) => {
      setDownloadProgress(parseFloat(event.payload as string));
      // console.log("Testing", parseFloat(event.payload as string));
    });

    listen('unzipProgress', (event) => {
      setDownloadProgress(parseFloat(event.payload as string));
      console.log("Unzip progress:", event.payload);
    });
    
    listen('unzipStart', (event) => {
     setDownloadName(event.payload as string)
     setIsUnzipping(true)
    });

    listen('unzipEnd', (event) => {
     setIsUnzipping(false)
    });
    
    listen('downloadStart', (event) => {
      setDownloadName(event.payload as string)
      console.log("Download started. Name:", event.payload);
      
      // Optionally, you can update your UI with the download name here
    });

    // return () => {
		// 	downloadListener.then((unlisten) => unlisten());
		// };
  }, []);


  const handleOpenDialog = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
        title: 'select game path',
      });

      if (selectedPath) {
        setSelectedFolderPath(String(selectedPath) + '/tempus');
      }
    } catch (error) {
      console.error('Error opening dialog:', error);
    }
  };

  const createFolder = async () => {
    setIsDownloading(true);
    await invoke('create_directory', { dist: selectedFolderPath }).catch(err => console.error(err));
    // setIsDownloading(false);
    await downloadJava()
    await downloadFile();
    
  };

  const downloadFile = async () => {
    try {
      await invoke('main_download_file', {
        url: 'http://158.220.109.29/files/datastore.zip',
        // url: 'https://cdn.discordapp.com/attachments/1093144305616568402/1202240203037872138/minty.zip?ex=65ccbc70&is=65ba4770&hm=7245efd08e764d44dfbc1311c9b87c332c305dfcbecc09449e94671364f79d91&',
        destination: `${selectedFolderPath}/datastore.zip`,
        downloadName: "Загрузка Minecraft"
      });

      await invoke('create_directory', { dist: `${selectedFolderPath}/instances` }).catch(err => console.error(err));
      await invoke('unzip_handler', {
        source: `${selectedFolderPath}/datastore.zip`,
        destination: `${selectedFolderPath}`,
        unzipName: "Разпаковка Minecraft",
      }).catch(err => console.error(err));

      // загрузка сборки
      await invoke('main_download_file', {
        url: 'http://158.220.109.29/files/TempusVanila.zip',
        // url: 'https://cdn.discordapp.com/attachments/1093144305616568402/1202240203037872138/minty.zip?ex=65ccbc70&is=65ba4770&hm=7245efd08e764d44dfbc1311c9b87c332c305dfcbecc09449e94671364f79d91&',
        destination: `${selectedFolderPath}/instances/TempusVanila.zip`,
        downloadName: "Загрузка Vanilla"
      });
      await invoke('unzip_handler', {
        source: `${selectedFolderPath}/instances/TempusVanila.zip`,
        destination: `${selectedFolderPath}/instances`,
        unzipName: "Разпаковка Vanilla",
      }).catch(err => console.error(err));

      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const downloadJava = async () => {
    try {
      const tempusFolderPath = `${selectedFolderPath}/tempus`;
      const javaFolderPath = `${tempusFolderPath}/java`;

      const javaFolderExists = await invoke('directory_exists', { path: javaFolderPath }).catch(err => false);
      if (!javaFolderExists) {
        const isJavaExist = await invoke('create_directory', { dist: `${selectedFolderPath}/java` }).catch(err => console.error(err));
        console.log(isJavaExist);
        await invoke('main_download_file', {
          url: 'http://158.220.109.29/files/17.0.1+12.zip',
          destination: `${selectedFolderPath}/java/17.0.1+12.zip`,
          downloadName: "Загрузка Java"
        });
        await invoke('unzip_handler', {
          source: `${selectedFolderPath}/java/17.0.1+12.zip`,
          destination: `${selectedFolderPath}/java/`,
          unzipName: "Разпаковка Java",
        }).catch(err => console.error(err));
      }
    } catch (error) {
      console.error('Error downloading Java:', error);
    }
  };

  const runGame = async () => {
    try{
      // new Command('echo', ['Test'])
      await invoke('start_command').catch(err => console.error(err));
      
    }catch (error) {
      console.error('Error start game', error);
    }
  }


  

  return (
      <Tooltip
          placement="top"
          content="Скачать"
          color="secondary"
          className='text-primary bg-default-100'
        >
          <button onClick={onOpen} className='bg-default-100 h-14 w-14 rounded-md flex justify-center items-center cursor-pointer z-20'>
              <Download></Download>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                      {(onClose) => (
                          <>
                              <ModalHeader className="flex flex-col gap-1 text-primary">{downloadName}</ModalHeader>
                              <ModalBody className="">
                                {
                                  isUnzipping ? (
                                    <CircularProgress
                                      className="self-center"
                                      classNames={{
                                        svg: 'w-36 h-36 drop-shadow-md',
                                        indicator: 'stroke-white',
                                        track: 'stroke-foreground',
                                        value: 'text-3xl font-semibold text-white',
                                      }}
                                      color="secondary"
                                      label="Unzipping..."
                                    />
                                  ) :
                                  isDownloading ? (
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
                                      <Button onClick={createFolder} color="primary">
                                        Download
                                      </Button>
                                    </div>
                                  )};
                              </ModalBody>
                              <ModalFooter>
                                  <Button color="danger" variant="light" onPress={runGame}>
                                      Close
                                  </Button>
                                  <Button color="primary" onPress={onClose}>
                                      Action
                                  </Button>
                              </ModalFooter>
                          </>
                    )}
                  </ModalContent>
              </Modal>
          </button>
  
      </Tooltip>
    )
      
}

export default CardAction