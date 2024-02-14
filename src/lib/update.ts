import { relaunch } from "@tauri-apps/api/process";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { toast } from "sonner";

export interface Version {
    vanilla: {
        resourcepack_tempus: string;
        mods: string;
    };
}
export async function getServerVersion(url: string): Promise<Version | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch resource pack: ${response.statusText}`);
        }
        const version: Version = await response.json();
        return version;
    } catch (error) {
        console.error("Error fetching resource pack:", error);
        return null;
    }
}

export function findDifferentKeys(obj1: any, obj2: any, parentKey = ''): string[] {
    const differentKeys: string[] = [];

    for (const key in obj1) {
        const fullPath = parentKey ? `${parentKey}.${key}` : key;
        
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            differentKeys.push(...findDifferentKeys(obj1[key], obj2[key], fullPath));
        } else if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            differentKeys.push(fullPath);
        }
    }

    for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            const fullPath = parentKey ? `${parentKey}.${key}` : key;
            differentKeys.push(fullPath);
        }
    }

    return differentKeys;
}


// launcher