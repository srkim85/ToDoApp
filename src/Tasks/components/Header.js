import { useEffect, useRef } from "react";

export default function Header({
  userLists,
  selectedUserList,
  showFormAddList,
  handleAddList,
  setShowFormAddList,
  list,
  setList,
  setSelectedUserList,
}) {
  return (
    <div className="header">
      {!showFormAddList && (
        <UserLists
          userLists={userLists}
          selectedUserList={selectedUserList}
          setSelectedUserList={setSelectedUserList}
        />
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

function UserLists({ userLists, selectedUserList, setSelectedUserList }) {
  return (
    <ul className="task-lists">
      {userLists?.map((list) => (
        <li
          key={list}
          onClick={() => setSelectedUserList(userLists.indexOf(list))}
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
    setList("");
  }

  useEffect(function () {
    inputEl.current.focus();
  }, []);

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
