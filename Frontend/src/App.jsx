import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import useAuth from "./custom-hook/useAuth";
//todo: lock the whole app in 16/9
function App() {
  useAuth();

  return (
    <div>
        <Navbar />
        <AppRoutes />
    </div>
  );
}

export default App;