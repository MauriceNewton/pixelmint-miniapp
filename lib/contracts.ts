import { Attribution } from "ox/erc8021";

import { pixelMintAbi } from "@/lib/abi/pixelMintAbi";

export const PIXELMINT_CONTRACT_ADDRESS_PLACEHOLDER = "PIXELMINT_CONTRACT_ADDRESS_PLACEHOLDER";
export const PIXELMINT_CONTRACT_ADDRESS = "0x474d435ccd4f8cdd1e8e804753c2c38ca270ef91" as const;

export const BASE_APP_ID = 107;
export const BASE_APP_ID_PLACEHOLDER = "BASE_APP_ID_PLACEHOLDER";
export const TALENT_VERIFICATION_PLACEHOLDER = "TALENT_VERIFICATION_PLACEHOLDER";
export const PIXELMINT_APP_ID_PLACEHOLDER = "PIXELMINT_APP_ID_PLACEHOLDER";
export const GITHUB_TOKEN_PLACEHOLDER = "GITHUB_TOKEN_PLACEHOLDER";
export const VERCEL_TOKEN_PLACEHOLDER = "VERCEL_TOKEN_PLACEHOLDER";

// 这里替换为真实 Builder Code
export const BUILDER_CODE_PLACEHOLDER = "BUILDER_CODE_PLACEHOLDER";
export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE_PLACEHOLDER],
});

export const APP_NAME = "PixelMint";
export const pixelMintContract = {
  address: PIXELMINT_CONTRACT_ADDRESS,
  abi: pixelMintAbi,
} as const;

