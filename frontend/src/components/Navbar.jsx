import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaUser,
  FaDownload,
} from "react-icons/fa";
import Notification from "./Notification";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirect home
  };
  return (
    <div className="fl-nav-wrapper">
      <nav className="fl-navbar">
        {/* LOGO */}
        <div className="fl-logo">
          <NavLink to="/" className="fl-logo-icon">
            ✈ VizTravels
          </NavLink>
        </div>

        {/* LINKS + SOCIAL (GROUPED FOR MOBILE) */}
        <div className={`fl-menu ${menuOpen ? "active" : ""}`}>
          <div className="fl-nav-links">
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/tour">Tours</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/event">Event</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div className="fl-social-icons">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>

          <div className="fl-download">
            <a href="/application-80c6153b-97ab-45ec-840a-930629c51db9.apk" download className="download-btn">
              <FaDownload /> Download App
            </a>
          </div>

          <div className="fl-auth">
            {user ? (
              <>
                <span className="user-name">
                  <FaUser />
                </span>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="login-btn">
                Sign In
              </NavLink>
            )}
          </div>
        </div>

        {/* NAV RIGHT GROUP (HAMBURGER + NOTIFICATION) */}
        <div className="fl-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="fl-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Notification />
        </div>
      </nav>
    </div>
  );
}
