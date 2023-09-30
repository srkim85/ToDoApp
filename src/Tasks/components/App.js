import { useState } from "react";
import "./../sass/App.scss";
import Title from "./Title";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

export default function App() {
  return (
    <div className="container">
      <TasksApp />
    </div>
  );
}

function TasksApp() {
  const [userLists, setUserLists] = useState(["Master list"]);
  const [tasks, setTasks] = useState([]);

  const [selectedUserList, setSelectedUserList] = useState(0);
  const [list, setList] = useState("");
  const [task, setTask] = useState("");
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [showFormAddList, setShowFormAddList] = useState(false);

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleAddList(newList) {
    setUserLists((userLists) => [...userLists, newList]);
  }

  function handleDeleteTask(task) {
    setTasks((tasks) => tasks.filter((t) => t !== task));
  }

  function handleToggleTask(task) {
    setTasks((tasks) =>
      tasks?.map((t) => (t === task ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleDeleteList() {
    const deleteList = userLists.at(selectedUserList);
    if (selectedUserList === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete the list?"
    );

    if (confirmed)
      setUserLists((userLists) =>
        userLists.filter((list) => list !== deleteList)
      );

    setSelectedUserList(0);
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
        setSelectedUserList={setSelectedUserList}
      />

      <Tasks
        tasks={tasks}
        selectedUserList={selectedUserList}
        handleDeleteTask={handleDeleteTask}
        handleToggleTask={handleToggleTask}
        handleDeleteList={handleDeleteList}
      />

      <AddTask
        showFormAddTask={showFormAddTask}
        selectedUserList={selectedUserList}
        handleAddTask={handleAddTask}
        setShowFormAddTask={setShowFormAddTask}
        task={task}
        setTask={setTask}
        tasks={tasks}
      />
    </div>
  );
}
