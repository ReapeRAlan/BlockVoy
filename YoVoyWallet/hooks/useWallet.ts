import { useState } from 'react';

export function useWallet() {
  const [balance, setBalance] = useState(0);
  const recharge = () => {/* Lógica de recarga */ setBalance(balance + 50);};
  return { balance, recharge };
}