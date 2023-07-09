import React ,{useEffect, useState , useRef} from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import './style/Board.css'
import { Get_Tasks_In_A_List, Select_Task, SetFirstBoard, View_Current_Board } from '../store/boards/BoardAction'
import { set_combinedarray, show_deletemodal, show_editTaskmodal, show_editboardmodal, show_task_modal } from '../store/boards/BoardSlice'
import { ClearTasks } from '../store/boards/BoardSlice'
import { Board } from '../store/boards/BoardSlice'
import { Get_Current_Board } from '../store/boards/BoardAction'
import { SetCurrentBoard } from '../store/boards/BoardSlice'
import EmptyBoard from './EmptyBoard'
import { UpdateBoardName } from '../store/boards/BoardAction'
 const BoardView = () => {

  const [curr_board, setCurrBoard] = useState<Board | any>(null);

    const dispatch = useDispatch();

    const CurrentColumns = useSelector((state: RootState) => state.Boards.Current_columns)

    const Tasks = useSelector((state: RootState) => state.Boards.tasks)

    const CurrentBoard = useSelector((state: RootState) => state.Boards.Current_board)

    const CombinedArray = useSelector((state: RootState) => state.Boards.Combinedarray)

    const taskadded =   useSelector((state: RootState) => state.Boards.event)

    const Boards =   useSelector((state: RootState) => state.Boards.boards_array)

   

    const firstboard = useSelector((state: RootState) => state.Boards.firstBoard)
    useEffect(() => {


      
      if (Boards.length > 0) {

  
        setCurrBoard(Boards[0]);
        SetFirstBoard(curr_board)
        // View_Current_Board(curr_board);
    
      
      }
   
  }, [curr_board]);

  //empty nice
     useEffect(() => {
    

      if(CurrentBoard){

    
        
        Get_Current_Board(CurrentBoard);
      
      }
      else{
        
        //set currentboard to first board
        Get_Current_Board(firstboard);
        // View_Current_Board(firstboard);
      }
      
      
      
    }, [firstboard,show_editboardmodal,show_editTaskmodal,show_deletemodal,show_task_modal]);
 
    useEffect(() => {
    

      if(CurrentBoard){

        Get_Current_Board(CurrentBoard);
        View_Current_Board(CurrentBoard);
        dispatch(ClearTasks())
      }
      else{
        
        Get_Current_Board(firstboard);
        View_Current_Board(firstboard);
      }
   
      
      
      
    }, [CurrentBoard]);


  
    useEffect(()=>{

        if(CurrentBoard){

    
        Get_Current_Board(CurrentBoard);
        View_Current_Board(CurrentBoard);
      }
      else{
        
        Get_Current_Board(firstboard);
        View_Current_Board(firstboard);
      }
      
      dispatch(ClearTasks())
     
    },[taskadded])
   
    //getting tasks in each column in the Board.
    useEffect(() => {

    
      if(Array.isArray(CurrentColumns)){
        
        CurrentColumns.forEach((column: any) => {
             
          Get_Tasks_In_A_List(column.id);

         });;
      }
    
      }, [CurrentColumns]);

   
      //create a combined array to connect between the columns and the cards.
      useEffect(()=>{
       
        if(Array.isArray(CurrentColumns) && Array.isArray(Tasks) ){

        const columns_tasks = CurrentColumns.map((column: any) => ({
          ...column,
          tasks: Tasks.filter((task: any) => task.idList === column.id)
        }));

          dispatch(set_combinedarray(columns_tasks))
      
      }

    
    },[CurrentColumns , Tasks ])




    const handletaskedit = (task:any)=>{


      Select_Task(task.id)
      // dispatch(show_editTaskmodal());

    }
  
    console.log(CurrentBoard)
    return(

        <>
        
      
        <div className='Board d-flex'>
        {CombinedArray && CombinedArray.map((column:any) => (
        
        <div className='column d-flex flex-column' key={column.id}>
            
            
            <div>{column.name}</div>


            {column.tasks && column.tasks?.map((task: any) => (

              
                <div key={task.id} className="card" onClick={(e) => handletaskedit(task)}>
                  <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                  </div>
                </div>

            ))}

        </div>
      

        ))}    
          </div>
 

 {CombinedArray.length == 0  &&


      <EmptyBoard/>
 
 
 
 
 
 }
       
        </>
    )
}

export default BoardView;