import React from "react";
import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";
import RightPanel from "../components/RightPanel/RightPanel";
import "./index.css";

export default function Main({ onSignUp }) {
  return (
    <main className="main-container">
      <Header />
      <LoginForm onSignUp={onSignUp} />
      <RightPanel />
    </main>
  );
}
