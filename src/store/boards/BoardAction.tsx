import {createBoard} from "../../api/trelloapi";
import { Get_Boards } from "../../api/trelloapi";
import { Board, BoardsCount, SetTasks, SettColumnfirsttime, addBoard } from "./BoardSlice";
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


//Creating a board
export const createBoardAsync = async (boardName: any) => {
    
    console.log("Action")
    
    await createBoard(boardName)
      .then((newBoard) => {
      
        store.dispatch(addBoard(newBoard));
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
    })
    .catch((error) => {
      console.error('Failed to get boards:', error);
    });

};

//get selected board
export const Get_Current_Board = (board:Board|null) => {

 console.log(board)


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
 export const createColumn = async (last_board:any ,column: string) => {
    


  console.log(last_board.name)


   await create_column(last_board.id,column)
   .then((column_added) => {
   
     // store.dispatch(addBoard(newBoard));
     console.log(column_added);


   })
   .catch((error) => {
     console.error('Failed to create board:', error);
   });

};


 
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

 