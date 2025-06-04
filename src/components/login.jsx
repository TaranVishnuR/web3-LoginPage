import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import styles from "./login.module.css";
import PageWrapper from "./PageWrapper";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const backgroundRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: backgroundRef.current,
        THREE: THREE,
        color: 0x2196f3,
        backgroundColor: 0x0d1117,
        maxDistance: 20.0,
        spacing: 18.0,
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const handleConnect = async () => {
    if (!window.ethereum) return alert("MetaMask not installed");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const walletAddress = accounts[0];

    setUserData({
      username,
      email,
      address: walletAddress,
    });

    navigate("/dashboard");
  };

  return (
    <PageWrapper>
      <div ref={backgroundRef} className={styles.background}>
        <div className={styles.card}>
          <h2 style={{ textAlign: "center", color: "#fff" }}>Web3 Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleConnect} className={styles.button}>
            Connect Wallet & Login
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
