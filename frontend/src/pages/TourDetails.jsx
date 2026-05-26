import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toursData from "../data/toursData";
import { useNavigate } from "react-router-dom";
import "../styles/tourdetails.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function TourDetails() {
  const navigate =  useNavigate();
  const { id } = useParams();
  const tour = toursData.find((t) => t.id === Number(id));

  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!tour) return <h2>Tour not found</h2>;
  
  const handleBookNow = () =>{
const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user) {
    navigate("/bookingform"); // direct redirect
  } else {
    setShowLogin(true); // open modal
  }
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/auth/signup`,
        { name, email, password }
      );

      setMessage(res.data.message);
      
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        setTimeout(() => {
          setShowLogin(false);
          navigate('/bookingform');
        }, 800);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="tourdetails-app">
      <Navbar />

      {/* HERO */}
      <div className="detail-hero">
        <img src={tour.img} alt="" />
        <div className="overlay">
          <h1>{tour.title}</h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="detail-container">
        <div className="detail-left">
          <h2>About this tour</h2>
          <p>{tour.description}</p>
        </div>

        <div className="detail-right">
          <div className="price-card">
            <h2>{tour.price}</h2>
            <p>{tour.location}</p>

            <button
              className="book-btn"
              onClick={handleBookNow}
            >
              Book Now
            </button>

            <button className="wishlist-btn">
              Limited offer ⏩
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 LOGIN MODAL */}
       {showLogin && (
  <div className="modal-overlay" onClick={() => setShowLogin(false)}>
    <div className="login-modal" onClick={(e) => e.stopPropagation()}>

      {/* CLOSE BUTTON */}
      <span className="close-btn" onClick={() => setShowLogin(false)}>✖</span>

      <div className="modal-content">
        <h2>Create an Account</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && <p className="error-msg">{message}</p>}

      </div>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
}