import { useState, useEffect, useRef } from "react";

export default function AddTask({
  showFormAddTask,
  selectedUserList,
  handleAddTask,
  setShowFormAddTask,
  task,
  setTask,
}) {
  return (
    <div className="add-task">
      {showFormAddTask && (
        <FormAddTask
          selectedUserList={selectedUserList}
          handleAddTask={handleAddTask}
          setShowFormAddTask={setShowFormAddTask}
          task={task}
          setTask={setTask}
          showFormAddTask={showFormAddTask}
        />
      )}

      {!showFormAddTask && (
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

function FormAddTask({
  selectedUserList,
  handleAddTask,
  setShowFormAddTask,
  task,
  setTask,
  showFormAddTask,
}) {
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
    setTask("");
  }

  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (inputEl.current && !inputEl.current.contains(e.target)) {
          setTask("");
          // showFormAddTask && setShowFormAddTask((open) => !open);
          setShowFormAddTask(false);
          console.log("srle2");
        }
      }

      document.addEventListener("click", handleClickOutside);

      return function () {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [setTask, setShowFormAddTask]
  );

  return (
    <form className="form form-add-task" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Type here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="input"
        ref={inputEl}
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
