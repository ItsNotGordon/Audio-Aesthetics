from fastapi import APIRouter, Depends, HTTPException, status
from queries.groups import (
    GroupIn,
    GroupOut,
    GroupsRepo,
    # MembershipsIn,
    # MembershipsOut,
    Error,
)
from queries.users import UserRepository
from typing import Union, List
from authenticator import authenticator


router = APIRouter()


@router.get("/api/groups/", response_model=Union[Error, List[GroupOut]])
def get_all_groups(repo: GroupsRepo = Depends()):
    return repo.get_all()


@router.post("/api/groups/", response_model=Union[GroupOut, Error])
async def create_group(
    group_data: GroupIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    user_repo: UserRepository = Depends(),
    group_repo: GroupsRepo = Depends(),
):
    if not account_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    username = account_data.get("username")
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User Data",
        )

    return group_repo.create_group(group_data, user_repo)


@router.get("/api/groups/{group_id}", response_model=Union[GroupOut, Error])
async def get_specific_group(
    group_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    user_repo: UserRepository = Depends(),
    group_repo: GroupsRepo = Depends(),
):
    if not account_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    user_id = account_data.get("id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid User"
        )

    return group_repo.get_group_details(group_id, user_id)


@router.delete("/api/groups/{group_id}", response_model=Union[bool, Error])
async def delete_group(
    group_id: int,
    group_repo: GroupsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[bool, Error]:
    requestor_id = account_data.get("id")
    if not requestor_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User",
        )
    result = group_repo.delete(group_id, requestor_id)
    # Will be true or ERROR
    # if result is an instance of Error, this logs the error
    if isinstance(result, Error):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.message,
        )
    return result

    # group = group_repo.get_group_details(group_id, account_data["id"])

    # group_dict = group.dict()

    # if int(group_dict["created_by"]) == account_data["id"]:
    #     print("Deleted group")
    #     return group_repo.delete(group_id)
    # else:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Unauthorized Access"
    #     )


@router.put("/api/groups/{group_id}", response_model=GroupOut)
async def update_group(
    group_id: int,
    group_edit: GroupIn,
    repo: GroupsRepo = Depends(),
    group_data: dict = Depends(authenticator.get_current_account_data),
) -> GroupOut:
    requester_id = group_data.get("id")
    if not requester_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User must be creator or admin of group to edit",
        )
    result = repo.update(group_edit, group_id, requester_id)
    if isinstance(result, Error):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.message,
        )
    return result
