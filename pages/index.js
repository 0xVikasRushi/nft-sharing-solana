import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import { connections } from "./api/utils/constant";

import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function Home() {
  const [nft, setnft] = useState(null);
  const { connected, publicKey } = useWallet();
  let ownerToken;
  const getAllNftData = async () => {
    try {
      if (connected === true) {
        ownerToken = publicKey?.toBase58();
        const nfts = await getParsedNftAccountsByOwner({
          publicAddress: ownerToken,
          connection: connections,
          serialization: true,
        });
        return nfts;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getnfts = async () => {
    try {
      let nftData = await getAllNftData();
      var data = Object.keys(nftData).map((key) => nftData[key]);
      let arr = [];
      let n = data.length;
      for (let i = 0; i < n; i++) {
        console.log(data[i].data.uri);
        let val = await axios.get(data[i].data.uri);
        arr.push(val);
      }
      setnft(arr);
      console.log(nft);
      return arr;
    } catch (error) {
      console.log(error);
    }
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

  const mounted = useIsMounted();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Nft transfer using solana</h1>
        {mounted && <WalletMultiButton />}
        <h1>{ownerToken}</h1>
      </div>
      <button onClick={getnfts}>button </button>
      <div>
        {nft &&
          nft.map((signal) => (
            <div key={signal.data.name || Math.random}>
              <h2>{signal.data.name}</h2>
              <img src={signal.data.image} alt={signal.data.name} />
            </div>
          ))}
      </div>
    </div>
  );
}
