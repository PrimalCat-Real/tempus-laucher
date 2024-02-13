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
    downloadUrl: string;
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
            downloadUrl: "",
            description: ""
        },
        {
            name: "sound-physics-remastered",
            active: false,
            installed: false,
            filePathName: "",
            version: "fabric-1.20.4-1.3.1",
            downloadUrl: "",
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
            downloadUrl: "",
            description: ""
        },
        {
            name: "sodium-extra",
            active: false,
            installed: false,
            filePathName: "",
            version: "mc1.20.4-0.5.4",
            image: "https://cdn.modrinth.com/data/PtjYWJkn/icon.png",
            downloadUrl: "",
            description: ""
        },
        {
            name: "plasmo-voice",
            active: false,
            installed: false,
            filePathName: "",
            version: "fabric-1.20.3-2.0.8",
            image: "https://cdn.modrinth.com/data/1bZhdhsH/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/1bZhdhsH/versions/fykZJcya/plasmovoice-fabric-1.20.3-2.0.8.jar",
            description: ""
        },
        {
            name: "iris",
            active: false,
            installed: false,
            filePathName: "iris-mc1.20.4-1.6.17.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/YL57xq9U/dc558eece920db435f9823ce86de0c4cde89800b.png",
            downloadUrl: "https://cdn.modrinth.com/data/YL57xq9U/versions/JHbrO6Zq/iris-mc1.20.1-1.6.17.jar",
            description: ""
        },
        {
            name: "Inter dimensional map",
            active: false,
            installed: false,
            filePathName: "interdimensional-map-markers-1.0.2.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/oiCuHwqj/6ee30320030e394bd8b7c0d2efe86bd2219323e8.png",
            downloadUrl: "https://cdn.modrinth.com/data/oiCuHwqj/versions/48LiUaxB/interdimensional-map-markers-1.0.2.jar",
            description: ""
        },
        {
            name: "LinsAPI",
            active: false,
            installed: false,
            filePathName: "LinsAPI-1.4.6.jar",
            version: "1.6.17+1.20.1",
            image: "",
            downloadUrl: "https://cdn.modrinth.com/data/oiCuHwqj/versions/48LiUaxB/interdimensional-map-markers-1.0.2.jar",
            description: ""
        },
        {
            name: "memoryleakfix",
            active: false,
            installed: false,
            filePathName: "memoryleakfix-fabric-1.17+-1.1.5.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/NRjRiSSD/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/NRjRiSSD/versions/3w0IxNtk/memoryleakfix-forge-1.17%2B-1.1.5.jar",
            description: ""
        },
    ],
    // effects_UNSTABLE: [persistAtom],
})