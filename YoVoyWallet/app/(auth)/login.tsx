import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { router } from 'expo-router';
export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <AuthForm onSubmit={login} buttonText="Iniciar Sesión" />
      <Text style={styles.orText}>O</Text>
      <SocialLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  orText: { textAlign: 'center', marginVertical: 10 },
});
const handleLogin = () => {
  // Aquí va tu lógica de autenticación (por ejemplo, verificar credenciales)
  router.replace('/(tabs)/home');
};