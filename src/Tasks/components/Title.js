import DoneAllIcon from "@mui/icons-material/DoneAll";

// const iconStyle = { color: "#0f2231", fontSize: "30px" };
export default function Title() {
  return (
    <div className="title">
      <DoneAllIcon style={{ color: "#0f2231", fontSize: "30px" }} />
      <h1>Tasks</h1>
    </div>
  );
}
