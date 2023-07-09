import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import "./style/modal.css";
import { Board, hide_editboardmodal} from "../store/boards/BoardSlice";
import { useForm } from "react-hook-form";
import {addBoard} from "../store/boards/BoardSlice"
import { DeleteColumn, Get_Current_Board, createBoardAsync } from "../store/boards/BoardAction";
import { createColumn } from "../store/boards/BoardAction";
import { GetBoardsAsync } from "../store/boards/BoardAction";
import { BoardEmpty } from "../store/boards/BoardSlice";
import { nanoid } from 'nanoid';
import { UpdateBoardName } from "../store/boards/BoardAction";
interface Item {
  id: string
  name: string;
}

export default function EditBoard() {

const Modal_view = useSelector( (state: RootState) => state.Boards.showeditboardmodal);
 

  const [first_time, setfirsttime] = useState(false)
  const [first, setfirst] = useState(true)
  const dispatch = useDispatch();
  
  var SelectedBoard = useSelector((state: RootState) => state.Boards.Current_board)

  const firstBoard = useSelector((state: RootState) => state.Boards.firstBoard)

  const [array_state, setarray] = useState<any>([])

//   const Boards = useSelector((state: RootState) => state.Boards.boards_array)

    const [deletedIndex, setDeletedIndex] = useState(null);

  const ColumnsofBoard = useSelector((state: RootState) => state.Boards.Current_columns)
  var columnsarray: any[] = [];

;
//   const [items, setItems] = useState<Item[]|object[]|any>([{ }]);
 const [items, setItems] = useState<Item[]|any>([{ }]);
  const { register, handleSubmit  , reset, formState: { errors }, unregister , setValue} = useForm();
  
  //re-render whenver a new board is selected

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
  
  useEffect(()=>{


    console.log(ColumnsofBoard)

    
    setItems(ColumnsofBoard)
    debugger
  },[ColumnsofBoard])

  useEffect(() => {
 
    if(SelectedBoard){

        setValue('boardName' , SelectedBoard.name); 
        setfirst(false)
    }

    if(ColumnsofBoard){

        ColumnsofBoard.forEach((column:any , index:any)=>{
            setValue(column.id, column.name);
            setfirst(false)
        })
    }

  }, []);




  const onSubmit = async (results:any) => {

  const values_array = Object.values(results);

    // console.log( values_array + "ok" )

     
    //i = 2 to skip first the boardname [0] and [1] unique id doesnt have a value.
      for(var i = 2 ; i < values_array.length ;i++){

      columnsarray.push(values_array[i]);

    }
    const boardname = values_array[0];
    console.log(boardname +"board name")
    console.log(columnsarray +"column values")
    setarray(columnsarray);

    
    if(SelectedBoard){

        //if boardname doesnt match edit board name
        // if(SelectedBoard.name != boardname){
        //     const BoardId = SelectedBoard.id
            debugger
            UpdateBoardName(SelectedBoard.id , boardname);
        // }
     

    
        if(ColumnsofBoard != columnsarray){

            var longer_array = []
            debugger
            //for every column in columnsarray but not in columnsofBoard ==> Add column 
            //foe every column in ColumnsofBoard but not in columns array ==> Delete column

            if(ColumnsofBoard.length > columnsarray.length){

                longer_array = ColumnsofBoard

            }
            else{
                longer_array = columnsarray
            }

            for( var i =0 ;i<longer_array.length; i++){


                console.log(columnsarray[i])
                console.log(ColumnsofBoard[i])
                debugger
                //if both arrays have element values..
            if(columnsarray[i] && ColumnsofBoard[i]){

                //if values are equal ==> do nothing
                if (columnsarray[i] === ColumnsofBoard[i].name) {

                 //do nothing
                }
                //if they don't match create new column with new value and delete old column
                else{
                    createColumn(SelectedBoard, columnsarray[i])
                    DeleteColumn(SelectedBoard, ColumnsofBoard[i].id) 
                }

            }

            //if number of new columns > old column ==> create new column
            if(columnsarray[i] && !ColumnsofBoard[i]){

                    createColumn(SelectedBoard, columnsarray[i])
    
            }

              //if number of new columns < old columns ==> delete old column
              if(ColumnsofBoard[i] && !columnsarray[i]){
                DeleteColumn(SelectedBoard, ColumnsofBoard[i].id) 
        }

    }
         
                }

     

        dispatch(hide_editboardmodal())
    }
  
    
  };



  const handle_Click = (e:any) =>{
    // console.log(e.target.classList.value )
  
    if (e.target.classList.value === "modal d-block") {
      
      dispatch(hide_editboardmodal());
    }
      }



  const handleChange = (e:any,index:any) =>{

   
  
    const newarray = [...items]; // Create a copy of the items array
    newarray[index] = { ...newarray[index], name: e.target.value }; 
    console.log(newarray)
    setItems(newarray); // Update the state with the modified array

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
                  <div className="topsec">

                    <label htmlFor="boardName">Board Name</label>  <br/>
                   
                    <input
                      {...register("boardName", {required: `Can't be empty`})}
                      type="text"
                      id="boardName"
                      autoComplete="off"
                      defaultValue={SelectedBoard?.name}
                      style={{ borderColor: errors.boardName ? 'red' : '' }}
                      onInput={(event: React.ChangeEvent<HTMLInputElement>)=> editboardname(event.target.value) }
                    /> <br/>
                 {errors.boardName && <p>{errors.boardName.message  as React.ReactNode}</p>}

                 </div>
                    <label htmlFor="columns">Board Columns</label>  <br/>


                    {items&& items?.map((item:any,index:any) => (


                            <>
                        <div className="parent-col d-flex align-items-center" key={index}>

                           
                         
                        
                            <input
                            {...register(item.id || (item.id = nanoid()), { required: `Can't be empty` })}
                            type="text"
                            id="boardName"
                            autoComplete="off"
                            defaultValue={item.name}
                            onChange={(e) => handleChange(e, index)}
                            /> <br/>
                          
                        

                            <span className="x-icon"  onClick={(e) => handle_delete(item.id)}>&#x2716;</span>


                        </div>
                         <>
                         {errors[item.id] && <p id="error">{errors[item.id]?.message as React.ReactNode}</p>}
                         </>
                         </>
                    ))}
                    <br/>

                
      

                    <div className="parent-footer d-flex flex-column">

                    <button  className="addcolumn" type="button" onClick={addcolumn}>+ Add New Column</button>






                    <button className="boardsubmit" type="submit">Save Changes</button>
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




