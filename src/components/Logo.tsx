import React from 'react';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import './style/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";

const Logo = () => {

    return(

        <>
        <div className='header-container'>
        
        <div className='header-content d-flex align-items-center justify-content-between'>

        <div className='logo d-flex align-items-center'>
      
     
        <svg width={0} height={0}>
      <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={1}>
        <stop offset={0} stopColor="#635FC7" />
        <stop offset={1} stopColor="#A8A4FF" />
      </linearGradient>
    </svg>
    <ViewWeekIcon sx={{ fill: "url(#linearColors)" , fontSize:'44px' , paddingLeft:'10px' }} />
    
  

   

        <div className='kanban font-weight-bold'>
        kanban
        </div>



        </div>

        
        </div>
        </div>
        </>
    )
}

export default Logo;