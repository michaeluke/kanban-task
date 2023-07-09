import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TbLayoutBoardSplit } from "react-icons/tb";
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import React , {useEffect,useState} from 'react'
import { GetBoardsAsync } from '../store/boards/BoardAction';
import { Get_Current_Board } from '../store/boards/BoardAction';
import { View_Current_Board } from '../store/boards/BoardAction';
import { Board } from '../store/boards/BoardSlice';
import { ClearTasks } from '../store/boards/BoardSlice';
import { Setboardselected } from '../store/boards/BoardSlice';
import { BoardsCount } from '../store/boards/BoardSlice';
import './style/Mui.css'



export default function BoardsList(){

  const dispatch = useDispatch();
  var curr_board : Board | null | any ;

  const Boards = useSelector( (state: RootState) => state.Boards.boards_array)

  const selectedboard =  useSelector( (state: RootState) => state.Boards.Current_board)

  // if(Boards.length !=0){
  //   const board :any = Boards[0];
  // }
  

  const [board, setBoard] = useState<any>(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (Boards.length !== 0){
      setBoard(selectedboard);
      // setIsInitialRender(false);
    }
  }, [selectedboard]);

  useEffect(() => {
    if (board && board.id !== undefined) {
      setActiveItemId(board.id);
    } else {
      setActiveItemId(null);
    }
  }, [board]);

  const handleClick = (boardid:any) => {
    debugger
    setActiveItemId(boardid);
  
  
  };

  const Tasks = useSelector((state: RootState) => state.Boards.tasks)

  useEffect(()=>{

    GetBoardsAsync();



    
  },[])


  


//upon clicking on a board fetch api for selected board and view it.
  const get_currentboard = (board:Board|null) =>{


  

      Get_Current_Board(board)
      // View_Current_Board(board);
  
      // dispatch(Setboardselected(true))
      //in order not to duplicate tasks.
      // dispatch(ClearTasks())

  }
  
 



  console.log(Boards);

    return(
        <List sx={{paddingLeft:'18px', paddingRight:'20px'}}>
        {Boards && Boards?.map((board:any) => (
         console.log(board.id),
         

          <ListItem onClick={()=> {get_currentboard(board)}} key={board.id} disablePadding sx={{cursor:'pointer'}}>
            <ListItemButton 
            
            onClick={() => handleClick(board.id)} // Pass the board ID to handleClick
            id={activeItemId === board.id ? 'active' : ''}
            
            >
              <ListItemIcon>
                
               <TbLayoutBoardSplit />
               
              </ListItemIcon>
              <ListItemText primary={board.name}  />
            </ListItemButton>
          </ListItem>
         
        ))}

      </List>
    )
}