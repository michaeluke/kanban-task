import { useDispatch } from 'react-redux'
import './style/Header.css'
import { show_editboardmodal } from '../store/boards/BoardSlice'


export default function EmptyBoard(){


    const dispatch = useDispatch()




    return(


        <>

        <div className="empty-parent d-flex flex-column align-items-center justify-content-center mt-5">


        <p className='empty'> This board is empty. Create a new column to get started.</p>

        <div> <button className="add-col-btn" onClick={(e) => dispatch(show_editboardmodal())}>+Add New Column</button> 
        </div>
       

        </div>
        </>
    )
}