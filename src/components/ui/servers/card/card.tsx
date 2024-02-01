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



interface CardActionProps {
  // Define any props if needed
}


const CardAction: React.FC<CardActionProps> = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | string[]>();
  const [isDownloading, setIsDownloading] = useState(false)

  // set path to appdata
  useEffect(() => {
    const getLauncherPath = async () => {
      const { appLocalDataDir } = await import('@tauri-apps/api/path');
      const tauriAppDataDirectory = await appLocalDataDir();
      setSelectedFolderPath(tauriAppDataDirectory)
    }
    getLauncherPath()
    
  })
  const getLauncherPath = async () => {
    // try {
    //   const selectedPath = await open({
    //     multiple: false,
    //     directory: true,
    //     title: "select game path"
    //   })

    //   if(selectedPath){
    //     setSelectedFolderPath(selectedPath)
        
    //   }
      
    //   console.log('Dialog opened:', selectedPath);
    // } catch (error) {
    //   console.error('Error opening dialog:', error);
    // }
  };

  async function createFolder() {
    setIsDownloading(true)
    downloadFile("https://github.com/kindawindytoday/Minty-Releases/releases/download/4.4.0.1/minty.zip", "D:\Games")
  }

  async function downloadFile(url:string, dest:string) {
    try {
        const response = await invoke('download_file', { args: { url, dest }});
        console.log(response); // Should log 'Download successful'
    } catch (err) {
        console.error('Error downloading file:', err);
    }
    // await invoke("download_files", {
    //   url: url,
    //   destinations: destFilePath,
    // })
    //   .then(() => {
    //     console.log("Download started");
    //   })
    // const client = await getClient();
    // const data = (
    //   await client.get(url, {
    //     responseType: ResponseType.Binary,
    //   })
    // ).data as any;
    // await fs.writeBinaryFile(
    //   destFilePath, // Change this to where the file should be saved
    //   data
    // );
    // console.log("done");
    
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
                              <ModalBody className=''>
                                  {isDownloading ? (
                                    <CircularProgress
                                      aria-label="Loading..."
                                      value={20}
                                      className='self-center'
                                      classNames={{
                                        svg: "w-36 h-36 drop-shadow-md",
                                        indicator: "stroke-white",
                                        track: "stroke-foreground",
                                        value: "text-3xl font-semibold text-white",
                                      }}
                                      color="secondary"
                                      showValueLabel={true}
                                    />
                                  ) : (
                                    <div className='w-full h-full flex justify-center flex-col gap-4'>
                                      <Button startContent={<PackageOpen />} endContent={<FolderSearch className='ml-auto'/>} onClick={getLauncherPath} color="secondary" className='bg-foreground flex justify-start  '>
                                      <span className='overflow-hidden dir-rtl'>{selectedFolderPath}</span> 
                                    </Button>
                                    <Button onClick={createFolder} color="primary">
                                        Donwload
                                    </Button>
                                    </div>
                                    
                                  )}
                              </ModalBody>
                              <ModalFooter>
                                  <Button color="danger" variant="light" onPress={onClose}>
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