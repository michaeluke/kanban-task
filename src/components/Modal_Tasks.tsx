import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import "./style/modal.css";
import { useForm } from "react-hook-form";
import {hide_task_modal } from "../store/boards/BoardSlice";
import { Create_Task } from "../store/boards/BoardAction";
export default function TasksModal() {


  const CurrentColumns = useSelector((state: RootState) => state.Boards.Current_columns)

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  
  const onSubmit = (results:any) => {
    console.log(results.Title , results.Description , results.ListID)
    // console.log(results.Title , results.Description , results.status)
    Create_Task(results.Title , results.Description , results.ListID)
    dispatch(hide_task_modal());
  };


  const Task_Modal_view = useSelector(
    (state: RootState) => state.Boards.show_tasks_modal
  );

  
  const handle_Click = (e:any) =>{
    console.log(e.target.classList.value)
    if (e.target.classList.value === "modal d-block") {
      
      dispatch(hide_task_modal());
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
                    Add New Task
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
                    /> <br/>
                 {errors.Title && <p>{errors.Title.message  as React.ReactNode}</p>}


                    <label htmlFor="Desc">Description</label>  <br/>
                    <input {...register("Description", {required: 'Description is required'})}
                     type="text" id="Desc"   autoComplete="off" /> <br/>
                  {errors.Description && <p>{errors.Description.message  as React.ReactNode}</p>}


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




