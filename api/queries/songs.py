from pydantic import BaseModel
from typing import List


class Artists(BaseModel):
    name: str


class Album(BaseModel):
    name: str
    release_date: str
    img_url: str


class Songs(BaseModel):
    name: str
    artist: List[Artists]
    album: Album
    song_length: int
    spotify_url: str
    tempo: float
    valence: float
    lyricness: float
