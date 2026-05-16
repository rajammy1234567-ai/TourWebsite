import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toursData from "../data/toursData";
import { useNavigate } from "react-router-dom";
import "../styles/tourdetails.css";



export default function TourDetails() {
  const navigate =  useNavigate();
  const { id } = useParams();
  const tour = toursData.find((t) => t.id === Number(id));

  const [showLogin, setShowLogin] = useState(false);

  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = contact, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!tour) return <h2>Tour not found</h2>;
  
  const handleBookNow = () =>{
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    navigate("/bookingform"); // direct redirect
  } else {
    setShowLogin(true); // open modal
  }
  }

  
  const handleSendOtp = async () => {
    if (!contact) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "https://tour-website-chi-ashen.vercel.app/api/auth/send-otp",
        { contact }
      );

      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyOtp = async () => {
    if (!otp) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "http://tour-website-chi-ashen.vercel.app/api/auth/verify-otp",
        { contact, otp }
      );

      setMessage(res.data.message);

   
      localStorage.setItem("user", JSON.stringify(res.data.user));


      setShowLogin(false);
      resetState();

      navigate('/bookingform')

        // alert("Booking Confirmed ✅");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
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
        <h2>Login to Continue</h2>
        <p className="subtitle">Enter OTP sent to your number</p>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Phone / Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="input-field"
            />

            <button
              className="primary-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
            />

            <button
              className="primary-btn"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="divider">OR</div>

            <button
              className="secondary-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >
              Resend OTP
            </button>
          </>
        )}

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