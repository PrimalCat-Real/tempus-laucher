'use client'
import React from 'react'
import {Tabs, Tab, Card, CardBody, Button} from "@nextui-org/react";
import { FolderSearch, PackageOpen } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { folderPathState } from '@/lib/data';
import { open } from '@tauri-apps/api/dialog';
import JavaSettings from './card/java-settings';
import { ScrollArea } from '../ui/scroll-area';
const GameTab = () => {
  const [folderPath, setFolderPath] = useRecoilState(folderPathState)
  
  const openDialogSelectPath = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
        title: 'Выберите путь установки',
      });

      if (selectedPath) {
        // console.log("Set folder path");
        setFolderPath(String(selectedPath) + '\\tempus')
      }
    } catch (error) {
      console.error('Error opening dialog:', error);
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" className='w-full' 
         disabledKeys={["test"]}
        classNames={{
          tabList: 'w-full',
        }}>
        <Tab key="photos" title="Vanilla" className='flex '>
        <ScrollArea className="w-full h-[400px] pr-3.5">
          <div className="flex w-full flex-col gap-4">
            <div className='settings-card space-y-2'>
              <h2 className='text-2xl text-primary'>Директория приложения</h2>
              <p className='text-secondary-foreground'>Путь, в которой лаунчер сохраняет все свои файлы</p>
            <Button
              startContent={<PackageOpen />}
              endContent={<FolderSearch className="ml-auto" />}
              onClick={openDialogSelectPath}
              color="secondary"
              className="bg-foreground flex justify-start w-full"
            >
              <span className="overflow-hidden dir-rtl">{folderPath}</span>
            </Button>
            </div>
            <JavaSettings></JavaSettings>
          </div>
        </ScrollArea>
          
          {/* <Card className='rounded-md'>
            <CardBody className='h-fit'>

            </CardBody>
          </Card>  
          <Card className='rounded-md'>
            <CardBody className='h-fit'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>   */}
        </Tab>
        <Tab key="test" title="Test">
          <Card className='rounded-sm'>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="test" title="Test2">
          <Card className='rounded-sm'>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  )
}

export default GameTab