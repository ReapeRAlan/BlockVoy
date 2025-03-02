import { View, Text, StyleSheet } from 'react-native';
import { useWallet } from '@/hooks/useWallet';
import { PrimaryButton } from '@/components/ui/Buttons';

export default function WalletScreen() {
  const { balance, recharge } = useWallet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Billetera</Text>
      <Text style={styles.balance}>Saldo Actual: ${balance}</Text>
      <PrimaryButton title="Recargar Saldo" onPress={recharge} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  balance: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
});