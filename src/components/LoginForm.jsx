import React from 'react';
import styles from '../styles/LoginForm.module.css';
import { ethers } from 'ethers';

const LoginForm = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      alert(`Wallet connected: ${address}`);
    } else {
      alert('Install MetaMask');
    }
  };

  return (
    <div className={styles.loginCard}>
      <h2>Web3 Login</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default LoginForm;
