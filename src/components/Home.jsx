import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Hey hii : )</h1>
      <h2>welcome to website builder</h2>
      <p>
        This is a simple website builder app made using React.js. You can create
        pages, add components, and make changes to the styles as per your needs.
      </p>
      <button onClick={() => navigate("/editor")}>
        get started <FaArrowRight className="rightarr" />
      </button>
    </div>
  );
};

export default Home;
