import { useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";

function App() {

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <Dashboard />;
}

export default App;
