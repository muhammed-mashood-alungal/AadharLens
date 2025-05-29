import { Toaster } from "react-hot-toast";
import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <>
      <LandingPage />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
