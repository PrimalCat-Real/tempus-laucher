import { Tooltip } from '@nextui-org/react'
import { Wrench } from 'lucide-react'
import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModsTable } from './mods/table';

interface CardSettingsProps {
  link: string;
  name: string;
}

const CardSettings: React.FC<CardSettingsProps> = ({ link, name }) => {
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
    
  );
};

export default CardSettings;