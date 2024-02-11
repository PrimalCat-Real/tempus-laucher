import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ServerStatusResponse, downloadStatus } from "./types";


type Status = 'download' | 'update' | 'play';

const { persistAtom } = recoilPersist()
export const folderPathState = atom<string>({
    key: 'downloadProgress',
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const actionStatusState = atom<Status>({
    key: 'actionStatus',
    default: 'download',
    effects_UNSTABLE: [persistAtom],
})

export const javaMemoryState = atom<number>({
    key: 'javaMemory',
    default: 2048,
    effects_UNSTABLE: [persistAtom],
})

export const javaArgState = atom<string>({
    key: 'javaArg',
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

export interface Mod {
    name: string;
    version: string;
    active: boolean;
    installed: boolean;
    image: string;
    filePathName: string,
    description: string;
}

interface ModsConfig {
    mods: Mod[]
}


export const JAVA_URL_17 = "https://tempus.rest/files/java/17.0.1+12.zip"
export const DATASTORE_URL = "https://tempus.rest/files/datastore.zip"
export const VANILLA_URL = "https://tempus.rest/files/Vanilla.zip"


export const modrithUrl = "https://modrinth.com/mod/sodium"


export const modsConfigState = atom<Mod[]>({
    key: 'modsConfig',
    default: [
        {
            name: "sodium",
            active: false,
            installed: false,
            filePathName: "",
            version: "mc1.20.4-0.5.8",
            image: "https://cdn.modrinth.com/data/AANobbMI/icon.png",
            description: ""
        },
        {
            name: "sound-physics-remastered",
            active: false,
            installed: false,
            filePathName: "",
            version: "fabric-1.20.4-1.3.1",
            image: "",
            description: ""
        },
        {
            name: "lambdynamiclights",
            active: false,
            installed: false,
            filePathName: "",
            version: "2.3.4+1.20.4",
            image: "https://cdn.modrinth.com/data/yBW8D80W/icon.png",
            description: ""
        },
        {
            name: "sodium-extra",
            active: false,
            installed: false,
            filePathName: "",
            version: "mc1.20.4-0.5.4",
            image: "https://cdn.modrinth.com/data/PtjYWJkn/icon.png",
            description: ""
        },
    ],
    effects_UNSTABLE: [persistAtom],
})