import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import MyListings from "./pages/MyListings";
import Favorites from "./pages/Favorites";
import Inquiries from "./pages/Inquiries";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import BrokerDashboard from "./pages/BrokerDashboard";
import EditProperty from "./pages/EditProperty";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
        <Route path="/broker/add" element={
          <RoleRoute role="BROKER">
            <AddProperty />
          </RoleRoute>
        } />

        <Route path="/broker/listings" element={
          <RoleRoute role="BROKER">
            <MyListings />
          </RoleRoute>
        } />

        <Route path="/broker/edit/:id" element={
          <RoleRoute role="BROKER">
            <EditProperty />
          </RoleRoute>
        } />

        <Route path="/favorites" element={
          <RoleRoute role="BUYER">
            <Favorites />
          </RoleRoute>
        } />

        <Route path="/inquiries" element={
          <ProtectedRoute>
            <Inquiries />
          </ProtectedRoute>
        } />

        <Route path="/broker/dashboard" element={
  <RoleRoute role="BROKER">
    <BrokerDashboard />
  </RoleRoute>
} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
