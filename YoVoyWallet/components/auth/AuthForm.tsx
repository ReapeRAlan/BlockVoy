import { View, TextInput, StyleSheet } from 'react-native';
import { PrimaryButton } from '@/components/ui/Buttons';

export function AuthForm({ onSubmit, buttonText }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />
      <PrimaryButton title={buttonText} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});