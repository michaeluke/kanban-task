import React , {useEffect, useState}from 'react';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import './style/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from "@mui/material";
import Toggler from './Toggler';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Delete_Board } from '../store/boards/BoardAction';
import { show_deletemodal, show_editboardmodal, show_task_modal } from '../store/boards/BoardSlice';
import { Get_Current_Board } from '../store/boards/BoardAction';

const Header = (props: { open: boolean }) => {
  const [anchorEl, setAnchorEl] = useState(null);


  const dispatch = useDispatch();
  const Current_Theme = useSelector((state: RootState) => state.Theme.Theme_mode)

  const Current_Board = useSelector((state: RootState) => state.Boards.Current_board)

  const firstBoard = useSelector((state: RootState) => state.Boards.firstBoard)
  const Boards = useSelector((state: RootState) => state.Boards.boards_array)


  const handleMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () =>{


    // Delete_Board(Current_Board)
    // dispatch(Setboardselected(false))

    dispatch(show_deletemodal())
    handleMenuClose()
  }

  const handle_task_modal = () =>{
   
    console.log("click")
   
    dispatch(show_task_modal())
  }

  useEffect(() => {
    const root = document.documentElement;
    const htmlElement = document.documentElement;
    htmlElement.style.setProperty("--color", Current_Theme === true ? "#121721" : "#F4F6F8");
  
  }, [Current_Theme]);


  const openeditmodal = () =>{

      
    dispatch(show_editboardmodal())
    handleMenuClose()
  }


  const { open } = props;
    return(

        <>
        <div className='header-container'>
        
        <div className='header-content d-flex align-items-center justify-content-between'>

     
        <div className='logo d-flex align-items-center'>
      
     
        {!open && 
        <>
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
        </>
}

      
        <h1 className={!open ? 'platform font-weight-bold' : 'platform-closed font-weight-bold'}>
       {Current_Board ?  `${Current_Board.name}` : `${firstBoard?.name}`

       }
        </h1>
     
       


        </div>

        <div className='right-section d-flex align-items-center'>

        <button onClick={handle_task_modal} className="add-task-btn">+ Add New Task</button>
        <MoreVertIcon sx={{color:'#828FA3' , cursor:'pointer'}}   onClick={handleMenuOpen}/>
        </div>
        <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{color:'#828FA3'}} onClick={openeditmodal}>Edit Board</MenuItem>
        <MenuItem sx={{color:'#EA5555'}} onClick={handleDelete}>Delete Board</MenuItem>
      </Menu>


        



        

        </div>

        </div>
       
        </>
    )
}

export default Header;