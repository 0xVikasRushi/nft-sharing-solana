import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import { connections } from "./api/utils/constant";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";

export default function Home() {
  const [nft, setnft] = useState(null);
  const { connected, publicKey, wallet } = useWallet();
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
  // const mintAddress = "8MdXvWgNou9jRVturbfnt3egf1aP9p1AjL8wiJavti7F";
  const transferNft = async (mintAddress, recipient) => {
    // Replace with the recipient's Solana address
    try {
      const amount = 1;
      const transaction = new transaction().add(
        transferChecked({
          source: "8iR3Y4TiogikopKEiCXCW3xtQsYk9PZWRSRJSPMQW8AF",
          mint: "6N5VuwXevoDvjSdcGUNAijQ4yk2QqRcVgx8YXjxp5HpV",
          decimals: 0,
          amount,
          destination: new PublicKey(
            "3bdsYqEthFJK6dYtM7uDnwdfYHXDFHP56wRhQrL7m3iv"
          ),
          owner: wallet.publicKey,
        })
      );
      transaction.feePayer = wallet.publicKey;
      const txid = await transaction(connections, wallet, transaction);
      console.log(txid);
    } catch (error) {
      console.log(error);
    }
  };

  function test() {
    transferNft(
      "6N5VuwXevoDvjSdcGUNAijQ4yk2QqRcVgx8YXjxp5HpV",
      "3bdsYqEthFJK6dYtM7uDnwdfYHXDFHP56wRhQrL7m3iv"
    );
  }
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
        <h3>default recipient 8MdXvWgNou9jRVturbfnt3egf1aP9p1AjL8wiJavti7F</h3>
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
        <button onClick={test}>sent NFT</button>{" "}
      </div>{" "}
    </div>
  );
}
