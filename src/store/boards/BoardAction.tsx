import {SelectTask, UpdateTask, createBoard} from "../../api/trelloapi";
import { Get_Boards } from "../../api/trelloapi";
import { Board, BoardsCount, SetLastBoard, SetSelectedTask, SetTasks, SettColumnfirsttime, addBoard, show_editTaskmodal } from "./BoardSlice";
import { store } from '../store';
import { GetBoards } from "./BoardSlice";
import { SetCurrentBoard } from "./BoardSlice";
import { Delete_Boards } from "../../api/trelloapi";
import { GetColumnsofBoard } from "../../api/trelloapi";
import { SetCurrentColumn } from "./BoardSlice";
import { Add_Task } from "../../api/trelloapi";
import { Get_Tasks } from "../../api/trelloapi";
import { triggertaskaddedevent } from "./BoardSlice";
import { create_column } from "../../api/trelloapi";
import { Update_BoardName } from "../../api/trelloapi";
import { Delete_Column } from "../../api/trelloapi";
import { Set_FirstBoard } from "./BoardSlice";
import type { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
//Creating a board
export const createBoardAsync = async (boardName: any) => {
    
    console.log("Action")
    
    await createBoard(boardName)
      .then((newBoard) => {
        debugger
        store.dispatch(addBoard(newBoard));
        GetBoardsAsync();
      })
      .catch((error) => {
        console.error('Failed to create board:', error);
      });

};


//get all boards
export const GetBoardsAsync = async() => {
    
  console.log("Get");
  await Get_Boards()
    .then((Boards) => {
      console.log("inside");
      console.log(Boards)
     
      store.dispatch(GetBoards(Boards));
      store.dispatch(BoardsCount(Boards.length));
      // if(Boards.length==0){
      //   store.dispatch(SetCurrentBoard(null))
      //   store.dispatch(Set_FirstBoard(null))
      // }
    })
    .catch((error) => {
      console.error('Failed to get boards:', error);
    });

};

//set selected board
export const SetFirstBoard = (board:Board|null) => {

 console.log(board)


  store.dispatch(Set_FirstBoard(board))


}
export const Get_Current_Board = (board:Board|null) => {

  console.log(board)
 
 debugger
   store.dispatch(SetCurrentBoard(board))
 
 
 }
 


//view selected board by retrieving it's column
export const View_Current_Board = (board:Board|null) => {

  // console.log(board)
  if(board){
  GetColumnsofBoard(board.id)
  .then((columns) => {
    console.log("inside column");
    console.log(columns)
    store.dispatch(SetCurrentColumn(columns))
    

  })
  .catch((error) => {
    console.error('Failed to get boards:', error);
  });
}
 
 }


 

 //Update Board's Name
export const UpdateBoardName = (BoardId:string, NewName:any) => {



  debugger
    // console.log(board.id)
    Update_BoardName(BoardId , NewName)
    .then((board) => {
      store.dispatch(SetCurrentBoard(board))
      Get_Boards()
    .then((Boards) => {
      console.log("inside");
      console.log(Boards)
      store.dispatch(GetBoards(Boards));
      store.dispatch(BoardsCount(Boards.length));

    })
    .catch((error) => {
      console.error('Failed update all boards:', error);
    });
    })
    .catch((error) => {
      console.error('Failed to update board:', error);
    });


  
  

 
 }

 export const DeleteColumn = (currentboard:any,ListID:any) =>{


 // console.log(board.id)
 Delete_Column(ListID)
 .then(() => {
   store.dispatch(SetCurrentBoard(currentboard))
  })
  .catch((error) => {
   console.error('Failed to delete column', error);
 });
  
 }

 //delete selected board
export const Delete_Board = (board:Board|null) => {

  if(board){

    console.log(board.id)
    Delete_Boards(board.id)
    .then(() => {
    Get_Boards()
    .then((Boards) => {
      console.log("inside");
      console.log(Boards)
      store.dispatch(GetBoards(Boards));

      if(Boards.length == 0){
       
        store.dispatch(Set_FirstBoard(null))
        store.dispatch(SetCurrentBoard(null))
      }
      if(Boards.length != 0){
        store.dispatch(SetCurrentBoard(Boards[0]))
        GetColumnsofBoard(Boards[0].id)
      
      }
     
      store.dispatch(BoardsCount(Boards.length));

    })
    .catch((error) => {
      console.error('Failed to get boards:', error);
    });
    })
    .catch((error) => {
      console.error('Failed to get boards:', error);
    });


  }
  

 
 }

 //Create Column
 export const createColumn = async (selected_board:any ,column: string) => {
    


  // console.log(last_board.name)


   await create_column(selected_board.id,column)
  .then(() => {
   
     // store.dispatch(addBoard(newBoard));
  GetColumnsofBoard(selected_board.id)
  .then((columns) => {
    console.log("inside column");
    console.log(columns)
    //here fix
    //if this is the first column ==> show columns else don't view them
 
    // store.dispatch(SetCurrentColumn(columns))
  
    // if(Boards.length <= 1){
    //   store.dispatch(SetCurrentBoard(Boards[0]))
    
    // }
    // if(Boardcount ==1){
    //   console.log(Boardcount)
    //   debugger
    //   store.dispatch(SetCurrentColumn(columns))
    // }
    // else{

    //   console.log(Boardcount)
    //   debugger
    //   store.dispatch(SetCurrentColumn(columns))
    // }



   })
   .catch((error) => {
     console.error('Failed to get columns', error);
   });

  }) 
  .catch((error) => {
    console.error('Failed to create column', error);
  });

}



 
 //creating a task in a list
export const Create_Task = (Title:string, Desc: string , Listid:string) => {

  

  
     Add_Task(Title , Desc , Listid)
    .then(() => {
    
      store.dispatch(triggertaskaddedevent())
      console.log("success added task")
 
    })
    .catch((error) => {
      console.error('Failed to add Task:', error);
    });

 }


 //retrieve tasks in a list
 export async function Get_Tasks_In_A_List(ListID:string){


  // console.log(ListID)
  Get_Tasks(ListID)
  .then((tasks) => {

    
  
    
  
    if(Array.isArray(tasks)){
     
      tasks.forEach((task:any) => {
     
        // console.log(task)
        store.dispatch(SetTasks(task))
        
  
      });
    }

    else{

      store.dispatch(SetTasks([]))
    }
  
 
   
   

  })
  .catch((error) => {
    console.error('Failed to fetch Tasks:', error);
  });



 }


 //select task to edit

 export const Select_Task= (taskid:any)=>{



  SelectTask(taskid)
  .then((task) => {

    store.dispatch(SetSelectedTask(task))
    store.dispatch(show_editTaskmodal())
 })
 .catch((error) => {
  console.error('Failed to get task', error);
});

}



  //creating a task in a list
export const Update_Task = (taskid:string ,Title:string, Desc: string , Listid:string) => {

  
  UpdateTask(taskid,Title , Desc , Listid)
 .then(() => {
 
  //
   store.dispatch(triggertaskaddedevent())
   console.log("success added task")

 })
 .catch((error) => {
   console.error('Failed to add Task:', error);
 });

}
