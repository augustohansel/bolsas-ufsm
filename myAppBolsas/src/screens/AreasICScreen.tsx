import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'AreasIC'>;

const areasConhecimento = [
  { nome: "Ciências Agrárias", icone: "leaf", color: "#2BC97A" },
  { nome: "Ciências Biológicas", icone: "dna", color: "#4DA8DA" },
  { nome: "Ciências da Saúde", icone: "hospital-box", color: "#E84A5F" },
  { nome: "Ciências Exatas", icone: "atom", color: "#FF9A3C" },
  { nome: "Ciências Humanas", icone: "account-group", color: "#9B51E0" },
  { nome: "Sociais Aplicadas", icone: "scale-balance", color: "#F2994A" },
  { nome: "Engenharias", icone: "cog", color: "#56CCF2" },
  { nome: "Letras e Artes", icone: "book-open-variant", color: "#EB5757" },
  { nome: "Multidisciplinar", icone: "lightbulb-on", color: "#F2C94C" },
];

export default function AreasICScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Áreas de Atuação</Text>
        <Text style={styles.subtitle}>Selecione uma área para ver as bolsas disponíveis</Text>
      </View>

      <FlatList
        data={areasConhecimento}
        keyExtractor={(item) => item.nome}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.areaButton}
            onPress={() => navigation.navigate('Bolsas', { area: item.nome })}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
              <Icon name={item.icone} size={30} color={item.color} />
            </View>
            <Text style={styles.areaText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1B29' },
  header: { padding: 20, marginTop: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#A0A0B5', marginTop: 5 },
  listContent: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 30 },
  row: { justifyContent: 'space-between' },
  areaButton: {
    backgroundColor: '#2A293D',
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3C54',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  areaText: {
    fontSize: 14,
    color: '#E0E0E0',
    fontWeight: '600',
    textAlign: 'center',
  },
});