'use client'

import {basename} from '@tauri-apps/api/path';
import {createDir} from '@tauri-apps/api/fs';

import { Tooltip } from '@nextui-org/react'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import {open} from '@tauri-apps/api/dialog'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface CardActionProps {
  // Define any props if needed
}


const CardAction: React.FC<CardActionProps> = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedFolderPath, setSelectedFolderPath] = useState<string>('');
  const getLauncherPath = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
        title: "select game path"
      })

      if(selectedPath && selectedPath.length > 0){
        setSelectedFolderPath(selectedPath[0])
      }

      console.log('Dialog opened:', selectedPath);
    } catch (error) {
      console.error('Error opening dialog:', error);
    }
  };

  async function createFolder() {
    // try {
    //   if (selectedFolderPath) {
    //     const newFolderName = 'tempus-vanila';
    //     const fullPath = basename(selectedFolderPath) + '/' + newFolderName;
    //     await createDir(fullPath);
    //     console.log('Folder created successfully!');
    //   } else {
    //     console.error('Selected folder path is empty or undefined.');
    //   }
    // } catch (error) {
    //   console.error('Error creating folder:', error);
    // }
  }


  // const downloadAndCreateFolder = async () => {
  //   try {
  //     const savePath = await save({
  //       defaultPath: 'downloaded-file.txt',
  //       filters: [{ name: 'Text Files', extensions: ['txt'] }],
  //       title: 'Select download location',
  //     });

  //     // Perform download and folder creation logic here

  //     console.log('Selected download location:', savePath);
  //   } catch (error) {
  //     console.error('Error opening dialog:', error);
  //   }
  // };

  return (
      <Tooltip
          placement="top"
          content="Скачать"
          color="secondary"
          className='text-primary bg-default-100'
        >
          <button onClick={onOpen} className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center cursor-pointer z-20'>
              <Download></Download>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                      {(onClose) => (
                          <>
                              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                              <ModalBody>
                                  <Button onClick={getLauncherPath} color="primary">
                                      Button
                                  </Button>
                                  <Button onClick={createFolder} color="primary">
                                      Donwload
                                  </Button>
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