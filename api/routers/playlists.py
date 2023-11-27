from fastapi import APIRouter, Depends, HTTPException, status
from queries.playlists import (
    # PlaylistIn,
    PlaylistOut,
    PlaylistRespository,
    Error,
)

from queries.users import UserRepository
from typing import Union
from authenticator import authenticator

router = APIRouter()


@router.get(
    "/api/playlists/{user_id}", response_model=Union[PlaylistOut, Error]
)
async def get_user_playlist(
    user_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    user_repo: UserRepository = Depends(),
    playlist_repo: PlaylistRespository = Depends(),
):
    if not account_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid User"
        )

    return playlist_repo.get_all_playlists(user_id)
