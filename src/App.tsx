import {useState} from "react";
import './App.css'

const tasks = [
  {
    id: 1,
    title: "Make shopping",
    isDone: false,
    addedAt: "1 сентября",
    priority: 0,
  },
  {
    id: 2,
    title: "Полить цветы",
    isDone: true,
    addedAt: "2 сентября",
    priority: 3,
  },
  {
    id: 3,
    title: "Сходить на тренировку",
    isDone: false,
    addedAt: "3 сентября",
    priority: 4,
  },
]

const priorityColors = [ "#ffffff", "#ffd7b5", "#ffb38a", "#ff9248", "#ff6700" ]


function App() {

  const [crrTask, setCrrTask] = useState("not selected")
  const [crrTaskDate, setCrrTaskDate] = useState("not selected")

  if (tasks == null) return (<> loading </>)

  if (tasks.length == 0) return (<> empty list </>)

  return (
    <>
      <h4>Current task: {crrTask} {crrTaskDate} updated</h4>
      <ul>
        {tasks.map((task) => (
            <li className={"taskLi"} style={{ backgroundColor: priorityColors[task.priority] }}>
              <div className={ task.isDone ? "td" : undefined }>{task.title}</div>
              <div><input type={"checkbox"} checked={task.isDone}/></div>
              <div>{task.addedAt}</div>
              <button onClick={ () => { setCrrTask(task.title); } }> update task </button>
              <button onClick={ () => { setCrrTaskDate(task.addedAt); } }> update date </button>
            </li>
        ))}
      </ul>
    </>
  )
}

export default App
