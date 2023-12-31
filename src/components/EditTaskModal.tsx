import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import "./style/modal.css";
import { useForm } from "react-hook-form";
import {hide_editTaskmodal, hide_task_modal } from "../store/boards/BoardSlice";
import { Create_Task, Update_Task } from "../store/boards/BoardAction";


export default function EditTaskModal() {

  const SelectedTask = useSelector((state: RootState) => state.Boards.SelectedTask)
  const CurrentColumns = useSelector((state: RootState) => state.Boards.Current_columns)

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const myStateRef = useRef(SelectedTask);

  const Current_Theme = useSelector((state: RootState) => state.Theme.Theme_mode)
  //true means darkmode
useEffect(() => {

const htmlElement = document.documentElement;
htmlElement.style.setProperty("--bg-color", Current_Theme === true ? "#20212C" : "white");
console.log(htmlElement.style);
}, [Current_Theme]);
useEffect(() => {

const htmlElement = document.documentElement;
htmlElement.style.setProperty("--text-color", Current_Theme === true ? "white" : "black");
// console.log(htmlElement.style);
}, [Current_Theme]);
//   useEffect(()=>{


    
//     myStateRef.current = SelectedTask
//     debugger


//   },[SelectedTask])
  
  const onSubmit = (results:any) => {
    console.log(results.Title , results.ListID)
    // console.log(results.Title , results.Description , results.status)
    Update_Task(SelectedTask.id, results.Title , results.ListID)
    dispatch(hide_editTaskmodal());
  };


  const Task_Modal_view = useSelector(
    (state: RootState) => state.Boards.showEditTaskModal
  );

  
  const handle_Click = (e:any) =>{
    console.log(e.target.classList.value)
    if (e.target.classList.value === "modal d-block") {
      
      dispatch(hide_editTaskmodal());
    }
      }

  return (
    <>
      {Task_Modal_view && (
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
                    Edit Task
                  </h5>
                </div>
                <div className="modal-body">

                  <form onSubmit={handleSubmit(onSubmit)}>


                    <label htmlFor="Title">Title</label>  <br/>
                    <input
                      {...register("Title", {required: 'Title is required'})}
                      type="text"
                      id="Title"
                      autoComplete="off"
                      defaultValue={SelectedTask?.name}
                    /> <br/>
                 {errors.Title && <p>{errors.Title.message  as React.ReactNode}</p>}

{/* 
                    <label htmlFor="Desc">Description</label>  <br/>
                    <input {...register("Description", {required: 'Description is required'})}
                     type="text" id="Desc"   autoComplete="off" /> <br/>
                  {errors.Description && <p>{errors.Description.message  as React.ReactNode}</p>} */}


                  <label htmlFor="current_status " className='labels'>Current Status:</label> <br/>
       
                <select id="Status"  {...register('ListID', { required: 'Group name is required' })}>
                    
                

                    {CurrentColumns && CurrentColumns?.map((column:any) => (
        
                        <>
                    
                    <option  key={column.id}  value={`${column.id}`}>&nbsp; {column.name}</option>
                  
      
                       </>
        
                    ))}
                </select> <br/>
                {errors.ListID && (
                <p>{errors.ListID.message  as React.ReactNode}</p>
                )}


                <button className="tasksubmit" type="submit">Save Changes</button>

                  </form>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

}




