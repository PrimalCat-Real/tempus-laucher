// import { invoke } from "@tauri-apps/api/tauri";


  


// const modsConfig: ModsConfig = {
//     mods: [
//         {
//             name: "sodium",
//             active: false,
//             installed: false,
//             version: "mc1.20.4-0.5.8",
//         },
//         {
//             name: "sound-physics-remastered",
//             active: false,
//             installed: false,
//             version: "fabric-1.20.4-1.3.1",
//         },
//         {
//             name: "lambdynamiclights",
//             active: false,
//             installed: false,
//             version: "2.3.4+1.20.4",
//         },
//     ]
// }


// // // Write the JSON data to the file
// const writeConfig = async (filePath: string) => {
//     const name = 'config'
//       try {
//         await invoke('write_json', { dir:filePath, name:name, data:JSON.stringify(modsConfig, null, 2)})
//       //   await writeJson(filePath, defaultContent);
//         console.log('File written successfully!');
//       } catch (error) {
//         console.error('Error writing file:', error);
//       }
//     };
  
//   export default writeConfig;
  
  
//   export const readConfig = async (filePath: string): Promise<ModsConfig> => {
//     let contents: ModsConfig = modsConfig;
//     try {
//       contents = await invoke('read_json_file', { path: filePath });
//       // console.log('File contents:', contents);
//       return contents;
//     } catch (error) {
//       console.error('Error reading file:', error);
//       return contents;
//     }
//   }