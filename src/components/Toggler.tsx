import React ,{useContext} from "react";
import './style/Toggler.css'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { switch_theme } from '../store/boards/ThemeSlice'

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect } from 'react';

import {BsFillMoonStarsFill}  from "react-icons/bs";

export default function Toggler(){

  const dispatch = useDispatch()

  const Current_Theme = useSelector((state: RootState) => state.Theme.Theme_mode)



  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.style.setProperty("--side_colors", Current_Theme === true ? "#000112" : "#E4EBFA");
  

  }, [Current_Theme]);


return(


  <div className="parent_switch d-flex">

    <LightModeIcon sx={{ 
  fontSize:'20px' ,color:'#828FA3',marginRight:'20px'}}/>

      <label className="switch">
  
        <input type="checkbox"  onChange={() => dispatch(switch_theme())}  />
        <span className="slider"></span>
      </label>
   
      <div className="moon" style={{marginLeft:'20px'}}>
      <BsFillMoonStarsFill   color="#828FA3"  fontSize={'15px'}    />
      </div>
      
   

</div>
)

}