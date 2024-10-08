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
                setTaskList([...taskList, { label: task, id: data.id }]);
                setNewTask(""); 
            })
            .catch((error) => {
                console.error('Error creando la tarea:', error);
            });
        }
    }
    function deleteTask (id) {
        const deleteOptions = {
            method: "DELETE",
            redirect: "follow"
              };
              fetch(`https://playground.4geeks.com/todo/todos/${id}`, deleteOptions)
              .then((response) => response.text())
              .then((result) => {
                  setTaskList((prevTaskList) => prevTaskList.filter(task => task.id !== id)); 
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