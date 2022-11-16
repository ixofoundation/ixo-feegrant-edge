

import {
  cosmos,
  createSigningClient,
} from "@ixo/impactxclient-sdk";
import Long from 'long';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

 import { Coin } from "./types/coin";
 import { Timestamp } from "./types/timestamp";

 const feeGrantFunction = async (grantee: string,mnemonic:string ) => {


  const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "ixo",
  });

  const client = await createSigningClient(
    "https://testnet.ixo.earth/rpc/",
    signer
  );

  const BasicAllowance = cosmos.feegrant.v1beta1.BasicAllowance;
  const address = await signer.getAccounts();
  let timestamp = Timestamp.fromPartial({ seconds: new Long(1), nanos: 1 });
  let spendlimit = Coin.fromPartial({ denom: "ixo", amount: "1" });

  const allowance = {
    typeUrl: "/cosmos.feegrant.v1beta1.BasicAllowance",
    value: BasicAllowance.fromJSON({
      spendLimit: [spendlimit],
      expiration: timestamp,
    }),
  };

  const grant = cosmos.feegrant.v1beta1.Grant;
  const message = {
    typeUrl: "/cosmos.feegrant.v1beta1.Grant",
    value: grant.fromJSON({
      allowance: allowance,
      grantee: grantee,
      granter: address[0].address,
    }),
  };

  const gasUsed = await client.simulate(
    address[0].address,
    [message],
    "feegrant-daemon-ixo"
  );

  const gasPriceStep = {
    low: 0.01,
    average: 0.025,
    high: 0.04,
  };

  const low = gasUsed * gasPriceStep.low;
  const average = gasUsed * gasPriceStep.average;
  const high = gasUsed * gasPriceStep.high;

  const gas = {
    low: low,
    average: average,
    high: high,
  };

  const fee = {
    amount: [
      {
        denom: "uixo",
        amount: gas.high.toString(),
      },
    ],
    gas: gasUsed.toString(),
  };

  const response = client.signAndBroadcast(address[0].address, [message], fee);

  return response;
};

export default feeGrantFunction