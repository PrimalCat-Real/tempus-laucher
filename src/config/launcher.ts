import { invoke } from '@tauri-apps/api/tauri';


interface UserProfile {
  username: string;
  password: string;
}

interface Resolution {
  width: number;
  height: number;
}

interface LaunchProfile {
  name: string;
  version: string;
}

interface Config {
  installDirectory: string;
  javaPath: string;
  resolution: Resolution;
  fullscreen: boolean;
  jvmArgs: string[];
  userProfile: UserProfile;
  launchProfiles: { [key: string]: LaunchProfile };
  language: string;
  theme: string;
}

export let config: Config = {
    installDirectory: "",
    javaPath: "",
    resolution: {
      width: 1280,
      height: 720
    },
    fullscreen: false,
    jvmArgs: [
      "-Xms1G",
      "-Xmx4G"
    ],
    userProfile: {
      username: "PrimalCat",
      password: ""
    },
    launchProfiles: {
      vanilla: {
        name: "Vanilla",
        version: "1.20.4"
      }
    },
    language: "ru-ru",
    theme: "light",
};



// Write the JSON data to the file
const writeConfig = async (filePath: string) => {
  const name = 'config'
    try {
      await invoke('write_json', { dir:filePath, name:name, data:JSON.stringify(config, null, 2)})
    //   await writeJson(filePath, defaultContent);
      console.log('File written successfully!');
    } catch (error) {
      console.error('Error writing file:', error);
    }
  };

export default writeConfig;


export const readConfig = async (filePath: string): Promise<Config> => {
  let contents: Config = config;
  try {
    contents = await invoke('read_json_file', { path: filePath });
    // console.log('File contents:', contents);
    return contents;
  } catch (error) {
    console.error('Error reading file:', error);
    return contents;
  }
}


export const updateConfigValue = async (key: string, newValue: string | number | boolean, configPath: string) => {
  config = { ...config, [key]: newValue }; // Update the config object
  // console.log("updated conf", config);
  
  await writeConfig(configPath); // Save the updated config to file
  // console.log('Config value updated successfully!');
};

// export const updateConfigValue = async (key: string, newValue: string | number | boolean, configPath: string) => {
//   const keys = key.split('.');
//   let nestedConfig: any = config; 

//   for (let i = 0; i < keys.length - 1; i++) {
//     const currentKey = keys[i];
//     if (!(currentKey in nestedConfig)) {
//       nestedConfig[currentKey] = {};
//     }
//     nestedConfig = nestedConfig[currentKey]; 
//   }


//   nestedConfig[keys[keys.length - 1]] = newValue;

//   config = nestedConfig
//   console.log("updated conf", nestedConfig);
  
//   await writeConfig(configPath); 
//   console.log('Config value updated successfully!');
// };
