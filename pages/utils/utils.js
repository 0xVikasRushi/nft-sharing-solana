export const connectWallet = async () => {
  if (typeof window !== "undefined" && typeof window.solana !== "undefined") {
    try {
      await window.solana.connect();
      return true;
    } catch (error) {
      alert(error);
    }
  } else {
    return false;
    alert("Fantom wallet not detected.");
  }
};

export const logoutWallet = async () => {
  if (window.solana == true) {
    try {
      await window.solana.disconnect();
      return true;
    } catch (error) {
      alert(error);
    }
  }
  return false;
};

export const getProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
};
