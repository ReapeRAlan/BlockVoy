import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#0066cc', padding: 15, borderRadius: 5, alignItems: 'center' },
  text: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});