// ========================= IMPORTS =========================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchSection from "../components/SearchSection";

import travelImg from "../assets/travel.avif";

import "../styles/home.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toursData from "../data/toursData";

// ========================= HOME =========================
export default function Home() {
  const [activeMood, setActiveMood] = useState("");
  const navigate = useNavigate();

  const moods = [
    "Beach",
    "Mountain",
    "City Break",
    "Heritage",
    "Wild life",
    "Road Trip",
  ];

  return (
    <div className="fl-home-app">
      <Navbar />

      {/* ================= EXISTING HERO ================= */}
      <section className="fl-home-hero">
        <div className="fl-home-hero-text">
          <p className="fl-home-hero-tag">Curated Travel Experiences</p>

          <h1>
            Discover the world <br />
            <span>your way</span>
          </h1>

          <p className="fl-home-hero-subtext">
            Handpicked destinations, seamless booking, and unforgettable
            journeys.
          </p>

          <div className="fl-home-hero-actions">
            <Link to="/tour" className="btn primary home-btn">
              Explore Trips
            </Link>

            <Link to="/contact" className="btn secondary home-btn">
              Customized Package
            </Link>
          </div>
        </div>

        <div className="fl-home-hero-image-style">
          <img src={travelImg} alt="travel" />
        </div>
      </section>

      {/* SEARCH */}
      <SearchSection />

      {/* POPULAR */}
      <section className="fl-home-section">
        <h2>Popular Now</h2>

        <div className="fl-home-grid">
          {toursData.map((tour) => (
            <Link
              key={tour.id}
              to={`/tour/${tour.id}`}
              className="fl-home-card"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              {tour.location}
            </Link>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="fl-home-section">
        <h2>Top Destinations</h2>

        <div className="fl-home-grid">
          {toursData.slice(0, 6).map((tour) => (
            <div
              key={tour.id}
              className="fl-home-dest"
              onClick={() => navigate(`/tour/${tour.id}`)}
              style={{
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img
                src={tour.img}
                alt={tour.location}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <h4 style={{ marginTop: "10px" }}>{tour.location}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="fl-home-section fl-home-grid">
        <div className="fl-home-feature">
          💎
          <h3>Curated Quality</h3>
          <p>Only trips we’d take ourselves.</p>
        </div>

        <div className="fl-home-feature">
          🧭
          <h3>Easy Planning</h3>
          <p>Simple itineraries & bookings.</p>
        </div>

        <div className="fl-home-feature">
          💰
          <h3>Honest Pricing</h3>
          <p>No hidden charges.</p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="fl-home-section">
        <h2>Gallery</h2>

        <div className="fl-home-gallery">
          <img src="https://images.unsplash.com/photo-1528127269322-539801943592" />
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" />
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080" />
        </div>
      </section>

      {/* CTA */}
      <section className="fl-home-cta">
        <h2>Start your journey today</h2>

        <button onClick={() => navigate("/gallery")}>Get Started</button>
      </section>

      {/* MOODS */}
      <section
        style={{
          padding: "60px 80px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "23px",
            marginBottom: "25px",
          }}
        >
          Pick a Mood
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {moods.map((item) => {
            const isActive = activeMood === item;

            return (
              <button
                key={item}
                onClick={() => setActiveMood(item)}
                style={{
                  padding: "12px 22px",
                  borderRadius: "25px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "0.3s",
                  background: isActive ? "#ff6b6b" : "#fff",
                  color: isActive ? "#fff" : "#000",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
