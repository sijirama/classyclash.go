import {storage}  from './firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { FileType } from 'rsuite/esm/Uploader'
//import { FileType } from 'rsuite/esm/Uploader'

type File = Blob 

export async function uploadToFirebaseandGetDownloadUrl(file:any){
    try {  
        const storageref = ref (storage , file.name)
        //console.log(file)
        const uploadTask  = uploadBytesResumable(storageref , file.blobFile )
        //const snapshot = await uploadTask
        await uploadTask
        //console.log("file uploaded")
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        //console.log(downloadURL)
        return downloadURL
    } catch (error) {
        console.log(error)
        throw error
    }
}
