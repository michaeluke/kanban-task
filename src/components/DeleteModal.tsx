
import React , {useEffect}from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { hide_deletemodal } from "../store/boards/BoardSlice";
import { Delete_Board } from "../store/boards/BoardAction";
import { Get_Current_Board } from "../store/boards/BoardAction";
export default function DeleteBoard(){

    const dispatch = useDispatch()
    const Current_Board = useSelector((state: RootState) => state.Boards.Current_board)

    const view =  useSelector((state: RootState) => state.Boards.show_deletemodal)

  
      
      const handle_Click = (e:any) =>{
        console.log(e.target.classList.value)
        if (e.target.classList.value === "modal d-block") {
          
          dispatch(hide_deletemodal());
        }
          }


          const handleClose = () =>{


            dispatch(hide_deletemodal())

            }

            const handleDelete = () =>{


            Delete_Board(Current_Board)
            dispatch(hide_deletemodal())
    
        
            }
    return (
<>
        {view && (
            <div className="modal-overlay"  onClick={handle_Click} >
              <div
                className="modal d-block"
                id="exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                aria-modal="true"
                
              >
    
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete this board?
                      </h5>
                    </div>
                    <div className="modal-body">
    
                      <div>Are you sure you want to delete the ‘{Current_Board?.name}’ board? This action will remove all columns and tasks and cannot be reversed.
                      </div>

                      <div className="parent buttons d-flex flex-column">
                        
                        <button onClick={handleDelete}>Yes</button>
                        
                        <button onClick={handleClose}>No</button>
                      </div>
                    
    
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>

    )
    }

</>
    )
}