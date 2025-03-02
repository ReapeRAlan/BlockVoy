import { View, StyleSheet } from 'react-native';
import { PrimaryButton } from '@/components/ui/Buttons';

export function SocialLogin() {
  return (
    <View style={styles.container}>
      <PrimaryButton title="Iniciar con Google" onPress={() => {}} />
      <PrimaryButton title="Iniciar con Facebook" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 10 },
});