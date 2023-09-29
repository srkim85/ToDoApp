import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect, useRef } from "react";

export default function Header({
  userLists,
  selectedUserList,
  showFormAddList,
  handleAddList,
  setShowFormAddList,
  list,
  setList,
}) {
  return (
    <div className="header">
      {!showFormAddList && (
        <UserLists userLists={userLists} selectedUserList={selectedUserList} />
      )}

      {showFormAddList && (
        <FormAddList
          handleAddList={handleAddList}
          setShowFormAddList={setShowFormAddList}
          list={list}
          setList={setList}
        />
      )}

      {!showFormAddList && (
        <ButtonAddList
          btnClass={"btn-add-list"}
          setShowFormAddList={setShowFormAddList}
        >
          + Add list
        </ButtonAddList>
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

function FormAddList({ handleAddList, setShowFormAddList, list, setList }) {
  const inputEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!list) return;
    handleAddList(list);
    setShowFormAddList((open) => !open);
  }

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (inputEl.current && !inputEl.current.contains(e.target)) {
          setList("");
        }
      }

      document.addEventListener("click", handleClickOutside);

      return function () {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [setList]
  );

  return (
    <form className="form form-add-list" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Type here..."
        value={list}
        onChange={(e) => setList(e.target.value)}
        className="input input-new-list"
        ref={inputEl}
      />
      <button className="btn btn-submit">Add list</button>
    </form>
  );
}

function ButtonAddList({ children, btnClass, setShowFormAddList }) {
  return (
    <button
      className={`btn ${btnClass}`}
      onClick={() => setShowFormAddList((open) => !open)}
    >
      {children}
    </button>
  );
}
