import React , {useEffect}from 'react' 
import Header from './Header'
import Sidebar from './Siderbar'
import BoardView from './Board_View'
import BoardsModal from './Modal_Boards'
import type { RootState } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import TasksModal from './Modal_Tasks'
import NoBoards from './NoBoards'
import EditBoard from './EditBoardModal'
import EditTaskModal from './EditTaskModal'
import DeleteBoard from './DeleteModal'

 const Home = (): JSX.Element => {


    const dispatch  = useDispatch()

    const Modal_Boards = useSelector((state: RootState) => state.Boards.show_boards_modal)

    const editModal = useSelector((state: RootState) => state.Boards.showeditboardmodal)

    const Modal_Tasks = useSelector((state: RootState) => state.Boards.show_tasks_modal)

    // const boardSelected = useSelector((state: RootState) => state.Boards.anyBoardSelected)

    const Boards = useSelector((state: RootState) => state.Boards.boards_array)

    const edittaskmodal = useSelector((state: RootState) => state.Boards.showEditTaskModal)
   
    const DeleteModal = useSelector((state: RootState) => state.Boards.show_deletemodal)

    return(

        <>
     
        <Sidebar>
        {Modal_Boards ? <BoardsModal/> : null}
        {editModal    ? <EditBoard  /> : null}
       
        {Boards.length>0? <BoardView/> : <NoBoards/>}

         
        {Modal_Tasks ? <TasksModal/> : null}
        {edittaskmodal ? <EditTaskModal/> : null}
        {DeleteModal ? <DeleteBoard/> : null}
        </Sidebar>
        
        </>
    )
}

export default Home;