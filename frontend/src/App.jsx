import { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>AI Payroll Dashboard</h1>
    </div>
  );
}

export default App;
