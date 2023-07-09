
import { TbLayoutBoardSplit } from "react-icons/tb";
import './style/Toggler.css'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { show_modal } from "../store/boards/BoardSlice";
import React , {useEffect} from 'react'
export default function Add_board(){

    // const Modal_view = useSelector((state: RootState) => state.Boards.show_boards_modal)

    const dispatch = useDispatch()

  
    return(
        
        <div onClick={()=>  dispatch(show_modal())} className='add_board d-flex align-items-center justify-content-start' style={{paddingLeft:'34px'}}> 
          
        <TbLayoutBoardSplit color='#5964E0' className='dash-icon'/>

        <div className='create'>
          + Create New Board
        </div>
        </div>
    )
}