import React ,{useEffect} from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import './style/Board.css'
import { Get_Tasks_In_A_List, View_Current_Board } from '../store/boards/BoardAction'
import { set_combinedarray } from '../store/boards/BoardSlice'
import { ClearTasks } from '../store/boards/BoardSlice'
 const BoardView = () => {


    const dispatch = useDispatch();

    const CurrentColumns = useSelector((state: RootState) => state.Boards.Current_columns)

    const Tasks = useSelector((state: RootState) => state.Boards.tasks)

    const CurrentBoard = useSelector((state: RootState) => state.Boards.Current_board)

    const CombinedArray = useSelector((state: RootState) => state.Boards.Combinedarray)

    const taskadded =   useSelector((state: RootState) => state.Boards.event)




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

      
    },[CurrentColumns, Tasks])



    //taskadded is just a boolean in the state that is triggered each time the user submits a new task in order to re-render this component.
    useEffect(()=>{
     
 
    View_Current_Board(CurrentBoard)
     
    dispatch(ClearTasks())
    
    },[taskadded])


  
    console.log(CurrentBoard)
    return(

        <>
        
      
        <div className='Board d-flex'>
        {CombinedArray && CombinedArray.map((column:any) => (
        
        <div className='column d-flex flex-column' key={column.id}>
            
            
            <div>{column.name}</div>


            {column.tasks && column.tasks?.map((task: any) => (

              
                <div key={task.id} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                  </div>
                </div>

            ))}

        </div>
      

        ))}    
          </div>
       
        </>
    )
}

export default BoardView;