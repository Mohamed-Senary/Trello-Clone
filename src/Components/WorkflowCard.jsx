import { useRef, useState} from "react";
import { motion, useDragControls } from "motion/react";
import Task from "./Task";

export default function WorkflowCard (props){
    const [tasks , setTasks] = useState ([])
    const controls = useDragControls()
    const taskAreaConstraint = useRef()

    const addTask = function (){
        let taskName = prompt ("Enter Task Name")
        if (!taskName)
            return
        let task = {
            title:taskName,
            status: false
        }
        setTasks ([...tasks , task])
    }

    const checkTask = function (idx){
        const targetTask = tasks.find((t , id)=>id === idx)
        if (targetTask.status)
            targetTask.status = false
        else
            targetTask.status = true
    }

    const renameTask = function(taskIdToRename) { // Pass the unique ID
        let newTaskname = prompt("Enter The new name");
        if (!newTaskname) {
            return;
        }
        setTasks(prevTasks => {
            return prevTasks.map((task , id) => {
                if (id === taskIdToRename) { // Compare by unique ID
                    return { ...task, title: newTaskname };
                }
                return task;
            });
        });
    };

    const deleteTask = function(idx){
        setTasks  (tasks.filter((t , id)=>id !== idx))
    }

    return (
        <motion.div 
            drag 
            dragMomentum={false} 
            dragConstraints={props.constraintRef}
            dragElastic={0}
            dragControls={controls} 
            dragListener={false}
            className="card text-dark" 
            style={{touchAction:'none' , display:'inline-block' , backgroundColor:`${props.color}`}}>
            <div 
                className="card-header d-flex justify-content-between" 
                style={{cursor:'grab'}}
                onPointerDown={(event) => controls.start(event)}>
                <h4>{props.title}</h4>
                <div className="dropdown">
                        <button
                        className="btn btn-outline-dark ms-3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        <i className="fa-solid fa-ellipsis" />
                        </button>
                        <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#" onClick={props.onRename}>
                                Rename
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item text-danger" href="#" onClick={props.onDelete}>
                                Delete
                            </a>
                        </li>
                        <li><hr className="dropdown-divider"/></li>
                        <li>
                            <input className="ms-3" type="color" onChange={()=>props.onColor(props.id)}/>
                        </li>
                        </ul>
                </div>
            </div>
            <ul className="list-group list-group-flush mx-2"
             ref={taskAreaConstraint}>
                {
                    tasks.map((task , idx)=>{
                        return(<Task
                                key={idx}
                                task={task}
                                onRename={() => renameTask(idx)}
                                onDelete={() => deleteTask(idx)}
                                onCheck={() => checkTask(idx)}
                                constraintRef={taskAreaConstraint}
                        ></Task>)
                    })
                }
                
            </ul>
            <div className="card-footer text-center">
                <button onClick={addTask} type="button" className="btn btn-outline-dark w-100">
                    Add Task
                </button>
            </div>
            
        </motion.div>
    )
}