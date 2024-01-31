import { Tooltip } from '@nextui-org/react'
import { ScrollText } from 'lucide-react'
import React from 'react'

interface CardDescribeProps {
  // Define any props if needed
}


const CardDescribe: React.FC<CardDescribeProps> = () => {
  return (
      <Tooltip
          placement="top"
          content="Описание"
          color="secondary"
          className='text-primary bg-default-100'
        >
          <div className='bg-default-100 h-14 w-14 rounded-lg flex justify-center items-center'>
              <ScrollText></ScrollText>
          </div>
      </Tooltip>
  )
}

export default CardDescribe