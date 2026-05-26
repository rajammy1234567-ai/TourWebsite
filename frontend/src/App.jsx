import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Tour from "./pages/Tour";
import Gallery from "./pages/Gallery";
import EventPage from "./pages/EventPage";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import TourDetails from "./pages/TourDetails";
import Payment from "./pages/Payment"
import Success from "./pages/Success";
import BookingFormPage from "./pages/BookingForm"
import { BookingForm } from "./components/BookingForm";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/bookingform" element={<BookingForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
