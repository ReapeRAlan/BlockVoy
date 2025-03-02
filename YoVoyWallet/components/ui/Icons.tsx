import Icon from 'react-native-vector-icons/MaterialIcons';

export function AppIcon({ name, size = 24, color = '#000' }) {
  return <Icon name={name} size={size} color={color} />;
}