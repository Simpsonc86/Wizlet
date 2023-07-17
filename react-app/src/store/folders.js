const GET_ALL_FOLDERS = "GET_ALL_FOLDERS"
const GET_ONE_FOLDER = "GET_ONE_FOLDER"
const CREATE_FOLDER = "CREATE_FOLDER"

const getAllFolders = (folders) => ({
    type: GET_ALL_FOLDERS,
    payload: folders
})
const getOneFolder = (folder) => ({
    type: GET_ONE_FOLDER,
    payload: folder
})
const createFolder = (folder) => ({
    type: GET_ONE_FOLDER,
    payload: folder
})

export const getAllFoldersThunk = () => async(dispatch)=>{
    const res = await fetch("api/folders/", {
        headers: {
            "Content-Type":"application/json",
        },
    });
    if (res.ok){
        const folders = await res.json()
        dispatch(getAllFolders(folders))
    }
}
export const getOneFolderThunk = (folder_id) => async(dispatch)=>{
    const res = await fetch(`api/folders/${folder_id}`, {
        headers: {
            "Content-Type":"application/json",
        },
    });
    if (res.ok){
        const folder = await res.json()
        dispatch(getOneFolder(folder))
    }
}

export const createFolderThunk = (folder) => async(dispatch)=>{
    const res = await fetch(`api/folders/create`, {
        method:'POST',
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(folder)
    });
    const resBody = await res.json();
    if (res.ok){
        const folder = resBody;
        dispatch(createFolder(folder))
        return folder;
    } else if (res.status < 500){
        if(resBody.errors){
            return {errors:resBody.errors}
        }
    } else{
        return {errors: ['Something bad happened!']}
    }
}

const initialState = {allFolders:{}, folder:{}}

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_FOLDERS:
            return {allFolders:{...action.payload},folder: {}};
        case GET_ONE_FOLDER:
            return {allFolders:{},folder: {...action.payload}};
        case CREATE_FOLDER:
            return {allFolders:{},folder: {...action.payload}};
        default:
            return state;
    }
}