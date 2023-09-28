import { useState } from "react";

const initialItems = [
  { name: "12 jaja", isBought: false, id: crypto.randomUUID() },
  { name: "4 banane", isBought: false, id: crypto.randomUUID() },
  { name: "mordatela", isBought: false, id: crypto.randomUUID() },
];

export default function App() {
  return <GroceryList />;
}

function GroceryList() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isBought: !item.isBought } : item
      )
    );
  }

  return (
    <div className="container">
      <Header />
      <Items
        items={items}
        onDeleteItem={handleDeleteItem}
        onHandleToggleItem={handleToggleItem}
      />
      <ShoppingForm
        query={query}
        onSetQuery={setQuery}
        onAddIem={handleAddItem}
      />
      {/* <Status /> */}
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <span>🛒</span> Shopping List
    </div>
  );
}

function Items({ items, onDeleteItem, onHandleToggleItem }) {
  return (
    <ul className="items-list">
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onHandleToggleItem={onHandleToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onHandleToggleItem }) {
  return (
    <li className="item">
      <div>
        {" "}
        <input
          type="checkbox"
          value={item.isBought}
          onChange={() => onHandleToggleItem(item.id)}
        />
        <span style={item.isBought ? { textDecoration: "line-through" } : {}}>
          {item.name}
        </span>
        <button className="btn-delete" onClick={() => onDeleteItem(item.id)}>
          X
        </button>
      </div>
    </li>
  );
}

function ShoppingForm({ query, onSetQuery, onAddIem }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;

    const newItem = {
      name: query,
      id: crypto.randomUUID(),
      isBought: false,
    };

    onAddIem(newItem);
    onSetQuery("");
  }

  return (
    <form className="shopping-form" onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
        className="input"
        type="text"
        placeholder="Type here..."
      />
      <button className="btn">Add</button>
    </form>
  );
}

// function Status() {
//   return <div>Status</div>;
// }
