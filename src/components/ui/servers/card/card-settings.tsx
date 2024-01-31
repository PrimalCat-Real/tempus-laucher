import { Tooltip } from '@nextui-org/react'
import { Wrench } from 'lucide-react'
import React from 'react'

interface CardSettingsProps {
  link: string;
  name: string;
}

const CardSettings: React.FC<CardSettingsProps> = ({ link, name }) => {
  return (
    <Tooltip placement="top" content="Модификация" color="secondary" className='text-primary bg-default-100'>
      <div className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center'>
        <Wrench size={28}></Wrench>
      </div>
    </Tooltip>
  );
};

export default CardSettings;