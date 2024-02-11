'use client'
import { javaMemoryState } from '@/lib/data'
import { Input } from '@nextui-org/input'
import { Divider, Slider } from '@nextui-org/react'
import { invoke } from '@tauri-apps/api/tauri'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

const JavaSettings = () => {
    const [javaMemory, setJavaMemory] = useRecoilState(javaMemoryState)
    const [maxMemory, setMaxMemory] = useState(0);
    const [minMemory, setMinMemory] = useState(0);
    const [curVal, setCurVal] = useState(2000);
    
    invoke('get_pc_ram').then(result => {
        const ram = parseInt(result as string); // Logging the result
        setMaxMemory(ram)
    }).catch(error => {
        console.error('Error:', error); // Logging any errors
    });
  return (
    <div className='settings-card space-y-2'>
        <h2 className='text-2xl text-primary'>Java memory</h2>
        <p className='text-secondary-foreground'>The memory allocated to each instance when it is ran.</p>
        <div className='wrapper flex items-center w-full gap-4'>
            <Slider 
            // label="Temperature" 
            marks={[
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: maxMemory,
                  label: String(maxMemory),
                },
              ]}
            step={8} 
            maxValue={maxMemory} 
            minValue={minMemory} 
            defaultValue={javaMemory}
            value={javaMemory}
            onChange={(value) => setJavaMemory(parseFloat(String(value)))}
            className="w-full mb-6 text-primary"
            />
            <Input type="text"
                isReadOnly
                size='sm'
                classNames={{
                    inputWrapper: 'max-h-[40px]'
                }}
                onValueChange={(value) => {
                    // Преобразуем введенное значение в число
                    const newValue = parseFloat(value);
                    // Проверяем, не превышает ли значение 16000
                    if (newValue <= maxMemory) {
                        // Устанавливаем новое значение состояния только если оно валидно
                        setJavaMemory(newValue);
                    }
                }} 
             value={String(javaMemory)} className='max-w-[120px]  mb-6' />
        </div>
        
        <Divider></Divider>
        <h2 className='text-2xl text-primary'>Java arguments</h2>
        <Input type="email" label="Email" />
        <h2 className='text-2xl text-primary'>Environmental variables</h2>
        <Input type="email" label="Email" />
        
    </div>
  )
}

export default JavaSettings