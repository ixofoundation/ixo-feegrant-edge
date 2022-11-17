
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import {
  defaultRegistryTypes as defaultStargateTypes,
  SigningStargateClient,

} from "@cosmjs/stargate";
import { BasicAllowance } from "cosmjs-types/cosmos/feegrant/v1beta1/feegrant";
import { MsgGrantAllowance } from "cosmjs-types/cosmos/feegrant/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";


const feeGrantFunction = async (grantee: string,mnemonic:string ) => {
  const myRegistry = new Registry(defaultStargateTypes);
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    { prefix: "ixo" }, 
  );
  const client = await SigningStargateClient.connectWithSigner(
    "https://testnet.ixo.earth/rpc/", // Replace with your own RPC endpoint
    signer,
    { registry: myRegistry },
  );
const address = await signer.getAccounts();

  // Create feegrant allowance
  const allowance: Any = {
    typeUrl: "/cosmos.feegrant.v1beta1.BasicAllowance",
    value: Uint8Array.from(
      BasicAllowance.encode({
        spendLimit: [
          {
            denom: "uixo",
            amount: "100000",
          },
        ],
      }).finish(),
    ),
  };
  const grantMsg = {
    typeUrl: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
    value: MsgGrantAllowance.fromPartial({
      granter: address[0].address,
      grantee: grantee,
      allowance: allowance,
    }),
  };
  const response = await client.signAndBroadcast(address[0].address, [grantMsg], "auto", "Create allowance ixo");

return response

}
export default feeGrantFunction