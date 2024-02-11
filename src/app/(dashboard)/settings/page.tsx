import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import GameTab from '@/components/settings/game-tabs'
const page = () => {
  return (
    <GameTab></GameTab>
    // <Tabs defaultValue="account" className="w-[400px]">
    //   <TabsList className="grid w-full grid-cols-2">
    //     <TabsTrigger value="account">Account</TabsTrigger>
    //     <TabsTrigger value="password">Password</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="account">
        
    //   </TabsContent>
    //   <TabsContent value="password">
        
    //   </TabsContent>
    // </Tabs>
  )
}

export default page