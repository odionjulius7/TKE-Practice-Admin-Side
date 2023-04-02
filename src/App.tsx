import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  Login,
  AddAdmin,
  Users,
  UploadBanner,
  Home,
  AddUsers,
  TripQuest,
  SingleTrip,
  SingleUser,
  SingleRequest,
  AddUserFromTrip,
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute page={<Home />} />} />
      <Route path="/users" element={<ProtectedRoute page={<Users />} />} />
      <Route
        path="/add-users"
        element={<ProtectedRoute page={<AddUsers />} />}
      />
      <Route
        path="/user-trip-details"
        element={<ProtectedRoute page={<AddUserFromTrip />} />}
      />
      <Route
        path="/uplaod-banner"
        element={<ProtectedRoute page={<UploadBanner />} />}
      />
      <Route
        path="/trip-request"
        element={<ProtectedRoute page={<TripQuest />} />}
      />
      <Route
        path="/add-admin"
        element={<ProtectedRoute page={<AddAdmin />} />}
      />
      <Route
        path="/user/:id"
        element={<ProtectedRoute page={<SingleUser />} />}
      />
      <Route
        path="/request/:id"
        element={<ProtectedRoute page={<SingleRequest />} />}
      />
      <Route
        path="/trip/:id"
        element={<ProtectedRoute page={<SingleTrip />} />}
      />
    </Routes>
  );
}

export default App;
