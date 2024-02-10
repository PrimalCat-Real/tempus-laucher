import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const usernameState = atom({
  key: 'username',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

