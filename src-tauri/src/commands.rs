use serde::{Serialize, Serializer};

#[derive(Debug, thiserror::Error)]
pub enum CommandError {
    #[error(transparent)]
    IO(#[from] std::io::Error),
    #[error(transparent)]
    NetworkRequest(#[from] reqwest::Error),
    #[error("{0}")]
    OSOperation(String),
}

impl Serialize for CommandError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

