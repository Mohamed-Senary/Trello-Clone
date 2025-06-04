import './App.css'
import Navbar from './Components/Navbar'
import FAB from './Components/FAB'
import WorkflowCard from './Components/WorkflowCard'
import { useRef, useState } from 'react'
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

var wfids = 0
function App() {
  const [workflows , setWorkflows] = useState ([])
  const constraintsRef = useRef(null)
  const edges = [{ id: '1-2', source: 0, target: 1 }];

  function addWorkflow (){
    let wftitle = prompt ("Enter The title of new workflow")
    console.log (wftitle)
    if (!wftitle)
      return
    let workflow = {
      id: wfids,
      title: wftitle,
      color: ""
    }
    wfids ++
    setWorkflows([...workflows , workflow])
  }

    const renameWorkflow = function (id){
        let newWfname = prompt("Enter new name of WorkFlow")
        if (!newWfname) {
            return;
        }
        setWorkflows(prevWorkflows => {
            return prevWorkflows.map((wf) => {
                if (wf.id === id) { // Compare by unique ID
                    return { ...wf, title: newWfname };
                }
                return wf;
            });
        });
    }

    const deleteWorkflow = function (id) {
      if (!confirm("Are you sure you want to delete work flow?"))
        return
      setWorkflows (workflows.filter ((wf)=>wf.id !== id))
    }

    const changeColor = function (id){
        const newColor = event.target.value
        setWorkflows(prevWorkflows => {
            return prevWorkflows.map((wf) => {
                if (wf.id === id) { // Compare by unique ID
                    return { ...wf, color: newColor };
                }
                return wf;
            });
        });
    }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar></Navbar>
      <div className="flex-grow-1 container-fluid" ref={constraintsRef}>
        <div className="row h-100">
          <div className="col p-3 h-100" id='workflows-area'>
              {
                workflows.map ((wf)=>{
                  return(<WorkflowCard
                    key = {wf.id}
                    id  = {wf.id}
                    title = {wf.title}
                    color = {wf.color}
                    constraintRef={constraintsRef}
                    onRename = {()=>renameWorkflow(wf.id)}
                    onDelete = {()=>deleteWorkflow(wf.id)}
                    onColor =  {changeColor}
                  ></WorkflowCard>)
                })
              }
          </div>
        </div>
      </div>
      <FAB
        add= {addWorkflow}
      ></FAB>
    </div>
  )
}

export default App
