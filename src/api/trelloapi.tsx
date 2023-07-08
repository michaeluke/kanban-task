import React, { useEffect } from 'react';



//api create board
export const createBoard = async (boardName:any) => {
console.log("Api")

      try {
        // Create a board
        const createBoardUrl = 'https://api.trello.com/1/boards';
        const boardResponse = await fetch(createBoardUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          
          body: JSON.stringify({
            name: boardName,
            defaultLists: false,
            key: '3bc3c8703911d1c11ab4e6ea963976b7',
            token: 'ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609'
          })
        });
        
        const boardData = await boardResponse.json();
        return boardData
       
      } catch (error) {
        console.error('Failed to create board, columns, and cards.', error);
      }
    };

    //api create a column in a board
export const create_column = async (boardID:any , columnName:any) => {
  console.log("Api")
  
        try {
          // Create a board
          const createBoardUrl = `https://api.trello.com/1/boards/${boardID}/lists?name=${columnName}&key=3bc3c8703911d1c11ab4e6ea963976b7&token=ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609`;
          const boardResponse = await fetch(createBoardUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const boardData = await boardResponse.json();
          return boardData
         
        } catch (error) {
          console.error('Failed to create board, columns, and cards.', error);
        }
      };
  



    //api retrieve all boards
    export const Get_Boards = async () => {
      console.log("Api")
      
            try {
              // Get Boards
              const getBoardsUrl = 'https://api.trello.com/1/members/me/boards?key=3bc3c8703911d1c11ab4e6ea963976b7&token=ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609';
              const boardsResponse = await fetch(getBoardsUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
              
              const boards = await boardsResponse.json();
              return boards
            } catch (error) {
              console.error('Failed to get boards, columns, and cards.', error);
            }
          };
      
    //api for updating a board
          export const Update_Board = async (boardID:string) =>{





            
          }





    //api delete selected board
          export const Delete_Boards = async (boardID:string) => {
            console.log("Api")
            
                  try {
                    // Get Boards 
                    const getBoardsUrl = `https://api.trello.com/1/boards/${boardID}?key=3bc3c8703911d1c11ab4e6ea963976b7&token=ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609`;
                    const boardsResponse = await fetch(getBoardsUrl, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    });
                    
                    

                    return null
                 
                  } catch (error) {
                    console.error('Failed to delete boards, columns, and cards.', error);
                  }
                };

                
        //api retrieve columns in a board
      export const GetColumnsofBoard = async (boardID:string) => {
        console.log("getcolumns")
        
            try {
              // Get Boards
              const getBoardsUrl = `https://api.trello.com/1/boards/${boardID}/lists?key=3bc3c8703911d1c11ab4e6ea963976b7&token=ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609`;
              const ListsResponse = await fetch(getBoardsUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
              
              const columns = await ListsResponse.json();
              return columns
            } catch (error) {
              console.error('Failed to delete boards, columns, and cards.', error);
            }
          };


          //create task in a certain column
          export const Add_Task = async (Task_Name:string, Desc:string, Listid:string) => {
             // Create cards
                const createTasksUrl = 'https://api.trello.com/1/cards';
                const TaskName = Task_Name;
             
                  await fetch(createTasksUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      name: TaskName,
                      idList: Listid,
                      key: '3bc3c8703911d1c11ab4e6ea963976b7',
                      token: 'ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609'
                    })
                  });
                
              }


              //api retrieve tasks in a list
              export const Get_Tasks = async (ListID:string) =>{

                try {
                  // Get Boards
                  const getBoardsUrl = `https://api.trello.com/1/lists/${ListID}/cards?key=3bc3c8703911d1c11ab4e6ea963976b7&token=ATTA8d1cb535c9ef354bb3c7d4cf10b37e9de606909fb9ac55ce026d7c3233c12942C5B95609`;
                  const ListsResponse = await fetch(getBoardsUrl, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                  })
                  const tasks = await ListsResponse.json();
                  if(tasks.length ==0){
                    return null;
                  }
                  else{
                    return tasks
                  }
                 
                } catch (error) {
                  console.error('Failed to get tasks', error);
                }
              };

              
         
          
      

export default createBoard;
