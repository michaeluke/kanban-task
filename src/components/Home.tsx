import React from 'react' 
import Header from './Header'
import Sidebar from './Siderbar'
import BoardView from './Board_View'
import BoardsModal from './Modal_Boards'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import TasksModal from './Modal_Tasks'
 const Home = (): JSX.Element => {


    const Modal_Boards = useSelector((state: RootState) => state.Boards.show_boards_modal)

    const Modal_Tasks = useSelector((state: RootState) => state.Boards.show_tasks_modal)

    return(

        <>
     
        <Sidebar>
        {Modal_Boards ? <BoardsModal/> : null}
       
         <BoardView/>
         
         {Modal_Tasks ? <TasksModal/> : null}
        </Sidebar>
        
        </>
    )
}

export default Home;