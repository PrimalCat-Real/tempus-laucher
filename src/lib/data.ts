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
            filePathName: "sodium-fabric-0.5.8+mc1.20.4.jar",
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
            downloadUrl: "https://cdn.modrinth.com/data/qyVF9oeo/versions/th5AIucC/sound-physics-remastered-fabric-1.20.4-1.3.1.jar",
            image: "https://cdn.modrinth.com/data/qyVF9oeo/798fbfae58ec95ad51f3e1d522b43227306c326c.png",
            description: ""
        },
        {
            name: "lambdynamiclights",
            active: false,
            installed: false,
            filePathName: "",
            version: "",
            image: "https://cdn.modrinth.com/data/yBW8D80W/icon.png",
            downloadUrl: "lambdynamiclights-2.3.4+1.20.4.jar",
            description: ""
        },
        {
            name: "sodium-extra",
            active: false,
            installed: false,
            filePathName: "sodium-extra-0.5.4+mc1.20.4-build.116.jar",
            version: "mc1.20.4-0.5.4",
            image: "https://cdn.modrinth.com/data/PtjYWJkn/icon.png",
            downloadUrl: "",
            description: ""
        },
        {
            name: "plasmo-voice",
            active: false,
            installed: false,
            filePathName: "plasmovoice-fabric-1.20.3-2.0.8.jar",
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
        {
            name: "language-reload",
            active: false,
            installed: false,
            filePathName: "language-reload-1.5.10+1.20.3.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/uLbm7CG6/9cae8ec18cac3b1cc6ef1efa239f381d669264e6.png",
            downloadUrl: "https://cdn.modrinth.com/data/uLbm7CG6/versions/SSvudGpI/language-reload-1.5.10%2B1.20.3.jar",
            description: ""
        },
        {
            name: "amecs",
            active: false,
            installed: false,
            filePathName: "amecs-1.3.11+mc.1.20.4.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/rcLriA4v/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/uLbm7CG6/versions/SSvudGpI/language-reload-1.5.10%2B1.20.3.jar",
            description: ""
        },
        {
            name: "modernfix",
            active: false,
            installed: false,
            filePathName: "modernfix-fabric-5.13.0+mc1.20.4.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/nmDcB62a/e1d2433476995be1b1a94ff1afaf6167752274ae.png",
            downloadUrl: "https://cdn.modrinth.com/data/nmDcB62a/versions/T8GvLNSz/modernfix-neoforge-5.13.0%2Bmc1.20.4.jar",
            description: ""
        },
        {
            name: "morechathistory",
            active: false,
            installed: false,
            filePathName: "morechathistory-1.3.0.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/8qkXwOnk/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/8qkXwOnk/versions/PLfxrDkh/morechathistory-1.3.0.jar",
            description: ""
        },
        {
            name: "MouseTweaks",
            active: false,
            installed: false,
            filePathName: "MouseTweaks-fabric-mc1.20-2.25.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/aC3cM3Vq/icon.jpg",
            downloadUrl: "https://cdn.modrinth.com/data/aC3cM3Vq/versions/m0Dd8Cjy/MouseTweaks-fabric-mc1.20-2.25.jar",
            description: ""
        },
        {
            name: "NoChatReports",
            active: false,
            installed: false,
            filePathName: "NoChatReports-FABRIC-1.20.4-v2.5.0.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/qQyHxfxd/icon.png",
            downloadUrl: "NoChatReports-FABRIC-1.20.4-v2.5.0.jar",
            description: ""
        },
        {
            name: "no-telemetry",
            active: false,
            installed: false,
            filePathName: "no-telemetry-1.8.0.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com//data/hg77g4Pw/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/hg77g4Pw/versions/tmHWmt1u/no-telemetry-1.8.0.jar",
            description: ""
        },
        {
            name: "notenoughanimations",
            active: false,
            installed: false,
            filePathName: "notenoughanimations-fabric-1.7.1-mc1.20.4.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/MPCX6s5C/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/MPCX6s5C/versions/ZLjUeuU8/notenoughanimations-fabric-1.7.1-mc1.20.4.jar",
            description: ""
        },
        {
            name: "optigui",
            active: false,
            installed: false,
            filePathName: "optigui-2.1.7.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/JuksLGBQ/2ec739011e612256ebe0c79a4ce064d0e453dd0f.png",
            downloadUrl: "https://cdn.modrinth.com/data/JuksLGBQ/versions/xpfegZsE/optigui-2.1.7.jar",
            description: ""
        },
        {
            name: "Xaeros Minimap",
            active: false,
            installed: false,
            filePathName: "Xaeros_Minimap_23.9.7_Fabric_1.20.4.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/1bokaNcj/80eb00784e250b99fb1789da35869387d14d5637.png",
            downloadUrl: "https://cdn.modrinth.com/data/1bokaNcj/versions/LLE04weG/Xaeros_Minimap_23.9.7_Fabric_1.20.4.jar",
            description: ""
        },
        {
            name: "Xaeros World Map",
            active: false,
            installed: false,
            filePathName: "XaerosWorldMap_1.37.8_Fabric_1.20.4.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/NcUtCpym/80eb00784e250b99fb1789da35869387d14d5637.png",
            downloadUrl: "https://cdn.modrinth.com/data/NcUtCpym/versions/Kh1mGgGA/XaerosWorldMap_1.37.8_Fabric_1.20.4.jar",
            description: ""
        },
        {
            name: "titlefixer",
            active: false,
            installed: false,
            filePathName: "titlefixer-1.0+1.20.4.jar",
            version: "1.6.17+1.20.1",
            image: "https://cdn.modrinth.com/data/8zYE8DiW/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/8zYE8DiW/versions/dDoUIFvR/titlefixer-1.0%2B1.20.4.jar",
            description: ""
        },
        {
            name: "Realms Button Remover",
            active: false,
            installed: false,
            filePathName: "realmsfix-2.0.2.jar",
            version: "2.0.2",
            image: "https://cdn.modrinth.com/data/LqywxrVu/67e0cafc4a1d9455c5fca832256f73e4fa900c7c.png",
            downloadUrl: "https://cdn.modrinth.com/data/LqywxrVu/versions/55cbt32V/realmsfix-2.0.2.jar",
            description: ""
        },
        {
            name: "Realms Button Remover",
            active: false,
            installed: false,
            filePathName: "ImmediatelyFast-Fabric-1.2.10+1.20.4.jar",
            version: "1.2.10+1.20.4",
            image: "https://cdn.modrinth.com/data/5ZwdcRci/8335dd505094a79b4ad306935b10f724e2b76d8b.png",
            downloadUrl: "https://cdn.modrinth.com/data/5ZwdcRci/versions/v2sxhCOI/ImmediatelyFast-Forge-1.2.10%2B1.20.4.jar",
            description: ""
        },
        {
            name: "Emote craft",
            active: false,
            installed: false,
            filePathName: "emotecraft-for-MC1.20.4-2.4.0-a.-fabric.jar",
            version: "4-2.4.0-a.-fabric",
            image: "https://cdn.modrinth.com/data/pZ2wrerK/icon.png",
            downloadUrl: "",
            description: ""
        },
        {
            name: "Emoji Type",
            active: false,
            installed: false,
            filePathName: "emoji-type-2.2.3+1.20.4-fabric.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/q7vRRpxU/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/q7vRRpxU/versions/SDBfBuH9/emoji-type-2.2.3%2B1.20.4-fabric.jar",
            description: ""
        },
        {
            name: "dynamic-fps",
            active: false,
            installed: false,
            filePathName: "dynamic-fps-3.3.3+minecraft-1.20.0.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/LQ3K71Q1/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/LQ3K71Q1/versions/6ZZnpiKt/dynamic-fps-3.3.3%2Bminecraft-1.20.0.jar",
            description: ""
        },
        {
            name: "Dark Loading Screen",
            active: false,
            installed: false,
            filePathName: "dark-loading-screen-1.6.14.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/h3XWIuzM/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/h3XWIuzM/versions/HLjyJHzA/dark-loading-screen-1.6.14.jar",
            description: ""
        },
        {
            name: "CITResewn",
            active: false,
            installed: false,
            filePathName: "citresewn-1.1.4-dicedpixels+1.20.4.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/otVJckYQ/icon.png",
            downloadUrl: "",
            description: ""
        },
        {
            name: "capes",
            active: false,
            installed: false,
            filePathName: "capes-1.5.3+1.20.2-fabric.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/89Wsn8GD/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/89Wsn8GD/versions/dEq1ncBU/capes-1.5.3%2B1.20.2-fabric.jar",
            description: ""
        },
        {
            name: "bobby",
            active: false,
            installed: false,
            filePathName: "bobby-5.1.0+mc1.20.4.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/M08ruV16/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/M08ruV16/versions/jGGumR4a/bobby-5.1.0%2Bmc1.20.4.jar",
            description: ""
        },
        {
            name: "Chat Heads",
            active: false,
            installed: false,
            filePathName: "chat_heads-0.10.31-fabric-1.20.3.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/Wb5oqrBJ/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/Wb5oqrBJ/versions/gqvNiLkw/chat_heads-0.10.31-fabric-1.20.3.jar",
            description: ""
        },
        {
            name: "Better Mount HUD",
            active: false,
            installed: false,
            filePathName: "bettermounthud-1.2.2.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/kqJFAPU9/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/kqJFAPU9/versions/h1QpxElt/bettermounthud-1.2.2.jar",
            description: ""
        },
        {
            name: "Better Mount HUD",
            active: false,
            installed: false,
            filePathName: "BetterAdvancements-Fabric-1.20.4-0.4.0.176.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/Q2OqKxDG/b1519a191e62135647f66394d526d179ab5b598d.png",
            downloadUrl: "https://cdn.modrinth.com/data/Q2OqKxDG/versions/p00hq2Ib/BetterAdvancements-Fabric-1.20.4-0.4.0.176.jar",
            description: ""
        },
        {
            name: "appleskin",
            active: false,
            installed: false,
            filePathName: "appleskin-fabric-mc1.20.3-2.5.1.jar",
            version: "",
            image: "https://cdn.modrinth.com/data/EsAfCjCV/icon.png",
            downloadUrl: "https://cdn.modrinth.com/data/EsAfCjCV/versions/pmFyu3Sz/appleskin-fabric-mc1.20.3-2.5.1.jar",
            description: ""
        },
    ],
    // effects_UNSTABLE: [persistAtom],
})