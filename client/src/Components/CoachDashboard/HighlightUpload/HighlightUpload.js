import React, {useState} from 'react';
import './highlightupload.css'
import {FaPlus} from 'react-icons/fa'
import {storage} from '../../../firebaseConfig'
import {ProgressBar} from 'react-bootstrap'

function HighlightUpload(props){

    const [error, setError] = useState(false)
    const [url, setUrl] = useState(null)
    const [progress, setProgess]= useState(0)

    const squareAsInput = () => {
       document.getElementsByName('highlightupload')[0].click()
    }

    const handleUploadChange = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0]

        if(file){
            const filetype = file['type'];
            const validVideoFile = ['video/mp4']

            if(validVideoFile.includes(filetype)){
                const uploadVideo = storage.ref(`highlights/videos/${file.name}`).put(file)

                uploadVideo.on(
                    'state_changed', 

                    snapshot => {
                        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgess(uploadProgress)
                    },

                    error => setError(error),

                    () => {
                        storage.ref('highlights/videos').child(file.name).getDownloadURL()
                        .then(url => console.log(url))
                })
            } else {
                setError('error tyring to upload video')
            }
        }
        console.log(progress)
    }

    return (
        <div className='highlight-upload'>
             <div className='upload-video'>
                <div className='upload-video-square' onClick={() => squareAsInput()} >
                    <FaPlus size={90} color={'#707070'}/>
                </div>
                <input type='file' onChange={handleUploadChange} name='highlightupload' />
                {<ProgressBar now={progress} label={`${progress}%`} /> }
             </div>
        </div>
    )
}

export default HighlightUpload