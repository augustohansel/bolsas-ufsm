// src/screens/HomeScreen.tsx

import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const tiposDeBolsas = [
  { id: 'fipe', nome: 'Bolsas FIPE', icon: 'school', color: '#4DA8DA' }, 
  { id: 'ic_unificado', nome: 'IC Unificado', icon: 'flask', color: '#E84A5F' }, 
  { id: 'pibic_af', nome: 'Ações Afirmativas', icon: 'people', color: '#FF9A3C' }, 
  { id: 'pibic_em', nome: 'Ensino Médio', icon: 'book', color: '#2BC97A' }, 
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bolsas UFSM</Text>
          <Text style={styles.headerSubtitle}>
            Classifique e encontre as oportunidades de pesquisa
          </Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={tiposDeBolsas}
            keyExtractor={(item) => item.id}
            numColumns={2} 
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  if (item.id === 'ic_unificado') {
                    navigation.navigate('AreasIC');
                  } else {
                    alert(`Tela para ${item.nome} ainda não implementada.`);
                  }
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={28} color="#FFF" />
                </View>
                <Text style={styles.cardText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Image
          source={require('../../assets/BrasaoMonograma_horizontal_solido branco.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B29', 
  },
  headerBackground: {
    backgroundColor: '#FF6B9E', 
    height: 220,
    borderBottomLeftRadius: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFE5EC',
    lineHeight: 20,
    maxWidth: '80%',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#2A293D',
    width: '48%', 
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#A0A0B5',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.8, 
  },
});