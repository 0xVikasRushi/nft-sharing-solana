import React, { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const NftTransfer = ({ wallets }) => {
  const [nftAccounts, setNftAccounts] = useState([]);
  const [toAddress, setToAddress] = useState("");
  const [selectedNft, setSelectedNft] = useState(null);

  useEffect(() => {
    if (!wallets) return;

    // Connect to Solana network
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    // Fetch NFT accounts
    const fetchNftAccounts = async () => {
      const publicKey = wallets.publicKey;
      const nftAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
          mint: new PublicKey("YOUR_NFT_MINT_ADDRESS_HERE"),
        }
      );
      setNftAccounts(nftAccounts.value);
    };
    fetchNftAccounts();
  }, [wallets]);

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleNftSelect = (e) => {
    setSelectedNft(e.target.value);
  };

  const handleSend = async () => {
    if (!selectedNft || !toAddress) return;

    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );
    const instructions = [];
    const signers = [];


    const transferInstruction = Token.createTransferInstruction(
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      new PublicKey(selectedNft),
      new PublicKey(toAddress),
      wallets.publicKey,
      [],
      1 
    );
    instructions.push(transferInstruction);


    const transaction = new Transaction().add(...instructions);
    await sendTransaction(connection, wallets, transaction, signers);
  };

  return (
    <div>
      {wallets ? (
        <>
          <p>Wallets connected: {wallets.publicKey.toBase58()}</p>
          <h2>NFT Accounts:</h2>
          <select onChange={handleNftSelect}>
            <option value="">--Select NFT Account--</option>
            {nftAccounts.map((nft) => (
              <option key={nft.pubkey.toBase58()} value={nft.pubkey.toBase58()}>
                {nft.pubkey.toBase58()}
              </option>
            ))}
          </select>
          <h2>Transfer NFT:</h2>
          <label htmlFor="toAddress">To Address:</label>
          <input
            type="text"
            id="toAddress"
            value={toAddress}
            onChange={handleToAddressChange}
          />
          <button onClick={handleSend}>Send</button>
        </>
      ) : (
        <button onClick={() => wallets.connect()}>Connect Wallets</button>
      )}
    </div>
  );
};


export default NftTransfer