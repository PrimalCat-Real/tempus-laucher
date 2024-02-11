import { invoke } from "@tauri-apps/api/tauri";
import { downloadFile } from "../utils";

export const startGame = async (selectedFolderPath: string, userName: string, javaMemory: number) => {
    try{
      // new Command('echo', ['Test'])
      // @TODO make this update default files from array in config
      // await downloadFile(selectedFolderPath + '\\instances\\Vanilla', 'https://tempus.rest/files/Vanilla/servers.dat', 'servers.dat', 'serverData')
      console.log("DOWNLOAD DONE");
      
      await invoke('start_command', {globalPath: selectedFolderPath, gameName: "Vanilla", userName, javaMemory}).catch(err => console.error(err));
      
    }catch (error) {
      console.error('Error start game', error);
    }
  }