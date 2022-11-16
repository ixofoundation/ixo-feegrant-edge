import { Coin } from './../node_modules/@cosmjs/proto-signing/node_modules/cosmjs-types/cosmos/base/v1beta1/coin.d';
import { Timestamp } from './../node_modules/@cosmjs/proto-signing/node_modules/cosmjs-types/google/protobuf/timestamp.d';
import { ixo,cosmos } from "@ixo/impactxclient-sdk";
import { getOfflineSignerProto as getOfflineSigner } from "cosmjs-utils";
import { StdFee } from "@cosmjs/amino";
const { createRPCQueryClient } = ixo.ClientFactory;
const client = await createRPCQueryClient({ rpcEndpoint: RPC_ENDPOINT });

// now you can query the cosmos modules
const balance = await client.cosmos.bank.v1beta1.allBalances({
  address: "ixo1addresshere",
});

import { chains } from "chain-registry";

const mnemonic =
  "unfold client turtle either pilot stock floor glow toward bullet car science";
const chain = chains.find(({ chain_name }) => chain_name === "impacthub");
const signer = await getOfflineSigner({
  mnemonic,
  chain,
});


const { fromPartial } = cosmos.feegrant.v1beta1.BasicAllowance;

let timestamp = Timestamp.fromPartial({seconds:1,nanos:1});
let spendlimit = Coin.fromPartial({denom:"ixo",amount:"1"});

const msg = fromPartial({spendLimit:[spendlimit],expiration:timestamp})

const fee: StdFee = {
  amount: [
    {
      denom: "ixo",
      amount: "864",
    },
  ],
  gas: "86364",
};

const response = await client.signAndBroadcast(address, [msg], fee);


