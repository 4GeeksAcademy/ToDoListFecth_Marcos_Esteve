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
            setCounterTask(counterTask +1)

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
        <div className = "d-flex flex-column align-items-center justify-content-center">
            <div className="inputContainer">
                <input type="text" value={task} className="form-control inputUser"  onChange={(event) => setNewTask(event.target.value)} onKeyDown={newTask} placeholder="Introduce una nueva tarea"/>
            </div>
            <ul className = " p-0 m-0">
                {taskList.map((task, index,id)=> (
                    <li key={index} className="lista p-2 d-flex justify-content-between align-items-center">{task.label}<FontAwesomeIcon className="iconoEliminar" icon={faXmark} onClick={()=>deleteTask(task.id)}/></li>
                ))}
            </ul>
            <div className="d-flex justify-content-between itemsCounter align-items-center ">
                <p className=" mb-0 p-2">{taskList.length} Items left</p>
            </div>
            <span className="line1"></span>
            <span className="line2"></span>
        </div>
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