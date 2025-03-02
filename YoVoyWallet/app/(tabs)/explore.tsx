import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preguntas Frecuentes</Text>
      <Text style={styles.item}>¿Cómo recargo mi saldo?</Text>
      <Text style={styles.item}>¿Qué hago si pierdo mi teléfono?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 16, marginVertical: 5 },
});