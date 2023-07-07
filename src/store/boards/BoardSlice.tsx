import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import createBoard from '../../api/trelloapi'

//import the fn in the api

export interface BoardState {
  boards_counter: number,
  boards_array: string[] ,
  columns: string[],
  tasks: object[],
  show_boards_modal: boolean,
  Current_board:  Board |null ;
  Current_columns : object[],
  show_tasks_modal: boolean,
  Combinedarray : object[],
  event: boolean,

  lastaddedBoard:  Board |null ;
  
  empty: null ;
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
  idList: string,

}

// export interface Column {
//   id : string,
//   name: string,
// }



const initialState: BoardState = {
    boards_counter: 0,
    boards_array: [],
    columns: [],
    tasks: [],
    show_boards_modal: false,
    Current_board : null,
    Current_columns : [],
    show_tasks_modal: false,
    Combinedarray :[],
    event : false,
    lastaddedBoard: null,
    empty:null,
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
      state.lastaddedBoard = newBoard
    },

    GetBoards: (state, action) => {
   
      state.boards_array = action.payload
 
    },

    SetCurrentBoard: (state,action) => {

      state.Current_board = action.payload;

    },

    ClearlastBoard: (state)=>{
      state.lastaddedBoard = state.empty;
    },

    SetCurrentColumn: (state,action) => {

      state.Current_columns = action.payload;

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

   
  },
})



// Action creators are generated for each case reducer function
export const { show_modal, hide_modal , show_task_modal, hide_task_modal ,addBoard , GetBoards , SetCurrentBoard , SetCurrentColumn , SetTasks , ClearTasks , set_combinedarray ,triggertaskaddedevent , ClearlastBoard} = BoardSlice.actions

export default BoardSlice.reducer