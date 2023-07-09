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
import { color } from "@mui/system";

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

  const Current_Theme = useSelector((state: RootState) => state.Theme.Theme_mode)
  //true means darkmode
useEffect(() => {

const htmlElement = document.documentElement;
htmlElement.style.setProperty("--bg-color", Current_Theme === true ? "#20212C" : "#E4EBFA");
console.log(htmlElement.style);
}, [Current_Theme]);
useEffect(() => {

const htmlElement = document.documentElement;
htmlElement.style.setProperty("--text-color", Current_Theme === true ? "white" : "black");
// console.log(htmlElement.style);
}, [Current_Theme]);
  // const lastBoard = useSelector((state: RootState) => state.Boards.lastboard)
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

  const onSubmit = async(results:any) => {

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
    // debugger
        await createBoardAsync(boardname);
    
        setfirsttime(true);
    

   

    // debugger
   
     
  }

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
      
  
  

   

  useEffect(()=>{


    //console.log(ColumnsofBoard)
    
    setItems(initial_values)
    debugger
  },[initial_values])

  

    




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


                    <div className="topsec">
                    <label htmlFor="boardName">Name</label>  <br/>
                    <input
                      {...register("boardName", {required:  `Can't be empty`})}
                      type="text"
                      id="boardName"
                      autoComplete="off"
                      placeholder="e.g Web Design"
                   
                      style={{ borderColor: errors.boardName ? 'red' : '' }}
                    /> 
                
                    {errors.boardName && <p>{errors.boardName.message  as React.ReactNode}</p>}
                 
              

                 </div>
                    <label htmlFor="columns">Columns</label>  <br/>


                    {items && items?.map((item:any,index:any) => (

                    <>

                      <div className="parent-col d-flex align-items-center" key={item.id || (item.id = nanoid())}>

                    
                      
                         
                          <input
                          {...register(item.id || (item.id = nanoid()), { required: `Can't be empty` })}
                          type="text"
                          id="boardName"
                          autoComplete="off"
                          defaultValue={item.name || ''}
                          onChange={(e) => handleChange(e, index)}
                          style={{ borderColor: errors[item.id] ? 'red' : '' }}
                          /> 
                              
                              
                          
                     
                      
                          <span className="x-icon"  onClick={(e) => handle_delete(item.id)}>&#x2716;</span>


                      
                        </div>
                          <>
                          {errors[item.id] && <p id="error">{errors[item.id]?.message as React.ReactNode}</p>}
                          </>
                          </>
                    ))}
                    <br/>


                  <div className="parent-footer d-flex flex-column">

                  <button className="addcolumn" type="button" onClick={addcolumn}>+ Add New Column</button>


                  


      

                <button className="boardsubmit" type="submit">Create New Board</button>
                  </div>

              

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




