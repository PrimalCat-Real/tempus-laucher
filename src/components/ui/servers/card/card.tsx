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
  const [downloadProgress, setDownloadProgress] = useState(0);

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
      console.log("Testing", parseFloat(event.payload as string));
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
    await downloadFile();
    await downloadJava()
  };

  const downloadFile = async () => {
    try {
      await invoke('main_download_file', {
        url: 'https://github.com/kindawindytoday/Minty-Releases/releases/download/4.4.0.1/minty.zip',
        destination: `${selectedFolderPath}/tempus.zip`,
      });

      await invoke('create_directory', { dist: `${selectedFolderPath}/vanila` }).catch(err => console.error(err));
      await invoke('unzip_file', {
        source: `${selectedFolderPath}/tempus.zip`,
        destination: `${selectedFolderPath}/vanila`,
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
        });
        await invoke('unzip_file', {
          source: `${selectedFolderPath}/java/17.0.1+12.zip`,
          destination: `${selectedFolderPath}/java/`,
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
                              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                              <ModalBody className="">
                                {isDownloading ? (
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
                                )}
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