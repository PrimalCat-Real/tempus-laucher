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

