import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Linking,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Animated, {
  FadeInUp,
  FadeInDown,
  SlideInUp,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BalanceCard } from '@/components/common/BalanceCard';
import { TransactionList } from '@/components/common/TransactionList';
import { Theme } from '@/constants/app';

const { width, height } = Dimensions.get('window');

// Datos de ejemplo
const mockTransactions = [
  {
    id: '1',
    description: 'Recarga - $50',
    date: '2023-10-01',
    type: 'credit',
    unit: 'Estación Central',
    location: 'Centro, Ciudad de México',
  },
  {
    id: '2',
    description: 'Pago NFC - $20',
    date: '2023-10-02',
    type: 'debit',
    unit: 'Bus 101',
    location: 'Av. Insurgentes Sur',
  },
];

const NEWS_ITEMS = [
  {
    title: 'Nueva Ruta Express 2024',
    content:
      'Conoce nuestra nueva ruta directa al centro financiero. Esta ruta reduce los tiempos de viaje y conecta zonas estratégicas de la ciudad.',
    icon: 'bus',
    link: 'https://yovoy.com/rutas',
  },
  {
    title: 'Consejo de Seguridad',
    content:
      'Recarga tu saldo con anticipación para viajes sin contratiempos. ¡Mantente siempre un paso adelante!',
    icon: 'shield-alert',
  },
];

/* ===================== MODALES ===================== */

const NFCModalContent = ({ onClose }: { onClose: () => void }) => (
  <Animated.View
    style={styles.modalContent}
    entering={SlideInUp.springify().damping(15)}
    exiting={LightSpeedOutRight}
  >
    <MaterialCommunityIcons
      name="nfc"
      size={60}
      color={Theme.colors.primary}
      style={styles.modalIcon}
    />
    <Text style={styles.modalTitle}>Simulación de Pago NFC</Text>
    <Text style={styles.modalText}>
      Acerca tu dispositivo al lector para completar el pago.
    </Text>
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={() => {
        console.log('Se canceló el pago NFC');
        onClose();
      }}
      accessibilityLabel="Cancelar pago NFC"
      accessibilityRole="button"
    >
      <Text style={styles.secondaryButtonText}>Cancelar</Text>
    </TouchableOpacity>
  </Animated.View>
);

const TransactionDetailModal = ({
  transaction,
  onClose,
}: {
  transaction: any;
  onClose: () => void;
}) => {
  if (!transaction) return null;
  return (
    <Modal animationType="slide" transparent visible={!!transaction} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.detailModalContent}>
          <Text style={styles.modalTitle}>Detalle de la Transacción</Text>
          <Text style={styles.detailText}>Descripción: {transaction.description}</Text>
          <Text style={styles.detailText}>Fecha: {transaction.date}</Text>
          <Text style={styles.detailText}>Unidad: {transaction.unit}</Text>
          <Text style={styles.detailText}>Ubicación: {transaction.location}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Cerrar detalle de transacción"
            accessibilityRole="button"
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const FullTransactionsModal = ({
  visible,
  onClose,
  transactions,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  transactions: any[];
  onSelect: (tx: any) => void;
}) => (
  <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
    <View style={[styles.modalOverlay, { zIndex: 1000 }]}>
      <View style={styles.fullListModalContent}>
        <Text style={styles.modalTitle}>Todos los Movimientos</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log('Seleccionado movimiento:', item);
                onSelect(item);
              }}
              accessibilityLabel={`Movimiento: ${item.description}`}
              accessibilityRole="button"
            >
              <View style={styles.transactionItem}>
                <Text style={styles.transactionText}>
                  {item.description} - {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Cerrar lista de movimientos"
          accessibilityRole="button"
        >
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const PromotionsModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => (
  <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
    <View style={[styles.modalOverlay, { zIndex: 1000 }]}>
      <View style={styles.promotionsModalContent}>
        <Text style={styles.modalTitle}>Promociones Especiales</Text>
        <Text style={styles.modalText}>
          ¡Recarga ahora y obtén hasta un 10% de descuento en tu próximo viaje!
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Cerrar promociones"
          accessibilityRole="button"
        >
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const NewsDetailModal = ({
  news,
  onClose,
}: {
  news: any;
  onClose: () => void;
}) => {
  if (!news) return null;
  return (
    <Modal animationType="fade" transparent visible={!!news} onRequestClose={onClose}>
      <View style={[styles.modalOverlay, { zIndex: 1000 }]}>
        <View style={styles.detailModalContent}>
          <Text style={styles.modalTitle}>{news.title}</Text>
          <Text style={styles.modalText}>{news.content}</Text>
          {news.link && (
            <TouchableOpacity
              onPress={() => Linking.openURL(news.link)}
              accessibilityLabel="Visitar enlace de la noticia"
              accessibilityRole="button"
            >
              <Text style={[styles.modalText, { color: Theme.colors.primary, textDecorationLine: 'underline' }]}>
                Visitar enlace
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Cerrar detalle de noticia"
            accessibilityRole="button"
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/* ===================== HOME SCREEN ===================== */

export default function HomeScreen() {
  const [nfcModalVisible, setNfcModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [fullTransactionsVisible, setFullTransactionsVisible] = useState(false);
  const [promotionsVisible, setPromotionsVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const handleTransactionPress = (transaction: any) => {
    console.log("Transacción presionada:", transaction);
    setSelectedTransaction(transaction);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Encabezado con logo y mensaje */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo de la app"
          />
          <Text style={styles.greeting}>¡Bienvenido de nuevo!</Text>
          <Text style={styles.subtitle}>Tu saldo actual</Text>
        </Animated.View>

        {/* Tarjeta de Saldo */}
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <BalanceCard balance={150.5} />
        </Animated.View>

        {/* Acciones Rápidas */}
        <Animated.View
          style={styles.actionsContainer}
          entering={FadeInUp.duration(600).delay(400)}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              console.log("Pagar con NFC presionado");
              setNfcModalVisible(true);
            }}
            accessibilityLabel="Pagar con NFC"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="nfc" size={28} color="#fff" />
            <Text style={styles.actionButtonText}>Pagar con NFC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Theme.colors.secondary }]}
            onPress={() => {
              console.log("Promociones presionadas");
              setPromotionsVisible(true);
            }}
            accessibilityLabel="Ver promociones"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="tag-outline" size={28} color="#fff" />
            <Text style={styles.actionButtonText}>Promociones</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Modal NFC */}
        <Modal
          animationType="fade"
          transparent
          visible={nfcModalVisible}
          onRequestClose={() => setNfcModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <NFCModalContent onClose={() => setNfcModalVisible(false)} />
          </View>
        </Modal>

        {/* Modal de Detalle de Transacción */}
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />

        {/* Modal de Lista Completa de Movimientos */}
        <FullTransactionsModal
          visible={fullTransactionsVisible}
          onClose={() => setFullTransactionsVisible(false)}
          transactions={mockTransactions}
          onSelect={(tx) => setSelectedTransaction(tx)}
        />

        {/* Movimientos Recientes */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(600)}
          style={styles.sectionContainer}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Movimientos Recientes</Text>
            <TouchableOpacity
              onPress={() => setFullTransactionsVisible(true)}
              accessibilityLabel="Ver todos los movimientos"
              accessibilityRole="button"
            >
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <TransactionList
            transactions={mockTransactions}
            onPressItem={handleTransactionPress}
          />
        </Animated.View>

        {/* Noticias y Tips */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(800)}
          style={styles.sectionContainer}
        >
          <Text style={styles.sectionTitle}>Noticias y Tips</Text>
          {NEWS_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => {
                console.log("Noticia seleccionada:", item.title);
                setSelectedNews(item);
              }}
              accessibilityLabel={`Ver detalle de noticia: ${item.title}`}
              accessibilityRole="button"
            >
              <Animated.View
                style={styles.newsCard}
                entering={LightSpeedInLeft.delay(200 + index * 100)}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={Theme.colors.primary}
                />
                <View style={styles.newsTextContainer}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsContent} numberOfLines={2}>
                    {item.content}
                  </Text>
                </View>
                {item.link && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.link)}
                    style={styles.linkButton}
                    accessibilityLabel="Ver más de la noticia"
                    accessibilityRole="button"
                  >
                    <Text style={styles.linkText}>Ver más</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Modal para detalle de Noticia */}
        <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />

        {/* Sección adicional: Tips y Promociones */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(1200)}
          style={styles.sectionContainer}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tips y Promociones</Text>
            <TouchableOpacity
              onPress={() => alert('Mostrar más tips y promociones (modal)')}
              accessibilityLabel="Ver más tips y promociones"
              accessibilityRole="button"
            >
              <Text style={styles.seeAllText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipText}>• Aprovecha el pago NFC para evitar filas.</Text>
            <Text style={styles.tipText}>• Recarga durante promociones especiales y obtén descuentos.</Text>
            <Text style={styles.tipText}>• Consulta nuestras noticias para estar al tanto de novedades.</Text>
          </View>
        </Animated.View>

        {/* Modal de Promociones Especiales */}
        <PromotionsModal
          visible={promotionsVisible}
          onClose={() => setPromotionsVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
  },
  contentContainer: {
    paddingBottom: Theme.spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: Theme.spacing.md,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.lg,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Theme.spacing.xl,
  },
  actionButton: {
    backgroundColor: Theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: 50,
    gap: Theme.spacing.sm,
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.text,
  },
  seeAllText: {
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: Theme.spacing.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    elevation: 1,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  newsContent: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
  linkButton: {},
  linkText: {
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: Theme.spacing.lg,
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: Theme.spacing.md,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  secondaryButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xl,
  },
  secondaryButtonText: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  detailModalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: Theme.spacing.lg,
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: 50,
    marginTop: Theme.spacing.lg,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fullListModalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: Theme.spacing.lg,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    maxHeight: height * 0.7,
  },
  transactionItem: {
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionText: {
    fontSize: 16,
    color: Theme.colors.text,
  },
  tipsContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: Theme.spacing.md,
    padding: Theme.spacing.md,
  },
  tipText: {
    fontSize: 16,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  promotionsModalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: Theme.spacing.lg,
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
});

export default HomeScreen;
