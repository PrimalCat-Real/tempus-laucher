'use client'
import { Tooltip } from '@nextui-org/react'
import { Wrench } from 'lucide-react'
import React from 'react'

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
import { ModsTable } from './mods/table';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface CardSettingsProps {
  link: string;
  name: string;
}

const CardSettings: React.FC<CardSettingsProps> = ({ link, name }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Tooltip placement="top" content="Модификация" color="secondary" className='text-primary bg-default-100'>
        <div className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center cursor-pointer'>
          <Wrench size={28}></Wrench>
        </div>
      </Tooltip>
      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
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
      </Modal> */}
    </>
  //   <Sheet>
      // <Tooltip placement="top" content="Модификация" color="secondary" className='text-primary bg-default-100'>
      //   <SheetTrigger className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center'>
      //     <Wrench size={28}></Wrench>
      //   </SheetTrigger>
      // </Tooltip>

  //   <SheetContent  side="bottom" className='w-[100%] h-full max-w-none sm:max-w-none'>
  //     <ModsTable></ModsTable>
  //   </SheetContent>
  // </Sheet>
    
  );
};

export default CardSettings;