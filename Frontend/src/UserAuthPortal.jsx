import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UserAuthPortal.css';

const userTypes = ["Admin", "Seller", "Warehouse", "Buyer"];

const UserAuthPortal = () => {
  const [activeUserType, setActiveUserType] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleUserTypeClick = async (type) => {
    setActiveUserType(type);
    setIsSignUp(false); // reset form mode

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("MetaMask Connection Denied");
      }
    } else {
      alert("Please install MetaMask to continue.");
    }
  };

  const handleClose = () => {
    setActiveUserType(null);
    setIsSignUp(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const isBuyer = activeUserType === "Buyer";

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
        role: activeUserType.toLowerCase(),
        walletAddress,
      }, {
        withCredentials: true,
      });
  
      alert(response.data.message || "Login Successful");
  
      // 👇 Navigate to dashboards based on user type
      switch (activeUserType) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "Seller":
          navigate("/seller");
          break;
        case "Warehouse":
          navigate("/warehouse-dashboard");
          break;
        case "Buyer":
          navigate("/buyer-dashboard");
          break;
        default:
          navigate("/");
      }
  
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  
  
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
        role: "buyer",
        walletAddress, // ✅ Include wallet address
      }, {
        withCredentials: true,
      });
  
      alert(response.data.message || "Registered Successfully");
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  
  return (
    <div className="portal-body">
      <h1 className="portal-title">Select User Role</h1>
      <div className="user-type-buttons">
        {userTypes.map((type) => (
          <button key={type} onClick={() => handleUserTypeClick(type)} className="role-button">
            {type}
          </button>
        ))}
      </div>

      {activeUserType && (
        <div className="overlay">
          <div className={`form-wrapper ${isBuyer && isSignUp ? "active" : ""}`}>

            {/* Login Form */}
            <div className="form-container sign-in">
              <h2>{activeUserType} Login</h2>
              <p className="wallet-info">Wallet: {walletAddress || "Not connected"}</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <a href="#">Forgot password?</a>
                <button type="button" onClick={handleLogin}>Sign In</button>
              </form>
              {isBuyer && <p onClick={toggleMode} className="switch-btn">Don't have an account? Register</p>}
            </div>

            {/* Buyer Register Form */}
            {isBuyer && (
              <div className="form-container sign-up">
                <form onSubmit={(e) => e.preventDefault()}>
                  <h2>Create Account</h2>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={handleSignUp}>Sign Up</button>
                  <p onClick={toggleMode} className="switch-btn">Already have an account? Login</p>
                </form>
              </div>
            )}

            <button className="close-btn" onClick={handleClose}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthPortal;
