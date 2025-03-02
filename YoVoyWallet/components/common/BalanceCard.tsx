import { View, Text, StyleSheet } from 'react-native';

export function BalanceCard({ balance }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Saldo Actual</Text>
      <Text style={styles.amount}>${balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#0066cc', padding: 20, borderRadius: 10, alignItems: 'center' },
  label: { color: '#fff', fontSize: 16 },
  amount: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
});