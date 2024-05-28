import React from 'react';
import { Box } from '@mui/material';
import TopBar from './TopBar';


interface props{
  children: React.ReactNode
} 


const DashboardLayout= ({children}:props):JSX.Element =>{

  return (
    <Box>
      <TopBar/>
      <Box sx={{
            marginTop:'70px',
        }}>
            {children}
      </Box>
      
    </Box >
  )

}
export default DashboardLayout
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
