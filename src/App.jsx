
import { useState, useEffect } from 'react';
import List from './List';
import Search from './Search';
import { div } from 'motion/react-client';

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const sampleTodos = [
  {
    id: '1',
    title: "Morning Workout",
    description: "Complete 30 minutes of cardio and stretching exercises.",
    date: "30-6-2026",
    completed: true,
  },
  {
    id: '2',
    title: "Buy Groceries",
    description: "Purchase milk, eggs, vegetables, and fruits from the market.",
    date: "30-6-2026",
    completed: false,
  },


];



const App = () => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const [id, setId] = useState(null)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fullDate = `${day}-${month + 1}-${year}`;

  const handleDelete = (todoId) => {

    const updateT = todos.filter((todo) => todo.id !== todoId);
    setTodos(updateT)
  }

  const handleComplete = (todoId) => {

    const updated = todos.map((todo) => {
      if (todo.id === todoId)
        return {
          ...todo,
          completed: !todo.completed,
        }
      return todo;
    })
    setTodos(updated)
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      date: fullDate,
      completed: false,
    }

    setTodos((previous) => {
      return [...previous, newTodo]

    })

    setTitle("");
    setDescription("");


  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('Todos'));

    if (stored) {
      setTodos(stored);
    } else {
      setTodos(sampleTodos);
      localStorage.setItem("Todos", JSON.stringify(sampleTodos));
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos))
    console.log(todos);

  }, [todos]);

  const filteredT = todos.filter((todo) => todo.title.toLowerCase().includes(searchQ.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQ.toLowerCase())

  )

  return (<>
    <div

      className='flex md:flex-row flex-col items-center p-3  gap-3 w-full'>
      <form onSubmit={handleSubmit}
        className='  rounded-lg text-black md:h-screen md:w-150 bg-white  flex flex-col gap-4 p-4'

      >

        <h1 className='text-3xl  font-semibold  text-center'>Todo -<br /> "Your Personal Task Manager" </h1>


        <input value={title} onChange={(e) => setTitle(e.target.value)}
          type="text" required
          placeholder='Title' aria-required
          className='w-auto p-2 
            hover:border-gray-700 border-gray-300 focus:border-green-300 
            outline-0 hover:border-2 border-2 text-black rounded-md' />



        <textarea value={description}
          onChange={(e) => setDescription(e.target.value)} required
          type="text" aria-required
          placeholder='Description'
          className='w-auto p-2 hover:border-gray-700 md:h-70 border-gray-300 focus:border-green-300 outline-0 hover:border-2 border-2 rounded-md text-black ' />

        <button className="bg-red-400 text-white p-2 rounded-xl hover:rounded-full transition-all duration-200 ease-in-out">
          Submit
        </button>
      </form>



      <div className="bg-white w-110 p-1 rounded-lg  md:h-screen md:w-screen scrollbar-none overflow-hidden overflow-y-scroll ">
        <h1 className='sticky top-0 bg-amber-200 py-4 px-3  rounded-xl  font-bold text-3xl text-center' >Some Improtant Stufff</h1>
        <Search onSearch={setSearchQ}></Search>
        <div
          // className="lists flex flex-row flex-wrap
          // gap-3 h-100 
          //  mt-3 md:h-screen "
          className=' grid p-1 gap-2 overflow-hidden h-full place-content-center md:h-fit mt-2 md:grid-cols-2 lg:grid-cols-3 scrollbar-none overflow-y-scroll   '
        >



          {filteredT.length === 0 ? (
            <div>
              <h1 className='text-3xl text-gray-300 p-4 font-medium'>Nothing here to Show :-)</h1>
            </div>
          )
            : (filteredT.map((list) => {
              return (
                <List handledelete={() => handleDelete(list.id)}
                  key={list.id}
                  title={list.title}
                  description={list.description}
                  date={list.date}
                  completed={list.completed}
                  completeFun={() => handleComplete(list.id)}
                ></List>)
            })

            )

          }



        </div>


      </div>


    </div>
  </>
  )
}

export default App 