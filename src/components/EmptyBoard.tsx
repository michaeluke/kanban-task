import './style/Header.css'


export default function EmptyBoard(){






    return(


        <>

        <div className="d-flex flex-column align-items-center justify-content-center mt-5">


        <p className='empty'> This board is empty. Create a new column to get started.</p>

        <div> <button className="add-col-btn">Add New Column</button> 
        </div>
       

        </div>
        </>
    )
}