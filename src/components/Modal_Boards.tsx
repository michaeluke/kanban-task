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
import { nanoid } from 'nanoid';

interface Item {
  name: string;
}

export default function BoardsModal() {
  const [items, setItems] = useState<Item[]|any>([{ }]);

  const [first_time, setfirsttime] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit  , reset, formState: { errors }, unregister, setValue} = useForm();

  const [array_state, setarray] = useState<any>([])

  const Boards = useSelector((state: RootState) => state.Boards.boards_array)

  var columnsarray: any[] = [];

  const [initial_values , setinitialvalues] = useState(
    [
    {
    name: 'To Do',
    },

    {
    name: 'Doing',
    }
])

  const onSubmit = async (results:any) => {

  const values_array = Object.values(results);

    // console.log( values_array + "ok" )

      //i=2 to skip first the boardname [0] and [1] unique id doesnt have a value.
      for(var i = 2 ; i < values_array.length ;i++){

      columnsarray.push(values_array[i]);

    }
    const boardname = values_array[0];
    // console.log(boardname +"board name")
    // console.log(columnsarray +"column values")
    setarray(columnsarray);
debugger
    // await createBoardAsync(boardname);

    // setfirsttime(true);

  };

  useEffect(()=>{


    //console.log(ColumnsofBoard)
    
    setItems(initial_values)
    debugger
  },[initial_values])

  
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
    }
     
  }

  go();

 },[onSubmit])
    




  const Modal_view = useSelector(
    (state: RootState) => state.Boards.show_boards_modal
  );


  const handle_Click = (e:any) =>{
   
    if (e.target.classList.value === "modal d-block") {
      
      dispatch(hide_modal());
    }
      }



  const handleChange = (e:any,index:any) =>{

    items[index].name = (e.target.value);

  }

  
  const addcolumn = () =>{

    const newItem: Item | any = {  };
    setItems([...items, newItem]);

  }
  const handle_delete = (id:any) =>{


    setItems((prevItems: any) => {
      const updatedItems = [...prevItems].filter((item: any) => item.id !== id);
      unregister(id);
      return updatedItems;

    });

  
  
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
                      placeholder="e.g Web Design"
                    /> <br/>
                 {errors.boardName && <p>{errors.boardName.message  as React.ReactNode}</p>}

                    <label htmlFor="columns">Board Columns</label>  <br/>


                    {items && items?.map((item:any,index:any) => (



                      <div className="parent-col d-flex align-items-center" key={index}>

                          <div>
                      
                          <>
                          <input
                          {...register(item.id || (item.id = nanoid()), { required: 'Column Name is required' })}
                          type="text"
                          id="boardName"
                          autoComplete="off"
                          defaultValue={item.name || ''}
                          onChange={(e) => handleChange(e, index)}
                          /> <br/>
                              
                          {errors.item && <p>{errors.item.message  as React.ReactNode}</p>}
                          </>
                      
                          </div>

                          <span className="x-icon"  onClick={(e) => handle_delete(item.id)}>&#x2716;</span>


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




