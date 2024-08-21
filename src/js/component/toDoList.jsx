import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const ToDoList = () => {
    const [task, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([])

    // Fetch para obtener los usuarios cuando se crea el componente
    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users?offset=0&limit=100')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    
    function newTask(event) {
        if (event.key === "Enter" && task.trim() !== "") {
            console.log("He clicado");
            console.log(task);
            fetch('https://playground.4geeks.com/todo/todos/Marcos%20Esteve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ label: task, done: false }), 
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Tarea creada:', data);
                setNewTask(""); 
            })
            .catch((error) => {
                console.error('Error creando la tarea:', error);
            });
            fetch('https://playground.4geeks.com/todo/users/Marcos%20Esteve')
            .then ((response)=> response.json())
            .then((data) => {
                const labels = data.todos.map(todo => todo.label); 
                console.log(labels);
                setTaskList(labels)
            });

        }
    }
    function deleteTask () {
            const deleteOptions = {
                method: "DELETE",
                redirect: "follow"
              };
              fetch('https://playground.4geeks.com/todo/todos/9', deleteOptions)
              .then ((response) => response.json())
              .then ()
        }
        
    // function updateTask () {
    //     fetch('https://playground.4geeks.com/todo/users/Marcos')
    //     .then ((response)=> response.json())
    //     .then((data) => {
    //         const labels = data.todos.map(todo => todo.label); 
    //         console.log(labels);
    //         setTaskList(labels)
    //     });
        
    // }

    return (
        <>
            <input type="text" value={task} onChange={(event) => setNewTask(event.target.value)} onKeyDown={newTask} placeholder="Introduce una nueva tarea"/>
            {/* <button onClick={()=>updateTask()}>Ver tareas</button> */}
            <ul>
                {taskList.map((task, index)=> (
                    <li key={index}>{task}<FontAwesomeIcon className="iconoEliminar" icon={faXmark} onClick={"deleteTask()"}/></li>
                ))}
            </ul>
        </>
    );
};

export default ToDoList;

// function getTasks () {
//     console.log ('getTasks');
//         fetch('https://playground.4geeks.com/todo/todos/Marcos')
//             .then(response => response.json())
//             .then(data => {
//                 console.log (data);
    
//             })
//     }
//     function addTasks () {
//         console.log ('addTasks');
    
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ label: 'Fetch POST Request Example' })
//         };
    
//             fetch(https://playground.4geeks.com/todo/todos/wilfredo,requestOptions)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log (data);
        
//                 })
//         }