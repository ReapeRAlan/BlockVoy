import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const login = () => {/* Lógica de login */};
  const register = () => {/* Lógica de registro */};
  return { user, login, register };
}