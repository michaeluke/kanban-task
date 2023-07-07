import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import "./style/modal.css";
import { Board, hide_modal } from "../store/boards/BoardSlice";
import { useForm } from "react-hook-form";
import {addBoard} from "../store/boards/BoardSlice"
import { createBoardAsync } from "../store/boards/BoardAction";
import { createColumn } from "../store/boards/BoardAction";
import { GetBoardsAsync } from "../store/boards/BoardAction";
import { BoardEmpty } from "../store/boards/BoardSlice";

interface Item {
  name: string;
}

export default function BoardsModal() {
  const [items, setItems] = useState<Item[]>([{ name: 'column' }]);

  const [first_time, setfirsttime] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit  , reset, formState: { errors }, unregister} = useForm();

  const [array_state, setarray] = useState<any>([])



  
  const Boards = useSelector((state: RootState) => state.Boards.boards_array)

  var columnsarray: any[] = [];




  const onSubmit = async (results:any) => {

    const values_array = Object.values(results);


    // console.log( values_array + "ok" )

     
        for(var i = 1 ; i < values_array.length ;i++){

      columnsarray.push(values_array[i]);
    
       

    }
    const boardname = values_array[0];
    console.log(boardname +"board name")
    console.log(columnsarray +"column values")
  
    setarray(columnsarray);

  
    
    await createBoardAsync(boardname);

   


  
    
    setfirsttime(true);



  
  };

  
 useEffect(()=>{
 
  const go =()=>{

    if(first_time){
    GetBoardsAsync();
    const lastBoard = Boards[Boards.length-1];
    // setarr(lastBoard)
    debugger
    //here
    if(array_state.length>0 && lastBoard){
  
      debugger
    
      //call on create column
      array_state?.map((column_name:any) => (
       
    
        
        createColumn(lastBoard, column_name)
        
  
      ))
  
      // dispatch(BoardEmpty(false))
      dispatch(hide_modal())
      }

      else{
        dispatch(hide_modal())
      }

      // //if there's no column added
      // else{

      //   dispatch(BoardEmpty(true))
      //   dispatch(hide_modal())

      // }
    }
     
  }

  go();

    
   
 },[onSubmit])
    




  const Modal_view = useSelector(
    (state: RootState) => state.Boards.show_boards_modal
  );


  const handle_Click = (e:any) =>{
    // console.log(e.target.classList.value)
    if (e.target.classList.value === "modal d-block") {
      
      dispatch(hide_modal());
    }
      }



  const handleChange = (e:any,index:any) =>{


    items[index].name = (e.target.value);
 

  }

  
  const addcolumn = () =>{

    const newItem: Item = { name: 'name' };
    setItems([...items, newItem]);

    

    
   
  }
  const handle_delete = (index:any) =>{

    

  
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });


    unregister(`column${index}`)
  

  
  }


  return (
    <>
    
      {Modal_view && (
        <div className="modal-overlay" onClick={handle_Click} >
          <div
            className="modal d-block"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Board
                  </h5>
                </div>
                <div className="modal-body">

                  <form onSubmit={handleSubmit(onSubmit)}>


                    <label htmlFor="boardName">Board Name:</label>  <br/>
                    <input
                      {...register("boardName", {required: 'Board Name is required'})}
                      type="text"
                      id="boardName"
                      autoComplete="off"
                    /> <br/>
                 {errors.boardName && <p>{errors.boardName.message  as React.ReactNode}</p>}

                    <label htmlFor="columns">Board Columns</label>  <br/>


                    {items && items?.map((item,index) => (



                        <div className="parent-col d-flex align-items-center" key={index}>

                            <div>
                            <input key={item.name}
                            {...register(`column${index}` , {required: 'Column Name is required'})}
                            type="text"
                            id="boardName"
                            autoComplete="off"
                            onChange={(e) => handleChange(e, index)}
                            /> <br/>
                          
                            {errors.item && <p>{errors.item.message  as React.ReactNode}</p>}
                            </div>

                            <span className="x-icon"  onClick={(e) => handle_delete(index)}>&#x2716;</span>




                        </div>
                    ))}
                    <br/>

                <button type="button" onClick={addcolumn}>+ Add New Column</button>


                  

                    {/* <input {...register("column", {required: 'Column Name is required'})}
                     type="text" id="columns"   autoComplete="off" /> <br/>
                  {errors.column && <p>{errors.column.message  as React.ReactNode}</p>} */}


      

                    <button type="submit">Submit</button>

                  </form>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );

}




