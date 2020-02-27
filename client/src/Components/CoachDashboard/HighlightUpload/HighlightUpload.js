import React, {useState} from 'react';
import './highlightupload.css'
import {FaPlus} from 'react-icons/fa'
import {storage} from '../../../firebaseConfig'
import {ProgressBar} from 'react-bootstrap'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function HighlightUpload(props){

    const [error, setError] = useState(false)
    const [url, setUrl] = useState(null)
    const [progress, setProgress]= useState(0)
   

    const squareAsInput = () => {
       document.getElementsByName('highlightupload')[0].click()
    }


    const handleUploadChange = (event) => {
        const file = event.target.files[0]

        if(file){
            const filetype = file['type'];
            const validVideoFile = ['video/mp4']

            if(validVideoFile.includes(filetype)){
                const uploadVideo = storage.ref(`highlights/videos/${file.name}`).put(file)

                uploadVideo.on(
                    'state_changed', 

                    snapshot => {
                        let uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        setProgress(uploadProgress)

                    },

                    error => setError(error),

                    () => {
                        storage.ref('highlights/videos').child(file.name).getDownloadURL()
                        .then(url => setUrl(url))
                })
            } else {
                setError('error tyring to upload video')
            }
        }
    }



    const handleSubmit = () => {
        if(progress < 100){
            console.log(progress)
            toast.error('Wait until the video is fully uploaded')
        }
    }


    return (
        <div className='highlight-upload'>
             <div className='upload-video'>
                <div className='upload-video-square' onClick={() => squareAsInput()} >
                    <FaPlus size={90} color={'#707070'}/>
                </div>
                {<ProgressBar now={progress} label={`${progress}%`} className='upload-progress-bar'/>}
                <label className='custom-file-upload'>
                    <input type='file' onChange={handleUploadChange} name='highlightupload' />
                    Upload Video
                </label>
             </div>
            <button className='rating-button' onClick={handleSubmit} >Upload Highlight</button>
        </div>
    )
}

export default HighlightUpload