import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { invoke } from '@tauri-apps/api/tauri';
import { useRecoilState } from "recoil";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeLanguagePrefix = (pathname: string) => {
    const path = pathname
    const parts = path.split('/'); // Split the path into parts
    return `/${parts.slice(2).join('/')}`; // Join the parts, excluding the language prefix
};

export async function downloadAndUnzip(downloadPath: string, downloadUrl: string, fileName: string, downloadName: String){
  
    try {
      console.log("url", downloadUrl);
      await invoke('main_download_file', {
        url: downloadUrl,
        destination: `${downloadPath}/${fileName}.zip`,
        downloadName: `Загрузка ${downloadName}`
      }).catch((err: any) => console.error(err));

      // await invoke('create_directory', { dist: `${selectedFolderPath}/instances` }).catch(err => console.error(err));
      
      await invoke('unzip_handler', {
        source: `${downloadPath}/${fileName}.zip`,
        destination: `${downloadPath}`,
        unzipName: `Распаковка ${downloadName}`,
      }).catch((err: any) => console.error(err));

      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading or unzip file:', error);
    }
}

export async function downloadFile(downloadPath: String, downloadUrl: string, fileName: string, downloadName: String){
    try {
      await invoke('main_download_file', {
        url: downloadUrl,
        destination: `${downloadPath}/${fileName}`,
        downloadName: `Загрузка ${downloadName}`
      }).catch((err: any) => console.error(err));
    } catch (error) {
      console.error('Error downloading file:', error);
    }
}

export async function checkFileExisting(filePath: string) {
  const isExist = await invoke('directory_exists', { path: filePath }).catch(err => false);
  if(isExist){
    return true
  }
  return false
}
