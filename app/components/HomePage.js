import React from "react";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1>
          Welcome to StackBot Project Management: your robot employees are
          awaiting assignments!
        </h1>
        <p>We await your command</p>
      </main>
    </div>
  );
};

export default HomePage;
