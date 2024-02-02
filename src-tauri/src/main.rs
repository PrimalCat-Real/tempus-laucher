#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::path::{Path, PathBuf};
use std::fs;
use std::fs::File;

use commands::CommandError;
use tauri::api::process::Command;


mod commands;
mod network;

#[tauri::command]
fn ping(address: &str) -> String {
   return format!("Ping, {}!", address)
}



#[tauri::command]
async fn main_download_file(window: tauri::Window, url: String, destination: String) -> Result<(), CommandError> {
  let download_path = PathBuf::from(&destination);
  network::download_file(window, &url, &download_path)
    .await
    .map_err(|_| CommandError::OSOperation("Unable to successfully download file".to_owned()))?;
  Ok(())
}

#[tauri::command]
fn directory_exists(path: String) -> Result<bool, String> {
    let path = Path::new(&path);
    Ok(path.is_dir())
}


#[tauri::command]
async fn unzip_file(source: String, destination: String) -> Result<String, String> {
    let source_path = std::path::Path::new(&source);
    let destination_path = std::path::Path::new(&destination);

    // Unzip the file
    let file = File::open(&source_path).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(file).map_err(|e| e.to_string())?;
    archive.extract(&destination_path).map_err(|e| e.to_string())?;

    // Delete the zip file
    std::fs::remove_file(&source_path).map_err(|e| e.to_string())?;
    
    Ok(format!("Files successfully extracted to: {}", destination))
}
  

#[tauri::command]
fn create_directory(dist: String) -> Result<(), String> {
  fs::create_dir_all(dist).map_err(|err| err.to_string())
}


#[tauri::command]
fn start_command() -> Result<(), String> {
    // let game_dir = PathBuf::from("A:\\Games\\MinecraftGD\\instances\\Vanilla");


    // let output = Command::new("cmd")
    //     .current_dir(game_dir.to_path_buf())
    //     .args(&["/C", "A:\\Games\\MinecraftGD\\java\\17.0.1+12\\bin\\java.exe -XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump -Djava.library.path=..\\..\\instances\\Vanilla\\natives -Djna.tmpdir=..\\..\\instances\\Vanilla\\natives -Dorg.lwjgl.system.SharedLibraryExtractPath=..\\..\\instances\\Vanilla\\natives -Dio.netty.native.workdir=..\\..\\instances\\Vanilla\\natives -Dminecraft.launcher.brand=GDLauncher -Dminecraft.launcher.version=1.0 -cp ..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm\\9.6\\asm-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-analysis\\9.6\\asm-analysis-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-commons\\9.6\\asm-commons-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-tree\\9.6\\asm-tree-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-util\\9.6\\asm-util-9.6.jar;..\\..\\datastore\\libraries\\net\\fabricmc\\sponge-mixin\\0.12.5+mixin.0.8.5\\sponge-mixin-0.12.5+mixin.0.8.5.jar;..\\..\\datastore\\libraries\\net\\fabricmc\\intermediary\\1.20.4\\intermediary-1.20.4.jar;..\\..\\datastore\\libraries\\net\\fabricmc\\fabric-loader\\0.15.6\\fabric-loader-0.15.6.jar;..\\..\\datastore\\libraries\\com\\github\\oshi\\oshi-core\\6.4.5\\oshi-core-6.4.5.jar;..\\..\\datastore\\libraries\\com\\google\\code\\gson\\gson\\2.10.1\\gson-2.10.1.jar;..\\..\\datastore\\libraries\\com\\google\\guava\\failureaccess\\1.0.1\\failureaccess-1.0.1.jar;..\\..\\datastore\\libraries\\com\\google\\guava\\guava\\32.1.2-jre\\guava-32.1.2-jre.jar;..\\..\\datastore\\libraries\\com\\ibm\\icu\\icu4j\\73.2\\icu4j-73.2.jar;..\\..\\datastore\\libraries\\com\\mojang\\authlib\\6.0.52\\authlib-6.0.52.jar;..\\..\\datastore\\libraries\\com\\mojang\\blocklist\\1.0.10\\blocklist-1.0.10.jar;..\\..\\datastore\\libraries\\com\\mojang\\brigadier\\1.2.9\\brigadier-1.2.9.jar;..\\..\\datastore\\libraries\\com\\mojang\\datafixerupper\\6.0.8\\datafixerupper-6.0.8.jar;..\\..\\datastore\\libraries\\com\\mojang\\logging\\1.1.1\\logging-1.1.1.jar;..\\..\\datastore\\libraries\\com\\mojang\\patchy\\2.2.10\\patchy-2.2.10.jar;..\\..\\datastore\\libraries\\com\\mojang\\text2speech\\1.17.9\\text2speech-1.17.9.jar;..\\..\\datastore\\libraries\\commons-codec\\commons-codec\\1.16.0\\commons-codec-1.16.0.jar;..\\..\\datastore\\libraries\\commons-io\\commons-io\\2.13.0\\commons-io-2.13.0.jar;..\\..\\datastore\\libraries\\commons-logging\\commons-logging\\1.2\\commons-logging-1.2.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-buffer\\4.1.97.Final\\netty-buffer-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-codec\\4.1.97.Final\\netty-codec-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-common\\4.1.97.Final\\netty-common-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-handler\\4.1.97.Final\\netty-handler-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-resolver\\4.1.97.Final\\netty-resolver-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-transport-classes-epoll\\4.1.97.Final\\netty-transport-classes-epoll-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-transport-native-unix-common\\4.1.97.Final\\netty-transport-native-unix-common-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-transport\\4.1.97.Final\\netty-transport-4.1.97.Final.jar;..\\..\\datastore\\libraries\\it\\unimi\\dsi\\fastutil\\8.5.12\\fastutil-8.5.12.jar;..\\..\\datastore\\libraries\\net\\java\\dev\\jna\\jna-platform\\5.13.0\\jna-platform-5.13.0.jar;..\\..\\datastore\\libraries\\net\\java\\dev\\jna\\jna\\5.13.0\\jna-5.13.0.jar;..\\..\\datastore\\libraries\\net\\sf\\jopt-simple\\jopt-simple\\5.0.4\\jopt-simple-5.0.4.jar;..\\..\\datastore\\libraries\\org\\apache\\commons\\commons-compress\\1.22\\commons-compress-1.22.jar;..\\..\\datastore\\libraries\\org\\apache\\commons\\commons-lang3\\3.13.0\\commons-lang3-3.13.0.jar;..\\..\\datastore\\libraries\\org\\apache\\httpcomponents\\httpclient\\4.5.13\\httpclient-4.5.13.jar;..\\..\\datastore\\libraries\\org\\apache\\httpcomponents\\httpcore\\4.4.16\\httpcore-4.4.16.jar;..\\..\\datastore\\libraries\\org\\apache\\logging\\log4j\\log4j-api\\2.15.0\\log4j-api-2.15.0.jar;..\\..\\datastore\\libraries\\org\\apache\\logging\\log4j\\log4j-core\\2.15.0\\log4j-core-2.15.0.jar;..\\..\\datastore\\libraries\\org\\apache\\logging\\log4j\\log4j-slf4j2-impl\\2.15.0\\log4j-slf4j2-impl-2.15.0.jar;..\\..\\datastore\\libraries\\org\\joml\\joml\\1.10.5\\joml-1.10.5.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\slf4j\\slf4j-api\\2.0.7\\slf4j-api-2.0.7.jar;..\\..\\datastore\\libraries\\net\\minecraft\\1.20.4.jar -Xmx4096m -Xms4096m -Dminecraft.applet.TargetDirectory=..\\..\\instances\\Vanilla -Dlog4j.configurationFile=A:\\Games\\MinecraftGD\\datastore\\assets\\objects\\bd\\client-1.12.xml -Dfml.ignorePatchDiscrepancies=true -Dfml.ignoreInvalidMinecraftCertificates=true -XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump -Xms256m net.fabricmc.loader.impl.launch.knot.KnotClient --username PrimalCat --version 1.20.4 --gameDir ..\\..\\instances\\Vanilla --assetsDir ..\\..\\datastore\\assets --assetIndex 12 --uuid a12ee55144c946b6ba9ae13e52664f0a --accessToken eyJraWQiOiJhYzg0YSIsImFsZyI6IkhTMjU2In0.eyJ4dWlkIjoiMjUzNTQzODg0MDM5NzgwNyIsImFnZyI6IkFkdWx0Iiwic3ViIjoiZWNkMjI1OWUtYzJiYy00OTE2LWE2ODMtNjJiMmY3MjBhOWIwIiwiYXV0aCI6IlhCT1giLCJucyI6ImRlZmF1bHQiLCJyb2xlcyI6W10sImlzcyI6ImF1dGhlbnRpY2F0aW9uIiwiZmxhZ3MiOlsidHdvZmFjdG9yYXV0aCIsIm1zYW1pZ3JhdGlvbl9zdGFnZTQiLCJvcmRlcnNfMjAyMiIsIm11bHRpcGxheWVyIl0sInByb2ZpbGVzIjp7Im1jIjoiYTEyZWU1NTEtNDRjOS00NmI2LWJhOWEtZTEzZTUyNjY0ZjBhIn0sInBsYXRmb3JtIjoiVU5LTk9XTiIsInl1aWQiOiJmMTE5YmI0Y2Q0Zjc5NTYxMTFhNzZmZjkzYzZlZjI2MiIsIm5iZiI6MTcwNjgwOTI1NiwiZXhwIjoxNzA2ODk1NjU2LCJpYXQiOjE3MDY4MDkyNTZ9.IUVAGh8W_eOyrIeB7Hu0BRt-3cS7c8zG1yaMFEjxhbs --clientId ${clientid} --xuid ${auth_xuid} --userType mojang --versionType release --width=854 --height=480"])
    //     .output()
    //     .map_err(|e| format!("Failed to execute command: {}", e))?;
    //     .unwrap();
    // let game_dir = PathBuf::from("A:\\Games\\MinecraftGD\\instances\\Vanilla");
    // let output = Command::new("cmd")
    //     .current_dir(game_dir.to_path_buf())
    //     .args(&["/C", "echo Test"])
    //     .output()
    //     .map_err(|e| format!("Failed to execute command: {}", e))?;
        
    // if output.status.success() {
    //     Ok(())
    // } else {
    //     let exit_code = output.status.code().unwrap_or_default();
    //     Err(format!(
    //         "Command failed with exit code {}",
    //         exit_code
    //     ))
    // }


    let game_dir = PathBuf::from("A:\\Games\\MinecraftGD\\instances\\Vanilla");
    let output = Command::new("cmd")
        .current_dir(game_dir.to_path_buf())
        .args(&["/C", "A:\\Games\\MinecraftGD\\java\\17.0.1+12\\bin\\java.exe -XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump -Djava.library.path=..\\..\\instances\\Vanilla\\natives -Djna.tmpdir=..\\..\\instances\\Vanilla\\natives -Dorg.lwjgl.system.SharedLibraryExtractPath=..\\..\\instances\\Vanilla\\natives -Dio.netty.native.workdir=..\\..\\instances\\Vanilla\\natives -Dminecraft.launcher.brand=GDLauncher -Dminecraft.launcher.version=1.0 -cp ..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm\\9.6\\asm-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-analysis\\9.6\\asm-analysis-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-commons\\9.6\\asm-commons-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-tree\\9.6\\asm-tree-9.6.jar;..\\..\\datastore\\libraries\\org\\ow2\\asm\\asm-util\\9.6\\asm-util-9.6.jar;..\\..\\datastore\\libraries\\net\\fabricmc\\sponge-mixin\\0.12.5+mixin.0.8.5\\sponge-mixin-0.12.5+mixin.0.8.5.jar;..\\..\\datastore\\libraries\\net\\fabricmc\\intermediary\\1.20.4\\intermediary-1.20.4.jar;..\\..\\datastore\\libraries\\net\\fabricmc\\fabric-loader\\0.15.6\\fabric-loader-0.15.6.jar;..\\..\\datastore\\libraries\\com\\github\\oshi\\oshi-core\\6.4.5\\oshi-core-6.4.5.jar;..\\..\\datastore\\libraries\\com\\google\\code\\gson\\gson\\2.10.1\\gson-2.10.1.jar;..\\..\\datastore\\libraries\\com\\google\\guava\\failureaccess\\1.0.1\\failureaccess-1.0.1.jar;..\\..\\datastore\\libraries\\com\\google\\guava\\guava\\32.1.2-jre\\guava-32.1.2-jre.jar;..\\..\\datastore\\libraries\\com\\ibm\\icu\\icu4j\\73.2\\icu4j-73.2.jar;..\\..\\datastore\\libraries\\com\\mojang\\authlib\\6.0.52\\authlib-6.0.52.jar;..\\..\\datastore\\libraries\\com\\mojang\\blocklist\\1.0.10\\blocklist-1.0.10.jar;..\\..\\datastore\\libraries\\com\\mojang\\brigadier\\1.2.9\\brigadier-1.2.9.jar;..\\..\\datastore\\libraries\\com\\mojang\\datafixerupper\\6.0.8\\datafixerupper-6.0.8.jar;..\\..\\datastore\\libraries\\com\\mojang\\logging\\1.1.1\\logging-1.1.1.jar;..\\..\\datastore\\libraries\\com\\mojang\\patchy\\2.2.10\\patchy-2.2.10.jar;..\\..\\datastore\\libraries\\com\\mojang\\text2speech\\1.17.9\\text2speech-1.17.9.jar;..\\..\\datastore\\libraries\\commons-codec\\commons-codec\\1.16.0\\commons-codec-1.16.0.jar;..\\..\\datastore\\libraries\\commons-io\\commons-io\\2.13.0\\commons-io-2.13.0.jar;..\\..\\datastore\\libraries\\commons-logging\\commons-logging\\1.2\\commons-logging-1.2.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-buffer\\4.1.97.Final\\netty-buffer-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-codec\\4.1.97.Final\\netty-codec-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-common\\4.1.97.Final\\netty-common-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-handler\\4.1.97.Final\\netty-handler-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-resolver\\4.1.97.Final\\netty-resolver-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-transport-classes-epoll\\4.1.97.Final\\netty-transport-classes-epoll-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-transport-native-unix-common\\4.1.97.Final\\netty-transport-native-unix-common-4.1.97.Final.jar;..\\..\\datastore\\libraries\\io\\netty\\netty-transport\\4.1.97.Final\\netty-transport-4.1.97.Final.jar;..\\..\\datastore\\libraries\\it\\unimi\\dsi\\fastutil\\8.5.12\\fastutil-8.5.12.jar;..\\..\\datastore\\libraries\\net\\java\\dev\\jna\\jna-platform\\5.13.0\\jna-platform-5.13.0.jar;..\\..\\datastore\\libraries\\net\\java\\dev\\jna\\jna\\5.13.0\\jna-5.13.0.jar;..\\..\\datastore\\libraries\\net\\sf\\jopt-simple\\jopt-simple\\5.0.4\\jopt-simple-5.0.4.jar;..\\..\\datastore\\libraries\\org\\apache\\commons\\commons-compress\\1.22\\commons-compress-1.22.jar;..\\..\\datastore\\libraries\\org\\apache\\commons\\commons-lang3\\3.13.0\\commons-lang3-3.13.0.jar;..\\..\\datastore\\libraries\\org\\apache\\httpcomponents\\httpclient\\4.5.13\\httpclient-4.5.13.jar;..\\..\\datastore\\libraries\\org\\apache\\httpcomponents\\httpcore\\4.4.16\\httpcore-4.4.16.jar;..\\..\\datastore\\libraries\\org\\apache\\logging\\log4j\\log4j-api\\2.15.0\\log4j-api-2.15.0.jar;..\\..\\datastore\\libraries\\org\\apache\\logging\\log4j\\log4j-core\\2.15.0\\log4j-core-2.15.0.jar;..\\..\\datastore\\libraries\\org\\apache\\logging\\log4j\\log4j-slf4j2-impl\\2.15.0\\log4j-slf4j2-impl-2.15.0.jar;..\\..\\datastore\\libraries\\org\\joml\\joml\\1.10.5\\joml-1.10.5.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-glfw\\3.3.2\\lwjgl-glfw-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-jemalloc\\3.3.2\\lwjgl-jemalloc-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-openal\\3.3.2\\lwjgl-openal-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-opengl\\3.3.2\\lwjgl-opengl-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-stb\\3.3.2\\lwjgl-stb-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl-tinyfd\\3.3.2\\lwjgl-tinyfd-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2-natives-windows.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2-natives-windows-arm64.jar;..\\..\\datastore\\libraries\\org\\lwjgl\\lwjgl\\3.3.2\\lwjgl-3.3.2-natives-windows-x86.jar;..\\..\\datastore\\libraries\\org\\slf4j\\slf4j-api\\2.0.7\\slf4j-api-2.0.7.jar;..\\..\\datastore\\libraries\\net\\minecraft\\1.20.4.jar -Xmx4096m -Xms4096m -Dminecraft.applet.TargetDirectory=..\\..\\instances\\Vanilla -Dlog4j.configurationFile=A:\\Games\\MinecraftGD\\datastore\\assets\\objects\\bd\\client-1.12.xml -Dfml.ignorePatchDiscrepancies=true -Dfml.ignoreInvalidMinecraftCertificates=true -XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump -Xms256m net.fabricmc.loader.impl.launch.knot.KnotClient --username PrimalCat --version 1.20.4 --gameDir ..\\..\\instances\\Vanilla --assetsDir ..\\..\\datastore\\assets --assetIndex 12 --uuid a12ee55144c946b6ba9ae13e52664f0a --accessToken eyJraWQiOiJhYzg0YSIsImFsZyI6IkhTMjU2In0.eyJ4dWlkIjoiMjUzNTQzODg0MDM5NzgwNyIsImFnZyI6IkFkdWx0Iiwic3ViIjoiZWNkMjI1OWUtYzJiYy00OTE2LWE2ODMtNjJiMmY3MjBhOWIwIiwiYXV0aCI6IlhCT1giLCJucyI6ImRlZmF1bHQiLCJyb2xlcyI6W10sImlzcyI6ImF1dGhlbnRpY2F0aW9uIiwiZmxhZ3MiOlsidHdvZmFjdG9yYXV0aCIsIm1zYW1pZ3JhdGlvbl9zdGFnZTQiLCJvcmRlcnNfMjAyMiIsIm11bHRpcGxheWVyIl0sInByb2ZpbGVzIjp7Im1jIjoiYTEyZWU1NTEtNDRjOS00NmI2LWJhOWEtZTEzZTUyNjY0ZjBhIn0sInBsYXRmb3JtIjoiVU5LTk9XTiIsInl1aWQiOiJmMTE5YmI0Y2Q0Zjc5NTYxMTFhNzZmZjkzYzZlZjI2MiIsIm5iZiI6MTcwNjgwOTI1NiwiZXhwIjoxNzA2ODk1NjU2LCJpYXQiOjE3MDY4MDkyNTZ9.IUVAGh8W_eOyrIeB7Hu0BRt-3cS7c8zG1yaMFEjxhbs --clientId ${clientid} --xuid ${auth_xuid} --userType mojang --versionType release --width=854 --height=480"])
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
        
    if output.status.success() {
        Ok(())
    } else {
        let exit_code = output.status.code().unwrap_or_default();
        Err(format!(
            "Command failed with exit code {}",
            exit_code
        ))
    }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![ping, main_download_file, create_directory, unzip_file, directory_exists, start_command])
    .run(tauri::generate_context!())
    
    .expect("error while running tauri application");
}