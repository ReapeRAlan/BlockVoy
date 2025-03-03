import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';

const FAQ_ITEMS = [
  {
    id: '1',
    question: '¿Cómo recargo mi saldo?',
    answer: 'Para recargar tu saldo, ingresa a la sección de Billetera y selecciona "Recargar Saldo". Puedes hacerlo mediante tarjeta, SPEI o en puntos autorizados.',
  },
  {
    id: '2',
    question: '¿Qué hago si pierdo mi teléfono?',
    answer: 'Si pierdes tu teléfono, contacta a nuestro soporte para recuperar tu billetera a través de tu cuenta. Asegúrate de tener configurado un método de respaldo.',
  },
  {
    id: '3',
    question: '¿Puedo usar la app sin conexión?',
    answer: 'La app requiere conexión para actualizar tu saldo y procesar pagos, aunque algunos datos se almacenan localmente para ofrecer una experiencia fluida.',
  },
  {
    id: '4',
    question: '¿Cómo puedo ver el historial de mis transacciones?',
    answer: 'Puedes consultar el historial completo de transacciones en la sección "Billetera", donde se registran todos los movimientos realizados.',
  },
];

export default function ExploreScreen() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Encabezado */}
      <Text style={styles.header}>Explorar</Text>
      
      {/* Sección de Preguntas Frecuentes */}
      <Text style={styles.title}>Preguntas Frecuentes</Text>
      {FAQ_ITEMS.map(item => (
        <View key={item.id} style={styles.faqItem}>
          <TouchableOpacity 
            onPress={() => toggleItem(item.id)} 
            style={styles.questionContainer}
            accessibilityRole="button"
            accessibilityLabel={`Pregunta: ${item.question}`}
          >
            <Text style={styles.questionText}>{item.question}</Text>
          </TouchableOpacity>
          {expandedItem === item.id && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Sección Adicional con Enlaces y Recursos */}
      <View style={styles.additionalSection}>
        <Text style={styles.additionalTitle}>Más Información</Text>
        <TouchableOpacity style={styles.additionalItem} accessibilityRole="button">
          <Text style={styles.additionalText}>Tutoriales de Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalItem} accessibilityRole="button">
          <Text style={styles.additionalText}>Novedades y Actualizaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalItem} accessibilityRole="button">
          <Text style={styles.additionalText}>Contacto y Soporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  faqItem: {
    marginBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  questionContainer: {
    paddingVertical: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  answerContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  answerText: {
    fontSize: 15,
    color: '#555',
  },
  additionalSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  additionalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  additionalItem: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  additionalText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
