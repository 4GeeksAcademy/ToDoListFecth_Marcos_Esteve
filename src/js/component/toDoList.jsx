import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const ToDoList = () => {
    const [task, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/Marcos%20Esteve')
            .then((response) => response.json())
            .then((data) => {
                setTaskList(data.todos); 
              })
              .catch((error) => console.error('Error fetching tasks:', error));
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
                setTaskList(data.todos);
            });

        }
    }
    function deleteTask (id) {
        console.log (id);
        console.log(`mi id es ${id}`)
        const deleteOptions = {
            method: "DELETE",
            redirect: "follow"
              };
              fetch(`https://playground.4geeks.com/todo/todos/${id}`, deleteOptions)
              .then((response) => response.text()) // Tratar la respuesta como texto
              .then((result) => {
                  console.log(result); // Aquí puedes ver el texto de respuesta si existe
                  setTaskList((prevTaskList) => prevTaskList.filter(task => task.id !== id)); // Filtrar la lista
              })
              .catch((error) => console.error('Error eliminando la tarea:', error));
        }
    return (
        <>
            <input type="text" value={task} onChange={(event) => setNewTask(event.target.value)} onKeyDown={newTask} placeholder="Introduce una nueva tarea"/>
            <ul>
                {taskList.map((task, index,id)=> (
                    <li key={index}>{task.label} {index} {task.id}{taskList.id}<FontAwesomeIcon className="iconoEliminar" icon={faXmark} onClick={()=>deleteTask(task.id)}/></li>
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