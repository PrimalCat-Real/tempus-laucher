import { invoke } from "@tauri-apps/api/tauri";
import { downloadAndUnzip, downloadFile } from "../utils";
import { DATASTORE_URL, JAVA_URL_17, VANILLA_URL } from "../data";
import { recoilPersist } from "recoil-persist";
import { atom, useRecoilState } from "recoil";
import { downloadStatus } from "../types";


export const handleDownloadProcess = async (selectedFolderPath: string) => {
    
    //   await downloadFile(selectedFolderPath + '\\instances\\Vanilla', 'https://tempus.rest/files/Vanilla/versions.json', 'versions.json', 'Версии');
    //   await downloadFile(selectedFolderPath + '\\instances\\Vanilla\\resourcepacks', 'https://tempus.rest/files/Vanilla/resourcepacks/Faithful_64x.zip', 'Faithful_64x.zip', 'Faithful');
    //   await downloadFile(selectedFolderPath + '\\instances\\Vanilla\\resourcepacks', 'https://tempus.rest/files/Vanilla/resourcepacks/Tempus_pack_.zip', 'Tempus_pack_.zip', 'Tempus_pack');
    //   await downloadFile(selectedFolderPath + '\\instances\\Vanilla\\resourcepacks', 'https://tempus.rest/files/Vanilla/resourcepacks/ksepsp-9-0-3.zip', 'ksepsp-9-0-3.zip', 'ksepsp');

      await invoke('create_directory', { dist: selectedFolderPath }).catch(err => console.error(err));
      await invoke('create_directory', { dist: selectedFolderPath+'/java' }).catch(err => console.error(err));
      await invoke('create_directory', { dist: selectedFolderPath+'/instances' }).catch(err => console.error(err));
      // alert(JAVA_URL_17)
      // alert(DATASTORE_URL)
      // alert(VANILLA_URL)
      // загрузка джава и распаковка
      await downloadAndUnzip(selectedFolderPath+'/java', JAVA_URL_17, '17.0.1+12.zip', 'Java')
      await downloadAndUnzip(selectedFolderPath + '', DATASTORE_URL, 'datastore', 'Minecraft')
      await downloadAndUnzip(selectedFolderPath+'/instances', VANILLA_URL, 'Vanilla.zip', 'Vanilla')
      

};

export const handleUpdateProcess = async (selectedFolderPath: string) => {
    // await downloadAndUnzip(selectedFolderPath+'/java', JAVA_URL_17, '17.0.1+12.zip', 'Java')
    // await downloadAndUnzip(selectedFolderPath + '', DATASTORE_URL, 'datastore', 'Minecraft')
    // await downloadAndUnzip(selectedFolderPath+'/instances', VANILLA_URL, 'Vanilla.zip', 'Vanilla')
}