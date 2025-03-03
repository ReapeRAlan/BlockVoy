import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, BounceIn } from 'react-native-reanimated';

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      await login(credentials);
      router.replace('/(tabs)/home');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#e0f7fa', '#ffffff']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo con animación */}
          <Animated.Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            entering={FadeInUp.duration(1000)}
          />

          {/* Título de la App */}
          <Animated.Text 
            style={styles.appTitle} 
            entering={FadeInUp.duration(1000).delay(200)}
          >
            YoVoyWallet
          </Animated.Text>

          {/* Subtítulo: Iniciar Sesión */}
          <Animated.Text 
            style={styles.title} 
            entering={FadeInDown.duration(1000).delay(400)}
          >
            Iniciar Sesión
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

          {/* Formulario de autenticación */}
          <Animated.View entering={FadeInDown.duration(1000).delay(600)}>
            <AuthForm onSubmit={handleLogin} buttonText="Iniciar Sesión" />
          </Animated.View>

          {/* Separador "O" */}
          <Animated.Text 
            style={styles.orText} 
            entering={FadeInDown.duration(1000).delay(800)}
          >
            O
          </Animated.Text>

          {/* Login social */}
          <Animated.View entering={FadeInDown.duration(1000).delay(1000)}>
            <SocialLogin />
          </Animated.View>

          {/* Enlace a registro */}
          <Animated.View entering={FadeInDown.duration(1000).delay(1200)}>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
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
  );
}

const styles = StyleSheet.create({
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
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
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
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#0066cc',
    textDecorationLine: 'underline',
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
