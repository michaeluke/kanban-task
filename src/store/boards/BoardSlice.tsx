import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import createBoard from '../../api/trelloapi'

//import the fn in the api

export interface BoardState {
  boards_counter: number,
  boards_array: string[] ,

  tasks: object[],
  show_boards_modal: boolean,
  Current_board:  Board | null  ;
  Current_columns : object[] |Column | any ,
  show_tasks_modal: boolean,
  Combinedarray : object[],
  event: boolean,
  first_columns :object[],

  
  empty: null ;

  anyBoardSelected : boolean
  BoardEmpty : boolean
  showeditboardmodal :boolean

  showEditTaskModal : boolean

  SelectedTask : Task | any ;
  lastboard:  Board | null  ;

  show_deletemodal : boolean,
}

export interface Board {
  id : string,
  name: string,
}


export interface Column {
  id : string,
  name: string,
}

export interface Task {
  id : string,
  name: string,

}




const initialState: BoardState = {
    boards_counter: 0,
    boards_array: [],
   
    tasks: [],
    show_boards_modal: false,
    Current_board : null,
    Current_columns : [],
    show_tasks_modal: false,
    Combinedarray :[],
    event : false,
    empty:null,
    anyBoardSelected: false,
    first_columns :[],
    BoardEmpty : false,

    showeditboardmodal : false,
    showEditTaskModal: false,

    SelectedTask : null,

    lastboard : null,

    show_deletemodal : false,
}

export const BoardSlice = createSlice({
  name: 'Boards',
  initialState,
  reducers: {


    show_modal: (state) => {
        state.show_boards_modal = true;
      },
    hide_modal: (state) => {
        state.show_boards_modal = false;
      },

    show_task_modal: (state) => {
        state.show_tasks_modal = true;
      },
    hide_task_modal: (state) => {
        state.show_tasks_modal = false;
      },

    show_editboardmodal: (state) => {
        state.showeditboardmodal = true;
      },
      
    hide_editboardmodal: (state) => {
        state.showeditboardmodal = false;
      },

    show_editTaskmodal: (state) => {
        state.showEditTaskModal = true;
      },
    hide_editTaskmodal: (state) => {
        state.showEditTaskModal = false;
      },

    show_deletemodal: (state) => {
        state.show_deletemodal = true;
      },
    hide_deletemodal: (state) => {
      state.show_deletemodal = false;
      },

    addBoard: (state, action) => {
      
      const { id, name } = action.payload;
      console.log(action.payload)
      state.boards_counter += 1
      const newBoard:any = {
        id: id, // unique ID 
        name: name,
        // column_name: column,
      };
      state.boards_array.push(newBoard);
   
    },

    GetBoards: (state, action) => {
   
      state.boards_array = action.payload
 
    },

    SetCurrentBoard: (state,action) => {

      state.Current_board = action.payload;

    },


    SetCurrentColumn: (state,action) => {

      state.Current_columns = action.payload;

    },


    SettColumnfirsttime: (state,action) => {

      state.first_columns = action.payload;

    },

    SetTasks: (state,action) => {
   
    
    state.tasks.push(action.payload)
     

    },
    ClearTasks:(state)=>{

      state.tasks = [];
    },

    set_combinedarray:(state, action)=>{

      state.Combinedarray = action.payload;
      
    },
    triggertaskaddedevent:(state)=>{

      state.event = !state.event;
    },

    Setboardselected: (state , action) => {
   
    
      state.anyBoardSelected = action.payload
       
  
      },

    BoardEmpty: (state , action) => {
   
    
        state.BoardEmpty = action.payload
         
    
      },

    BoardsCount: (state, action)=>{

      state.boards_counter = action.payload
    },

    SetSelectedTask: (state, action)=>{

      state.SelectedTask = action.payload;
    },

    SetLastBoard : (state,action)=>{
      state.lastboard = action.payload;
    },

   
  },
})



// Action creators are generated for each case reducer function
export const { show_modal, hide_modal ,show_deletemodal, hide_deletemodal ,show_task_modal, hide_task_modal ,addBoard , GetBoards , SetCurrentBoard , SetCurrentColumn , SetTasks , ClearTasks , set_combinedarray ,triggertaskaddedevent , Setboardselected , SettColumnfirsttime , BoardEmpty , BoardsCount , show_editboardmodal, hide_editboardmodal , show_editTaskmodal, hide_editTaskmodal,SetSelectedTask , SetLastBoard} = BoardSlice.actions

export default BoardSlice.reducer