import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from "@taquito/taquito";
import { writable } from 'svelte/store';

export const Tezos = new TezosToolkit("https://ghostnet.tezos.marigold.dev");

export let myAccount = writable(undefined);

const wallet = new BeaconWallet ({
  name: 'Training',
  preferredNetwork: "https://ghostnet.tezos.marigold.dev",
});

export async function connectWallet() {
  const a = await wallet.requestPermissions({
    network: {
      type: "ghostnet",
      rpcUrl: "https://ghostnet.tezos.marigold.dev",
    }
  });

  Tezos.setWalletProvider(wallet);
  myAccount.set(await wallet.client.getActiveAccount());
}

export async function getPKH() {
  return await wallet.getPKH();
}

async function getBalance() {
  const activeAccount = wallet.client.getActiveAccount();
  if (activeAccount) {
    return await Tezos.tz.getBalance(activeAccount.address);
  }
}

console.log("My tezos library loaded successfully");