import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import { connections } from "./api/utils/constant";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import axios from "axios";
export default function Home() {
  const getnfts = async () => {
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: "3bdsYqEthFJK6dYtM7uDnwdfYHXDFHP56wRhQrL7m3iv",
      connection: connections,
      serialization: true,
    });
    let uris = [];
    for (let i = 0; i < nfts.length; i++) {
      const uri = nfts[i]["data"]["uri"];
      uris.push(uri);
    }
    // let arr = [];
    // let n = uris.length;
    // for (let i = 0; i < n; i++) {
    //   console.log(uris[i].data.uri);
    //   let val = await axios.get(uris[i].data.uri);
    //   arr.push(val);
    // }
    // console.log(arr);
    const val = await axios.get(uris[0]);
    console.log(val);
    return uris;
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
      </div>
      <button onClick={getnfts}>button </button>
    </div>
  );
}
