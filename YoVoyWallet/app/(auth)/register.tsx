import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, BounceIn } from 'react-native-reanimated';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Enviamos el nombre junto con el resto de las credenciales
      await register({ name, ...credentials });
      router.replace('/(tabs)/home');
    } catch (err) {
      setError('Error al crear la cuenta. Por favor, verifica tus datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LinearGradient
          colors={['#f0f8ff', '#ffffff']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Logo o nombre de la App como placeholder */}
            <Animated.Text 
              style={styles.logoPlaceholder}
              entering={FadeInUp.duration(1000)}
            >
              :D
            </Animated.Text>

            {/* Título de la App */}
            <Animated.Text 
              style={styles.appTitle} 
              entering={FadeInUp.duration(1000).delay(200)}
            >
              YoVoyWallet
            </Animated.Text>

            {/* Título para crear cuenta */}
            <Animated.Text 
              style={styles.title} 
              entering={FadeInDown.duration(1000).delay(400)}
            >
              Crear Cuenta
            </Animated.Text>

            {/* Mensaje de error */}
            {error && (
              <Animated.Text 
                style={styles.errorText} 
                entering={BounceIn.duration(800)}
              >
                {error}
              </Animated.Text>
            )}

            {/* Contenedor del formulario */}
            <Animated.View 
              style={styles.formContainer} 
              entering={FadeInDown.duration(1000).delay(600)}
            >
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#888"
              />
              <AuthForm onSubmit={handleRegister} buttonText="Registrarse" />
            </Animated.View>

            {/* Enlace para ir al login */}
            <Animated.View entering={FadeInDown.duration(1000).delay(800)}>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Overlay de carga */}
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoPlaceholder: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0066cc',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  loginText: {
    textAlign: 'center',
    color: '#0066cc',
    textDecorationLine: 'underline',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
