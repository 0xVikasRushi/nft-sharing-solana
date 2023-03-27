import React, { useState } from "react";

const ConnectWalletButton = () => {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.solana !== "undefined") {
      try {
        await window.solana.connect();
        setConnected(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Fantom wallet not detected.");
    }
  };

  return (
    <button onClick={connectWallet}>
      {connected ? "Connected" : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;
