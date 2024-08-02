import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
      Upload file
      <VisuallyHiddenInput type='file' />
    </Button>
  )
}
