import { useState } from "react";
import "./sass/App-tasks-main.scss";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { Tune } from "@mui/icons-material";

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
      <div>
        <TasksApp />
      </div>
    </div>
  );
}

function TasksApp() {
  const [userLists, setUserLists] = useState(initialList);
  const [tasks, setTasks] = useState(initialTasks); //ids treba da resim
  const [selectedUserList, setSelectedUserList] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null); // ovo mi mozda i ne treba
  const [showFormAddTask, setShowFormAddTask] = useState(true);
  const [showFormAddList, setShowFormAddList] = useState(false);
  const [FormAddList, setFormAddList] = useState(false); // ovo je copmonent, ne state

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleAddList(newList) {
    setUserLists((userLists) => [...userLists, newList]);
  }

  // function ToggleTaskCompleted() {}

  return (
    <div className="tasks-app">
      <Title />
      <Header
        userLists={userLists}
        selectedUserList={selectedUserList}
        showFormAddList={showFormAddList}
        handleAddList={handleAddList}
        setShowFormAddList={setShowFormAddList}
      />
      <Tasks tasks={tasks} />

      {showFormAddTask && (
        <FormAddTask
          selectedUserList={selectedUserList}
          handleAddTask={handleAddTask}
          setShowFormAddTask={setShowFormAddTask}
        />
      )}

      {showFormAddTask && (
        <ButtonAddTask
          btnClass={"btn-add-task"}
          setShowFormAddTask={setShowFormAddTask}
        >
          +
        </ButtonAddTask>
      )}
    </div>
  );
}

// const iconStyle = { color: "#0f2231", fontSize: "30px" };
function Title() {
  return (
    <div className="title">
      <DoneAllIcon style={{ color: "#0f2231", fontSize: "30px" }} />
      <h1>Tasks</h1>
    </div>
  );
}

function Header({
  userLists,
  selectedUserList,
  showFormAddList,
  handleAddList,
  setShowFormAddList,
}) {
  return (
    <div className="header">
      {!showFormAddList && (
        <UserLists userLists={userLists} selectedUserList={selectedUserList} />
      )}

      {showFormAddList && <FormAddList />}
      {showFormAddList && (
        <ButtonAddList btnClass={"btn-add-list"}>+ Add list</ButtonAddList>
      )}
    </div>
  );
}

function UserLists({ userLists, selectedUserList }) {
  return (
    <ul className="task-lists">
      {userLists.map((list) => (
        <li
          key={list}
          className={`task-list ${
            list === userLists.at(selectedUserList) ? "task-list-active" : ""
          } `}
        >
          {list}
        </li>
      ))}
    </ul>
  );
}

function Tasks({ userLists, selectedUserList, tasks }) {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li key={task.taskName} className="task">
          <input type="checkbox" value={task.completed} />
          <span style={task.completed ? { textDecoration: "line-though" } : {}}>
            {task.taskName}
          </span>
          {<ClearIcon style={{ color: "#ff6b6b", fontSize: "2rem" }} />}
        </li>
      ))}
    </ul>
  );
}

function FormAddTask({ selectedUserList, handleAddTask, setShowFormAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const newTask = {
      taskName: task,
      taskList: selectedUserList,
      completed: false,
    };

    handleAddTask(newTask);
    setShowFormAddTask((open) => !open);
  }

  return (
    <form className="form form-add-task" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Type here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="input"
      />
      <button className="btn btn-submit">Add task</button>
    </form>
  );
}

function ButtonAddTask({ children, btnClass, setShowFormAddTask }) {
  return (
    <button
      className={`btn ${btnClass}`}
      onClick={() => setShowFormAddTask((open) => !open)}
    >
      {children}
    </button>
  );
}

function FormAddList({ handleAddList, setShowFormAddList }) {
  const [list, setList] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!list) return;

    handleAddList(list);
    setShowFormAddList((open) => !open);
  }

  return (
    <form className="form form-add-list">
      <input
        type="text"
        placeholder="Type here..."
        value={list}
        onChange={(e) => setList(e.target.value)}
        className="input"
      />
      <button className="btn btn-submit">Add list</button>
    </form>
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

function ButtonAddList({ children, btnClass }) {
  return <button className={`btn ${btnClass}`}>{children}</button>;
}

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

*/
