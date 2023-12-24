import SignUp from "./Components/SignUp.jsx";
import axios from "axios";

function App() {
  axios.defaults.baseURL = 'https://localhost:3000';
  axios.defaults.withCredentials = true;
  return (
      <SignUp />

  )
}

export default App
