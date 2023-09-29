import ClearIcon from "@mui/icons-material/Clear";

export default function Tasks({ userLists, selectedUserList, tasks }) {
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
