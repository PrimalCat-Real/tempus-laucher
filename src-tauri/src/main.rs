// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod download;


#[tauri::command]
fn ping(address: &str) -> String {
   return format!("Ping, {}!", address)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![ping, download::download_file])
    .run(tauri::generate_context!())
    
    .expect("error while running tauri application");
}
