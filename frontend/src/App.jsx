import { useState } from "react";
import "./App.css";
const URL = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [resposne, setResposne] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch(URL);
    const data = await res.json();
    setResposne(data.message);
  };
  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <h1>{resposne}</h1>
    </>
  );
}

export default App;
