import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "preact/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useToast } from "@/hooks/use-toast";

const AirdropInput = () => {
  const { connection } = useConnection();
  const { publicKey, disconnecting } = useWallet();
  const [address, setAddress] = useState("");
  const [dropAmnt, setDropAmnt] = useState(null);
  const { toast } = useToast()

  useEffect(() => {
    if (!connection) {
      setAddress(null);
      console.log("Not connected to the network!");
    } else if (!publicKey) {
      console.log("Not connected to wallet!");
    } else {
      if (disconnecting) {
        console.log("disconnecting");
        setAddress(address === publicKey.toBase58() ? "" : address);
      } else {
        setAddress(publicKey.toBase58());
      }
    }
    if (dropAmnt) {
      setDropAmnt(null);
    }
  }, [connection, publicKey, disconnecting]);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleClick = (e) => {
    setDropAmnt(e.target.textContent);
  };

  const handleConfirm = async (e) => {
    console.log(address, dropAmnt);
    try {
      await connection.requestAirdrop(
        new PublicKey(address),
        LAMPORTS_PER_SOL * dropAmnt
      );
      toast({
        description: `${dropAmnt} SOL airdropped to ${address}`,
        className: "bg-zinc-800 border-zinc-700 text-zinc-200"
      })
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Airdrop failed!",
        description: "You've either reached your airdrop limit today or the airdrop faucet has run dry. Please visit https://faucet.solana.com for alternate sources of test SOL",
      })
    }    
  };

  console.log("Address", address);

  return (
    <div className="">
      <div className="p-6 pt-0 flex items-center justify-between gap-4">
        <input
          type="text"
          name="address"
          id="address"
          className="required w-full font-normal p-2 border border-zinc-700 rounded bg-transparent text- placeholder:italic placeholder:text-sm focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline"
          placeholder="Public Address"
          onChange={handleChange}
          value={address}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border border-zinc-600 w-28 rounded-md p-2 px-4 font-medium hover:bg-zinc-700">
              {dropAmnt ? `${dropAmnt} SOL` : "Amount"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium">
            <DropdownMenuLabel>In SOL</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <div className="grid grid-cols-2">
              <DropdownMenuItem
                className="flex justify-center items-center"
                onClick={handleClick}
              >
                0.5
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-center items-center"
                onClick={handleClick}
              >
                1
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-center items-center"
                onClick={handleClick}
              >
                1.5
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-center items-center"
                onClick={handleClick}
              >
                2
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-6 pt-0 flex items-center justify-between">
        <button
          disabled={!address}
          className="w-full bg-zinc-200 text-zinc-900 border border-zinc-600 rounded-md p-2 px-4 font-medium hover:bg-zinc-700 disabled:bg-zinc-600"
          onClick={handleConfirm}
        >
          Confirm Airdrop
        </button>
      </div>
    </div>
  );
};

export default AirdropInput;
