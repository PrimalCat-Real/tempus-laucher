use futures_util::StreamExt;
use reqwest::Client;
use std::{cmp::min, path::PathBuf};
use tokio::{fs::File, io::AsyncWriteExt};
// use tauri::event::emit;


#[derive(Debug, thiserror::Error)]
pub enum NetworkError {
    #[error(transparent)]
    IO(#[from] std::io::Error),
    #[error(transparent)]
    NetworkRequest(#[from] reqwest::Error),
}

pub async fn download_file(
    window: tauri::Window,
    url: &String,
    destination: &PathBuf,
    download_name: &String,
) -> Result<(), NetworkError> {
    let client = reqwest::Client::new();
    let req = client.get(url);
    let res = req.send().await?;

    let total_size = res.content_length().unwrap_or(0) as usize;
    let mut file = File::create(destination).await?;
    let mut stream = res.bytes_stream();
    let mut downloaded_size = 0usize;

    window.emit("downloadStart", download_name).unwrap();

    while let Some(chunk) = stream.next().await {
        let chunk = chunk?;
        file.write_all(&chunk).await?;
        downloaded_size += chunk.len();

        let progress = (downloaded_size as f64 / total_size as f64) * 100.0;
        window.emit("downloadProgress", &progress).unwrap();
    }

    // Flush and sync the file to ensure all data is written to disk
    file.flush().await?;
    file.sync_all().await?;

    window.emit("downloadDone", &true).unwrap();

    Ok(())
}

// pub async fn download_file(window: tauri::Window, url: &str, destination: &PathBuf, downloadName: &String) -> Result<(), String> {
//     // Reqwest setup
//     let client = reqwest::Client::new();
//     let res = client
//         .get(url)
//         .send()
//         .await
//         .or(Err(format!("Failed to GET from '{}'", &url)))?;
//     let total_size = res
//         .content_length()
//         .ok_or(format!("Failed to get content length from '{}'", &url))?;
    
//     // Indicatif setup
   

//     // download chunks
//     let mut file = File::create(destination).await.or(Err(format!("Failed to create file")))?;
//     let mut downloaded: u64 = 0;
//     let mut stream = res.bytes_stream();

//     window.emit("downloadStart", downloadName).unwrap();
//     while let Some(item) = stream.next().await {
//         let chunk = item.or(Err(format!("Error while downloading file")))?;
//         file.write_all(&chunk)
//             .await.or(Err(format!("Error while writing to file")))?;
//         let new = min(downloaded + (chunk.len() as u64), total_size);
        
//         downloaded = new;
//         let progress_percentage = (downloaded * 100) / total_size;
//         window.emit("downloadProgress", &progress_percentage).unwrap();
//     }

//     return Ok(());
// }