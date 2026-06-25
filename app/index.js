import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getDaysUntilDue } from '../utils/dateUtils';
import { getServiceIcon } from '../utils/icons';
import { getSubscriptions } from '../utils/storage';

export default function HomeScreen() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadSubscriptions();
    }, [])
  );

  const loadSubscriptions = async () => {
    const subs = await getSubscriptions();
    setSubscriptions(subs);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#111827' }}>

      {/* Título */}
      <Text style={[styles.title]}>
        Subtrack
      </Text>

      {/* Total mensal */}
      <Text style={[styles.subtitle]}>
        Total mensal: R$ {subscriptions.reduce((acc, s) => acc + s.amount, 0).toFixed(2)}
      </Text>

      {/* Botão adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-subscription')}
      >
        <Text style={styles.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>

      {/* Lista */}
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadSubscriptions} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/subscription/details',
                params: {
                  id: item.id,
                  name: item.name,
                  amount: item.amount,
                  dueDay: item.dueDay,
                  category: item.category,
                  paymentMethod: item.paymentMethod,
                  notes: item.notes,
                  status: item.status,
                  periodicity: item.periodicity,
                },
              })
            }
          >
            <View style={[
              styles.card,
            ]}>
              {/* Ícone dinâmico */}
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                {getServiceIcon(item.name, 40)}
              </View>

              {/* Nome */}
              <Text style={[styles.cardTitle]}>
                {item.name}
              </Text>

              {/* Valor + vencimento */}
              <Text style={[styles.cardSubtitle]}>
                R$ {item.amount.toFixed(2)} — vence em {getDaysUntilDue(item.dueDay)} dias
              </Text>

              {/* Tipo de pagamento */}
              {item.paymentMethod ? (
                <Text style={[styles.cardSubtitle]}>
                  💳 {item.paymentMethod}
                </Text>
              ) : null}

              {/* Notas */}
              {item.notes ? (
                <Text style={[styles.cardSubtitle]}>
                  📝 {item.notes}
                </Text>
              ) : null}

              {/* Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 8,
    color: '#ffffff',
  },
  subtitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#141d31',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 6,
    color: '#6B7280',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
