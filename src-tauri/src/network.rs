use futures_util::StreamExt;
use std::path::PathBuf;
use tokio::{fs::File, io::AsyncWriteExt};
// use tauri::event::emit;


#[derive(Debug, thiserror::Error)]
pub enum NetworkError {
  #[error(transparent)]
  IO(#[from] std::io::Error),
  #[error(transparent)]
  NetworkRequest(#[from] reqwest::Error),
}

pub async fn download_file(window: tauri::Window, url: &String, destination: &PathBuf) -> Result<(), NetworkError> {
  let client = reqwest::Client::new();
  let req = client.get(url);
  let res = req.send().await?;
  let total_size = res.content_length().unwrap_or(0) as usize; // Get the total size of the file

  let mut file = File::create(destination).await?;
  let mut stream = res.bytes_stream();
  let mut downloaded_size = 0usize;

  while let Some(chunk) = stream.next().await {
    let chunk = chunk?;
    file.write_all(&chunk).await?;
    downloaded_size += chunk.len();

    // Calculate and emit download progress
    let progress = (downloaded_size as f64 / total_size as f64) * 100.0;
    window.emit("downloadProgress", &progress).unwrap();

    // emit("downloadProgress", Some(progress.to_string())).expect("Failed to emit downloadProgress event");
  }
  // window.emit("downloadProgress", 0).unwrap();
  window.emit("downloadDone", &true).unwrap();
  Ok(())
}