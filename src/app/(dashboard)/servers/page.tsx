import NewsBanner from '@/components/ui/banner/banner'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CardAction from '@/components/ui/servers/card/card'
import CardDescribe from '@/components/ui/servers/card/card-describe'
import CardSettings from '@/components/ui/servers/card/card-settings'
import ServerStatus from '@/components/ui/servers/server-status/server-status'
import {Image} from "@nextui-org/react";
import React from 'react'

const ServersPage = () => {
    

  return (

      <div className='flex flex-col text-primary w-full gap-4'>
          <NewsBanner></NewsBanner>
          <Carousel
              opts={{
              align: "start",
            }}
              className="w-full h-full"
              >
              <CarouselContent className='-ml-4 h-full'>
                  {Array.from({ length: 3 }).map((_, index) => (
                      <CarouselItem key={index} className="basis-1/3 pl-4 h-full">
                          <div className="p-1 bg-background-foreground relative h-full flex flex-col rounded-md items-center justify-between py-4">
                              <Image className='!opacity-60' isZoomed alt="NextUI Fruit Image with Zoom"
                                  src="https://i.redd.it/fibyxrlu5mu71.png"
                            ></Image>
                              <ServerStatus></ServerStatus>
                              <div className="spacer"></div>
                              <div className="name z-20 text-center"
                                  style={{ pointerEvents: 'none' }}
                              >
                                  <p className='custom-title-color text-4xl'>Vanila</p>
                                  <p className='uppercase font-bold text-[12px] leading-3 version-text-overlay'>version 1.20.4</p>
                              </div>
                              <div className='flex justify-between gap-4 z-20'>
                                  <CardSettings link="settings" name="settings" />
                                  <CardDescribe>
                                    <CardAction>
                                </CardAction>
                                  </CardDescribe>
                                   
       
                                  
                              </div>
                          </div>
                      </CarouselItem>
                  ))}
              </CarouselContent>
          </Carousel>

      </div>
  )
}

export default ServersPage