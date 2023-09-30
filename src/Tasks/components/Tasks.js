import ClearIcon from "@mui/icons-material/Clear";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Tasks({
  selectedUserList,
  tasks,
  handleDeleteTask,
  handleToggleTask,
  handleDeleteList,
}) {
  const selectedArr = tasks.filter(
    (task) => task.taskList === selectedUserList
  );

  return (
    <div className="tasks-container">
      <ul className="tasks">
        {selectedArr.map((task) => (
          <li key={task.taskName} className="task">
            <input
              type="checkbox"
              value={task.completed}
              onChange={() => handleToggleTask(task)}
            />
            <span
              style={task.completed ? { textDecoration: "line-through" } : {}}
            >
              {task.taskName}
            </span>
            {
              <ClearIcon
                onClick={() => handleDeleteTask(task)}
                style={{ color: "#ff6b6b", fontSize: "2rem" }}
              />
            }
          </li>
        ))}
      </ul>

      {selectedUserList !== 0 && (
        <HighlightOffIcon
          style={{ color: "#ff6b6b", fontSize: "30px" }}
          className="btn-del-list"
          onClick={handleDeleteList}
        />
      )}
    </div>
  );
}
