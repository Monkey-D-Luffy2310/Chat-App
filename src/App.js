import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import Appprovider from "./Context/AppProvider";
import AddRoom from "./components/Modal/AddRoomModal";
import InviteUser from "./components/Modal/InviteUserModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Appprovider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoom />
          <InviteUser />
        </Appprovider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
