import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletContextProvider from "./components/WalletContextProvider";
import AirdropInput from "./components/AirdropInput";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 font-medium p-4">
      <WalletContextProvider>
        <header className="text-5xl text-center p-8">SolSprinkle</header>
        <section>
          <div className="border border-zinc-600 rounded-md max-w-xl mx-auto">
            <div className="p-6 flex items-center justify-between">
              <div className="text-lg">Connect to Wallet or Enter Address</div>
              <div className="">
                <WalletMultiButton />
              </div>
            </div>
            <AirdropInput />
          </div>
        </section>
        <Toaster className="bg-red-900"/>
      </WalletContextProvider>
    </div>
  );
};

export default App;
