import { View, Text, StyleSheet } from 'react-native';
import { BalanceCard } from '@/components/common/BalanceCard';
import { TransactionList } from '@/components/common/TransactionList';

export default function HomeScreen() {
  const mockTransactions = [
    { id: '1', description: 'Recarga - $50', date: '2023-10-01' },
    { id: '2', description: 'Pago NFC - $20', date: '2023-10-02' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a YoVoyWallet</Text>
      <BalanceCard balance={100} />
      <Text style={styles.subtitle}>Movimientos Recientes</Text>
      <TransactionList transactions={mockTransactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
});