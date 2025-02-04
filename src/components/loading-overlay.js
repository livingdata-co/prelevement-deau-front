// Components/loading-overlay.js
'use client'
import {Box, CircularProgress} from '@mui/material'

const LoadingOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 1300, // Par exemple, similaire à un Modal MUI
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <CircularProgress />
  </Box>
)

export default LoadingOverlay
