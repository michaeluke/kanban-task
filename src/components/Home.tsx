import React , {useEffect}from 'react' 
import Header from './Header'
import Sidebar from './Siderbar'
import BoardView from './Board_View'
import BoardsModal from './Modal_Boards'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import TasksModal from './Modal_Tasks'
import NoBoards from './NoBoards'
import EmptyBoard from './EmptyBoard'

 const Home = (): JSX.Element => {


    const dispatch  = useDispatch()

    const Modal_Boards = useSelector((state: RootState) => state.Boards.show_boards_modal)

    const Modal_Tasks = useSelector((state: RootState) => state.Boards.show_tasks_modal)

    // const boardSelected = useSelector((state: RootState) => state.Boards.anyBoardSelected)

    const Boards = useSelector((state: RootState) => state.Boards.boards_array)

   
   

    return(

        <>
     
        <Sidebar>
        {Modal_Boards ? <BoardsModal/> : null}
       
        {Boards.length>0? <BoardView/> : <NoBoards/>}

         
         {Modal_Tasks ? <TasksModal/> : null}
        </Sidebar>
        
        </>
    )
}

export default Home;