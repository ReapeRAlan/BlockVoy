import { View, Text, FlatList, StyleSheet } from 'react-native';

export function TransactionList({ transactions }) {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.description}</Text>
          <Text>{item.date}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});