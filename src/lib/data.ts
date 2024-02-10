import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ServerStatusResponse } from "./types";

const { persistAtom } = recoilPersist()
export const folderPathState = atom<string>({
    key: 'folderPath',
    default: '',
    effects_UNSTABLE: [persistAtom],
})


export const vanillaStatusState = atom<ServerStatusResponse>({
    key: 'vanillaStatus',
    default: {
        "online": false,
        "players": {
            "online": 0,
            "max": 0,
        },
    },
})



export const JAVA_URL_17 = "https://tempus.rest/files/java/17.0.1+12.zip"
export const DATASTORE_URL = "https://tempus.rest/files/datastore.zip"
export const VANILLA_URL = "https://tempus.rest/files/Vanilla.zip"
