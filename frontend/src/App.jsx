import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <BrowserRouter>
      <main className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:user_id" element={<EditUser />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
