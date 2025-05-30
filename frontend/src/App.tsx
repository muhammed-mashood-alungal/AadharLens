import { Toaster } from "react-hot-toast";
import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <>
      <LandingPage />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#f9fafb",
          },
          iconTheme: {
            primary: "#2563eb",
            secondary: "#f9fafb",
          },
        }}
      />
    </>
  );
}

export default App;
