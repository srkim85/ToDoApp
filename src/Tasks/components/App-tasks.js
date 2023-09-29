import { useEffect, useState, useRef } from "react";
import "./../sass/App-tasks-main.scss";
// import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import Title from "./Title";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

const initialList = ["Masterlist", "Shopping", "Car"];

const initialTasks = [
  { taskName: "kupi jaja", completed: false, taskList: 0 },
  { taskName: "operi auto", completed: false, taskList: 0 },
  { taskName: "kupi jaja1", completed: true, taskList: 0 },
  { taskName: "operi auto1", completed: false, taskList: 0 },
  { taskName: "kupi jaja2", completed: false, taskList: 0 },
  { taskName: "operi auto2", completed: false, taskList: 0 },
  { taskName: "kupi jaja3", completed: false, taskList: 0 },
  { taskName: "operi auto3", completed: false, taskList: 0 },
];

export default function App() {
  return (
    <div className="container">
      <TasksApp />
    </div>
  );
}

function TasksApp() {
  const [userLists, setUserLists] = useState(initialList);
  const [tasks, setTasks] = useState(initialTasks); //ids treba da resim
  const [selectedUserList, setSelectedUserList] = useState(0);
  const [list, setList] = useState("");
  const [task, setTask] = useState("");
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [showFormAddList, setShowFormAddList] = useState(false);
  const btnAddTaskEl = useRef(null);

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleAddList(newList) {
    setUserLists((userLists) => [...userLists, newList]);
  }

  return (
    <div className="tasks-app">
      <Title />

      <Header
        userLists={userLists}
        selectedUserList={selectedUserList}
        showFormAddList={showFormAddList}
        handleAddList={handleAddList}
        setShowFormAddList={setShowFormAddList}
        list={list}
        setList={setList}
      />

      <Tasks tasks={tasks} />

      <AddTask
        showFormAddTask={showFormAddTask}
        selectedUserList={selectedUserList}
        handleAddTask={handleAddTask}
        setShowFormAddTask={setShowFormAddTask}
        task={task}
        setTask={setTask}
      />
    </div>
  );
}

// function ButtonAddTask({ children, btnClass, setShowFormAddTask }) {
//   return (
//     <button
//       className={`btn ${btnClass}`}
//       onClick={() => setShowFormAddTask((open) => !open)}
//     >
//       {children}
//     </button>
//   );
// }

/*
- stavi da master user lista ne moze da se brise
- napravi responsive da bude


Arhitektura:
- kada se klikne na Add list poziva se setter fja za state userLists i tu se dodaje novi state
- kada je master lista prazna sadrzaj treba da bude nesto u stilu No tasks yet... What do you need to take care of?
- kad je Master list aktivna, borderm bottom treba da bude podebljano. Isto i za druge liste.
- pitanje je kako cu taskove da razvrstam u vise lista
- ovi keys sto sam koristio mi se ne svidjaju, promeni ih
- napravi responsive da bude
- faktorizuj kod 
- izbaci apsolute positioning za ovo dole, mozes da koristis grid
- dodaj i onaj effect kada se mountuje komponenta da ti automatski uradi fokus u nju

- new comosition, grid
- focus effect
- local storage, a kasnije mozes i za local storage da vidis sa nekom custom hook
- da li moze kada se klikne van ovih input elemenata, da se izvrsi brisanje sadrzaja ovih input polja
- faktorisi kod, imas ponavljanja. Ovo za useEffects cemo da pravimo custom hook sto imas ponavljanja kod input za taskove i input za liste

*/
