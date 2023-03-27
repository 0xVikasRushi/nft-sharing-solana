import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import { connection } from "./api/utils/constant";
import { PublicKey } from "@solana/web3.js";
export default function Home() {
  const getBalance = async () => {
    // const req = await connection.getBalance();
    // const res = await req.json();
    console.log(PublicKey);
  };
  const getProviderPublicKey = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        console.log(provider._publicKey);
        return provider;
      }
    }
  };
  const getRecentBlockInfo = async () => {
    const recentInfo = await connection.getEpochInfo();
    console.log("~~~~~~~~~~~~~~~~~EPOCH INFO~~~~~~~~~~~~\n", recentInfo);
  };

  const mounted = useIsMounted();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Nft transfer using solana</h1>
        {mounted && <WalletMultiButton />}
      </div>
      <button onClick={getRecentBlockInfo}>button </button>
    </div>
  );
}
