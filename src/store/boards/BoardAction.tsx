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
import { Update_BoardName } from "../../api/trelloapi";
import { Delete_Column } from "../../api/trelloapi";
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

//set selected board
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
    store.dispatch(SetCurrentColumn(columns))
    debugger


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

 