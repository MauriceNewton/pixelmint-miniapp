import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "PixelMint",
      preference: "smartWalletOnly",
    }),
    injected(),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [base.id]: http(),
  },
});

