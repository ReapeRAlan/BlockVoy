import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useWallet } from '@/hooks/useWallet';
import { PrimaryButton } from '@/components/ui/Buttons';
import { LineChart } from 'react-native-chart-kit';
import { Theme } from '@/constants/app';

const screenWidth = Dimensions.get('window').width;

// Simulación de transacciones (puedes reemplazar este array con transactions desde useWallet)
const mockTransactions = [
  {
    id: '1',
    description: 'Recarga - $50',
    date: '2023-10-01',
    type: 'credit',
    unit: 'Estación Central',
    location: 'Centro, Ciudad de México',
  },
  {
    id: '2',
    description: 'Pago NFC - $20',
    date: '2023-10-02',
    type: 'debit',
    unit: 'Bus 101',
    location: 'Av. Insurgentes Sur',
  },
  {
    id: '3',
    description: 'Recarga - $100',
    date: '2023-10-03',
    type: 'credit',
    unit: 'Cajero Automático',
    location: 'Plaza Comercial',
  },
  {
    id: '4',
    description: 'Pago en Tienda - $15',
    date: '2023-10-04',
    type: 'debit',
    unit: 'Tienda de Conveniencia',
    location: 'Oxxo, Col. Centro',
  },
  {
    id: '5',
    description: 'Transferencia Recibida - $30',
    date: '2023-10-05',
    type: 'credit',
    unit: 'Cuenta de Ahorro',
    location: 'Banco XYZ',
  },
  {
    id: '6',
    description: 'Pago NFC - $10',
    date: '2023-10-06',
    type: 'debit',
    unit: 'Bus 105',
    location: 'Av. Reforma',
  },
];

// Simulación de datos para el gráfico histórico de saldo
const chartData = {
  labels: ['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'],
  datasets: [
    {
      data: [100, 150, 120, 180, 160,  // datos históricos simulados
        // El saldo actual se toma del hook, se mostrará como dato final
        // Aquí se asume que balance es un número
        // Si balance varía, el gráfico se actualizará automáticamente.
        0
      ],
      strokeWidth: 2,
    },
  ],
};

export default function WalletScreen() {
  // Se asume que useWallet devuelve balance, recharge y (opcionalmente) transactions.
  // Si transactions no viene del hook, usamos el array simulado.
  const { balance, recharge, transactions } = useWallet();
  // Si no hay transactions en el hook, usamos mockTransactions
  const walletTransactions = transactions && transactions.length > 0 ? transactions : mockTransactions;
  // Actualizamos el último dato del gráfico con el saldo actual
  const updatedChartData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        data: [
          ...chartData.datasets[0].data.slice(0, 5),
          balance,
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi Billetera</Text>
        </View>

        {/* Sección de Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Actual</Text>
          <Text style={styles.balanceValue}>${balance}</Text>
        </View>

        {/* Botón para recargar saldo */}
        <PrimaryButton title="Recargar Saldo" onPress={recharge} />

        {/* Sección de Gráfico Histórico */}
        <Text style={styles.chartTitle}>Histórico de Saldos</Text>
        <LineChart
          data={updatedChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#007AFF',
            },
          }}
          bezier
          style={styles.chart}
        />

        {/* Sección de Historial de Transacciones */}
        <Text style={styles.historyTitle}>Historial de Transacciones</Text>
        <View style={styles.transactionsContainer}>
          {walletTransactions && walletTransactions.length > 0 ? (
            walletTransactions.map((tx: any) => (
              <View key={tx.id} style={styles.transactionItem}>
                <Text style={styles.transactionDescription}>{tx.description}</Text>
                <Text style={styles.transactionDate}>{tx.date}</Text>
                <Text style={styles.transactionDetail}>
                  {tx.unit} - {tx.location}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noTransactions}>No hay transacciones registradas.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  contentContainer: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  balanceContainer: {
    backgroundColor: '#fff',
    padding: Theme.spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 18,
    color: Theme.colors.textSecondary,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginTop: Theme.spacing.sm,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    marginBottom: Theme.spacing.lg,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    elevation: 2,
  },
  transactionItem: {
    paddingVertical: Theme.spacing.sm,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: Theme.spacing.sm,
  },
  transactionDescription: {
    fontSize: 16,
    color: Theme.colors.text,
  },
  transactionDate: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  transactionDetail: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  noTransactions: {
    textAlign: 'center',
    fontSize: 16,
    color: Theme.colors.textSecondary,
    paddingVertical: Theme.spacing.md,
  },
});

