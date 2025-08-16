import React, { useEffect, useState } from "react";
import "./Nav.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={`${process.env.PUBLIC_URL}/images/netflix-logo.png`}
        alt="Netflix Logo"
        onClick={() => navigate("/")}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요"
      />
      <img
        className="nav__avatar"
        src={`${process.env.PUBLIC_URL}/images/profile-icon.png`}
        alt="Netflix Avatar"
      />
    </nav>
  );
}
