'use client'
import { Tooltip } from '@nextui-org/react'
import { Wrench } from 'lucide-react'
import React, { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModsTable } from './mods/table';


interface CardSettingsProps {
  link: string;
  name: string;
}

const CardSettings: React.FC<CardSettingsProps> = ({ link, name }) => {
  // const [open, setOpen] = useState(false)
  return (
    <Sheet>
      <Tooltip placement="top" content="Модификация" color="secondary" className='text-primary bg-default-100'>
        <SheetTrigger className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center'>
          <Wrench size={28}></Wrench>
        </SheetTrigger>
      </Tooltip>

    <SheetContent  side="bottom" className='w-[100%] h-full max-w-none sm:max-w-none'>
      <ModsTable></ModsTable>
    </SheetContent>
  </Sheet>
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <Tooltip placement="top" content="Модификация" color="secondary" className='text-primary bg-default-100'>
    //     <DialogTrigger className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center'>
    //       <Wrench size={28}></Wrench>
    //     </DialogTrigger>
    //   </Tooltip>
    //   <DialogContent className="sm:max-w-[90%]">
    //     <DialogHeader>
    //       <DialogTitle>Edit profile</DialogTitle>
    //       <DialogDescription>
    //         Make changes to your profile here. Click save when you're done.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <ModsTable></ModsTable>
    //   </DialogContent>
    // </Dialog>
    
  );
};

export default CardSettings;