import { useEffect, useRef } from "react";

export default function AddTask({
  showFormAddTask,
  selectedUserList,
  handleAddTask,
  setShowFormAddTask,
  task,
  setTask,
  tasks,
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
          tasks={tasks}
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
  tasks,
}) {
  const isIncluded = tasks.map((t) => t.taskName).includes(task);

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const newTask = {
      taskName: task,
      taskList: selectedUserList,
      completed: false,
    };

    if (isIncluded) {
      alert("Task already added");
      return;
    }

    handleAddTask(newTask);
    setShowFormAddTask((open) => !open);
    setTask("");
  }

  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

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
