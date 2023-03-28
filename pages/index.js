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
  const [loading, setloading] = useState(false);

  let ownerToken;
  const getAllNftData = async () => {
    try {
      setloading(true);
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
      setloading(false);
      setnft(arr);
      return arr;
    } catch (error) {
      console.log(error);
    }
  };

 

  const mounted = useIsMounted();
  return (
    <div
      className={styles.container}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        className={styles.main}
        style={{ maxWidth: "600px", width: "100%", padding: "0 20px" }}
      >
        <h1
          className={styles.title}
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}
        >
          Nft transfer using Solana
        </h1>
        {mounted && <WalletMultiButton />}
        {connected && (
          <div>
            <button
              onClick={getnfts}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                margin: "20px 0",
              }}
            >
              {loading ? "Fetching nfts please wait " : "My nfts"}
            </button>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {nft &&
                nft.map((signal) =>
                  signal.data.image ? (
                    <div
                      key={signal.data.name || Math.random}
                      style={{ margin: "10px", textAlign: "center" }}
                    >
                      <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                        {signal.data.name}
                      </h2>
                      <img
                        src={signal.data.image}
                        alt={signal.data.name}
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  ) : (
                    <></>
                  )
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
