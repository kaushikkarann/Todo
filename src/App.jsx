import React, { use, useDebugValue } from 'react'
import {useState,useEffect} from 'react';
import List from './List';


const date=new Date();
const month=date.getMonth();
const day=date.getDate();
const year=date.getFullYear();
const sampleTodos = [
  {   
    
    title: "Morning Workout",
    description: "Complete 30 minutes of cardio and stretching exercises.",
    date: "30-6-2026",
    completed:true,
  },
  { 
    title: "Buy Groceries",
    description: "Purchase milk, eggs, vegetables, and fruits from the market.",
    date: "30-6-2026",
    completed:false,
  },
  

];



const App = () => {
  const [todos,setTodos]=useState([]);
  const [completed,setCompleted]=useState(false);

  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  
  const fullDate=`${day}-${month+1}-${year}`;
  
  const handleDelete=(index)=>{

    const updateT=todos.filter((todo,i)=> i !== index  );
    setTodos(updateT)
  }
  
const handleComplete=(index)=>{

const updated=todos.map((todo,i)=>{
if(i===index)
  return{
...todo,
completed:!todo.completed,
}
return todo;
})
setTodos(updated)
}


  const handleSubmit=(e)=>{
    e.preventDefault();
    
    
    const newTodo={
    
      title:title,
      description:description,
      date:fullDate,
      completed:false,
    }
    
    setTodos((previous)=>{
      return [...previous,newTodo]
      
    })
    
    setTitle("");
    setDescription("");
    
    
  }

  useEffect(()=>{
    const stored=JSON.parse(localStorage.getItem('Todos'));

    if(stored){
      setTodos(stored);
    }else{
      setTodos(sampleTodos);
      localStorage.setItem("Todos",JSON.stringify(sampleTodos));
    }
  },[])
  

useEffect(()=>{
  localStorage.setItem("Todos",JSON.stringify(todos))
},[todos]) ; 


  
  return ( <>
    <div
   
    className='flex md:flex-row flex-col items-center p-3  gap-3 w-full'>
       <form onSubmit={handleSubmit}
        className='  rounded-lg text-black md:h-screen md:w-150 bg-white w-100 flex flex-col gap-4 p-4'
        
        >

        <h1 className='text-3xl  font-semibold  text-center'>Todo -<br /> "Your Personal Task Manager" </h1>
          
          
          <input  value={title} onChange={(e)=>setTitle(e.target.value)}  
           type="text" required
           placeholder='Title' aria-required
           className='w-auto p-2 
            hover:border-gray-700 border-gray-300 focus:border-green-300 
            outline-0 hover:border-2 border-2 text-black rounded-md' />
        
       
       
          <textarea value={description} 
           onChange={(e)=>setDescription(e.target.value)} required
           type="text" aria-required
           placeholder='Description'
           className='w-auto p-2 hover:border-gray-700 md:h-70 border-gray-300 focus:border-green-300 outline-0 hover:border-2 border-2 rounded-md text-black ' />
        
       <button className="bg-red-400 text-white p-2 rounded-xl hover:rounded-full transition-all duration-200 ease-in-out">
  Submit
</button>
      </form>



<div className="bg-white p-1 rounded-lg  md:h-screen md:w-screen scrollbar-none overflow-hidden overflow-y-scroll ">
  
<h1 className='sticky top-0 bg-amber-200 py-4 px-3  rounded-xl  font-bold text-3xl text-center' >Some Improtant Stufff</h1>
<div 
// className="lists flex flex-row flex-wrap
// gap-3 h-100 
//  mt-3 md:h-screen "
 className=' grid p-1 gap-2 overflow-hidden h-100 md:h-fit mt-2 md:grid-cols-2 lg:grid-cols-3 scrollbar-none overflow-y-scroll   '
 >

{todos.map((list,index)=>{
  return (
    <List handledelete={()=>handleDelete(index)} 
    key={index} 
    title={list.title}
    description={list.description} 
    date={list.date}
    completed={list.completed}
    completeFun={()=>handleComplete(index)}
    ></List>
  )
})} 

</div>

      
</div>


</div>
    </>
  )
}

export default App 