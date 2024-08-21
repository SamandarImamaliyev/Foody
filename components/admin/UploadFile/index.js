import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { fileStorage } from '../../../server/configs/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useImageStore from '.././../../store/imageStore/imageStore'
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { errorMessajeContainer } from '../../../helper/toastMessageContainer';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function UploadFile() {
  const { t } = useTranslation();

  const [file, setFile] = React.useState(null);
  const { setImageUrl } = useImageStore();

  React.useEffect(() => {
    if (!file) {
      return
    }
    if (file.type.indexOf('image/') !== 0) {
      toast.error("Please, upload an image", errorMessajeContainer)
      return
    }

    // const test = URL.createObjectURL(file);
    // setImageUrl(test)

    const reader = new FileReader()

    reader.onloadend = () => {
      console.log(reader.result)
      setImageUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }, [file])

  // React.useEffect(() => { uploadImage() }, [file])

  // const uploadImage = async () => {
  //   try {
  //     const metadata = {
  //       contentType: 'image/jpeg'
  //     };

  //     const storageRef = ref(fileStorage, 'images/' + file.name);

  //     var uploadTask = uploadBytesResumable(storageRef, file, metadata);
  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         setUploading(true)
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //         }
  //       },
  //       (error) => {
  //         switch (error.code) {
  //           case 'fileStorage/unauthorized':
  //             // User doesn't have permission to access the object
  //             break;
  //           case 'fileStorage/canceled':
  //             // User canceled the upload
  //             break;
  //           case 'fileStorage/unknown':
  //             // Unknown error occurred, inspect error.serverResponse
  //             break;
  //         }
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           setUploading(false)
  //           setImageUrl(downloadURL)
  //         });
  //       }
  //     );

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <Button
      component='label'
      role={undefined}
      variant='contained'
      tabIndex={-1}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#43445A',
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px'
      }}
    >
      <CloudUploadIcon style={{ fontSize: '40px' }} />
      {t("upload image")}
      <VisuallyHiddenInput type='file' onChange={(e) => {
        setFile(e.target.files[0])
      }} />
    </Button>
  )
}
