import React, {useState} from 'react'
import {storage} from '../firebaseConfig'

export default function Uploader() {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file){
            const fileType = file['type']
            const validImageTypes = ["image/jpeg", "image/png"]
            if(validImageTypes.includes(fileType)){
                setError('')
                setImage(file)
            } else {
                setError('Please select an image to upload');
            }
        } 
    }

    const handleUpdate = () => {
        if(image){
            const uploadTask = storage.ref(`profileImages/${image.name}`).put(image)

            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    setProgress(progress)
                },
                error => {
                    setError(error);
                },
                // Getting the url of the image
                () => {
                    storage.ref('profileImages').child(image.name).getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setUrl(url)
                        setProgress(0);
                    })
                }
            )
        } else {
            setError('Error please choose an image to upload');
        }
    }

    return (
        <div>
            <div>
                <input type='file' onChange={handleChange} />
                <button onClick={handleUpdate}>Upload Image</button>
            </div>
            {url ? <img src={url} /> : null}
            <div style={{height: '100px'}} >
                {progress > 0 ? <progress value={progress} max='100' /> : ''}
                <p style={{color: 'red'}}>{error}</p>
            </div>
        </div>
    )
}
