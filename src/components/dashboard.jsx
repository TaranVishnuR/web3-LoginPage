import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styles from "./dashboard.module.css";
import PageWrapper from "./PageWrapper";
import { ethers } from "ethers";

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(userData);
  const [balance, setBalance] = useState("Loading...");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData(tempData);
    setEditMode(false);
  };

  const handleLogout = () => {
    setUserData({ username: "", email: "", address: "" });
    navigate("/");
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (window.ethereum && userData.address) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balanceBigInt = await provider.getBalance(userData.address);
          const balanceEth = ethers.formatEther(balanceBigInt);
          setBalance(parseFloat(balanceEth).toFixed(4) + " ETH");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error");
      }
    };
    fetchBalance();
  }, [userData.address]);

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Dashboard</h2>

          <div className={styles.field}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={editMode ? tempData.username : userData.username}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div className={styles.field}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editMode ? tempData.email : userData.email}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          <div className={styles.field}>
            <label>Wallet Address:</label>
            <input type="text" value={userData.address} disabled />
          </div>

          <div className={styles.field}>
            <label>Wallet Balance:</label>
            <input type="text" value={balance} disabled />
          </div>

          <div className={styles.buttonRow}>
            {editMode ? (
              <button className={styles.editBtn} onClick={handleSave}>
                Save
              </button>
            ) : (
              <button
                className={styles.editBtn}
                onClick={() => {
                  setTempData(userData);
                  setEditMode(true);
                }}
              >
                Edit
              </button>
            )}
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
