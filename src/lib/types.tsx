// import Lenis from "@studio-freight/lenis"

export type SideNavItem = {
  path: string
  title: string
  icon: JSX.Element
}

export type User = {
  username: string
  rank: number
  access: string
  weeklyGain?: number
  totalPoints?: number
}


export type ServerData = {
  name: string,
  java: string,
  gameVersion: string,
  buildVersion: string
}

export interface ServerStatusResponse {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  // Add more properties as needed
}

export type downloadStatus = 'unzipping' | 'playing' | 'downloading' | 'error' | false