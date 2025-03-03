import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { PrimaryButton } from '@/components/ui/Buttons';

export function AuthForm({ onSubmit, buttonText }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <PrimaryButton title={buttonText} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});