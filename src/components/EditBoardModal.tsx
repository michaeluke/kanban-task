import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import "./style/modal.css";
import { Board, hide_editboardmodal} from "../store/boards/BoardSlice";
import { useForm } from "react-hook-form";
import {addBoard} from "../store/boards/BoardSlice"
import { createBoardAsync } from "../store/boards/BoardAction";
import { createColumn } from "../store/boards/BoardAction";
import { GetBoardsAsync } from "../store/boards/BoardAction";
import { BoardEmpty } from "../store/boards/BoardSlice";

interface Item {
  name: string;
}

export default function EditBoard() {

const Modal_view = useSelector( (state: RootState) => state.Boards.showeditboardmodal);
 

  const [first_time, setfirsttime] = useState(false)
  const dispatch = useDispatch();
  
  const SelectedBoard = useSelector((state: RootState) => state.Boards.Current_board)



  const [array_state, setarray] = useState<any>([])

//   const Boards = useSelector((state: RootState) => state.Boards.boards_array)


  const ColumnsofBoard = useSelector((state: RootState) => state.Boards.Current_columns)
  var columnsarray: any[] = [];

;
  const [items, setItems] = useState<Item[]|object[]|any>([{ }]);

  const { register, handleSubmit  , reset, formState: { errors }, unregister , setValue} = useForm();
  
  //re-render whenver a new board is selected
  useEffect(()=>{


    console.log(ColumnsofBoard)
    
    setItems(ColumnsofBoard)
    debugger
  },[ColumnsofBoard])

  useEffect(() => {
    if(SelectedBoard){

        setValue('boardName' , SelectedBoard.name); 
    }

    if(ColumnsofBoard){

        ColumnsofBoard.forEach((column:any , index:any)=>{
            setValue(`column${index}`, column.name);

            
        })
    }

  }, []);

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

    debugger


    // setfirsttime(true);

  };

  
 useEffect(()=>{
 
  const go =()=>{

    if(first_time){
 
    
    // setarr(lastBoard)
    debugger
    //here
    if(array_state.length>0 && SelectedBoard){
  
      debugger
    
      //call on create column
      array_state?.map((column_name:any) => (
       
    
        
        createColumn(SelectedBoard, column_name)
        
  
      ))
  
      // dispatch(BoardEmpty(false))
      dispatch(hide_editboardmodal());
      }

      else{
        dispatch(hide_editboardmodal());
      }
    }
     
  }

  go();

 },[onSubmit])
    




  const handle_Click = (e:any) =>{
    // console.log(e.target.classList.value )
  
    if (e.target.classList.value === "modal d-block") {
      
      dispatch(hide_editboardmodal());
    }
      }



  const handleChange = (e:any,index:any) =>{

    items[index].name = (e.target.value);

  }

  
  const addcolumn = () =>{

    const newItem: Item | any = {  };
    setItems([...items, newItem]);

  }
  const handle_delete = (index:any) =>{

    setItems((prevItems:any) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });


    
    unregister(`column${index}`)
  debugger
  }

  function editboardname(newbardname:any) {
    var newValue = newbardname;
    console.log("Current value:", newValue);
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
                    Edit Board
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
                      defaultValue={SelectedBoard?.name}
                      onInput={(event: React.ChangeEvent<HTMLInputElement>)=> editboardname(event.target.value) }
                    /> <br/>
                 {errors.boardName && <p>{errors.boardName.message  as React.ReactNode}</p>}

                    <label htmlFor="columns">Board Columns</label>  <br/>


                    {items&& items?.map((item:any,index:any) => (



                        <div className="parent-col d-flex align-items-center" key={index}>

                            <div>
                            <input
                            {...register(`column${index}` , {required: 'Column Name is required'})}
                            type="text"
                            id="boardName"
                            autoComplete="off"
                            defaultValue={item.name}
                            onChange={(e) => handleChange(e, index)}
                            /> <br/>
                          
                            {errors.item && <p>{errors.item.message  as React.ReactNode}</p>}
                            </div>

                            <span className="x-icon"  onClick={(e) => handle_delete(index)}>&#x2716;</span>


                        </div>
                    ))}
                    <br/>

                <button type="button" onClick={addcolumn}>+ Add New Column</button>
      

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




