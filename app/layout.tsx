import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/app/providers";
import { BottomNav } from "@/components/BottomNav";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "PixelMint",
  description: "Base Mini App for fixed-price NFT minting and manual transfer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta content="BASE_APP_ID_PLACEHOLDER" name="base:app_id" />
        <meta content="TALENT_VERIFICATION_PLACEHOLDER" name="talentapp:project_verification" />
      </head>
      <body>
        <Providers>
          <main className="app-shell">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}

