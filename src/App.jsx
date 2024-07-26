import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './todo/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLs = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAdd = () => {
    if (todo.trim()) {
      if (isEditing) {
        const editedTodo = { id: currentTodoId, text: todo, isCompleted: false };
        const updatedTodos = todos.map((todo) => (todo.id === currentTodoId ? editedTodo : todo));
        setTodos(updatedTodos);
        saveToLs(updatedTodos);
        setIsEditing(false);
        setCurrentTodoId(null);
      } else {
        const newTodo = { id: uuidv4(), text: todo, isCompleted: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        saveToLs(updatedTodos);
      }
      setTodo("");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentTodoId(item.id);
    setTodo(item.text);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="container w-full mx-auto my-4 bg-slate-400 text-black p-4 rounded-xl min-h-[80vh] grid justify-items-center">
        <div className="punchline underline grid justify-items-center text-4xl font-bold hover:cursor-pointer hover:font-extrabold my-4 sm:text-3xl">
          Todo List
        </div>
        <div className="adtodo w-full">
          <h2 className='font-bold text-xl sm:text-lg'>Add new todo ....</h2>
          <div className="third flex flex-col items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className='bg-slate-300 my-2 rounded-lg border-sky-200 border-spacing-x-7 p-2 w-full'
            />
            <button onClick={handleAdd}>
              <span className="material-symbols-outlined bg-slate-800 rounded-2xl text-white font-semibold mx-4 p-2 hover:bg-slate-950 hover:p-3">
                note_add
              </span>
            </button>
          </div>
        </div>

        <h2 className='text-4xl font-bold grid justify-items-center sm:text-lg'>Your todos</h2>
        <div className="boxx grid justify-items-center w-full">
          <div className="todos flex flex-col items-center w-full">
            {todos.length === 0 && <div>There are no todos</div>}
            {todos.map((item) => (
              <div key={item.id} className="showtodo flex flex-col items-center my-4">
                <input className='w-4 sm:w-6'
                  onChange={() => handleCheck(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                  name={item.id}
                />
                <div className="boxe w-full">
                  <div className={item.isCompleted ? "line-through" : ""} id='blue'>
                    {item.text}
                  </div>
                </div>
                <div className="buttons flex flex-col items-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="add bg-slate-800 rounded-2xl text-white font-semibold mx-7 p-2 hover:bg-slate-950 hover:p-3 sm:mx-2 sm:p-2"
                  >
                    <span className="material-symbols-outlined">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete bg-slate-800 rounded-2xl text-white font-semibold p-2 hover:bg-slate-950 hover:p-3 sm:mx-2 sm:p-2"
                  >
                    <span className="material-symbols-outlined">
                      delete_forever
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
