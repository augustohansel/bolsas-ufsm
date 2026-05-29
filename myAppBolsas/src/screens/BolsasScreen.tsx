// src/screens/BolsasScreen.tsx

import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import BolsaCard from '../components/BolsaCard';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Bolsas'>;

type Bolsa = {
  subarea: string;
  docente: string;
  pibic: number;
  probic: number;
  linkEdital: string;
  linkResultado: string;
};

const areaMap: { [key: string]: string } = {
  "Ciências Agrárias": "ciencias-agrarias",
  "Ciências Biológicas": "ciencias-biologicas",
  "Ciências da Saúde": "ciencias-da-saude",
  "Ciências Exatas e da Terra": "ciencias-exatas-e-da-terra",
  "Ciências Humanas": "ciencias-humanas",
  "Ciências Sociais Aplicadas": "ciencias-sociais-aplicadas",
  "Engenharias": "engenharias",
  "Linguística, Letras e Artes": "linguistica-letras-e-artes",
  "Multidisciplinar": "multidisciplinar",
};

export default function BolsasScreen({ route, navigation }: Props) {
  const { area } = route.params;
  const [bolsas, setBolsas] = useState<Bolsa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBolsas() {
      try {
        const areaParam = areaMap[area] || area;
        
        const response = await axios.get(`https://curly-impalas-slide.loca.lt/api/v1/bolsas/${encodeURIComponent(areaParam)}`);

        const bolsasFiltradas = response.data
          .map((bolsa: any) => ({
            subarea: bolsa.Subarea,
            docente: bolsa.Docente,
            pibic: bolsa.PIBIC,
            probic: bolsa.PROBIC,
            linkEdital: bolsa.LinkEdital,
            linkResultado: bolsa.LinkResultado,
          }))
          .filter((bolsa: Bolsa) => bolsa.subarea.trim() !== '' && bolsa.docente.trim() !== '');

        setBolsas(bolsasFiltradas);
      } catch (error) {
        console.error('Erro ao buscar bolsas:', error);
        alert('Erro ao carregar bolsas. Verifique a conexão com o servidor.');
      } finally {
        setLoading(false);
      }
    }

    fetchBolsas();
  }, [area]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#FF6B9E" />
        <Text style={styles.loadingText}>Buscando bolsas na UFSM...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{area}</Text>

      {bolsas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma bolsa encontrada para esta área no momento.</Text>
        </View>
      ) : (
        <FlatList
          data={bolsas}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <BolsaCard
              subarea={item.subarea}
              docente={item.docente}
              pibic={item.pibic}
              probic={item.probic}
              linkEdital={item.linkEdital}
              linkResultado={item.linkResultado}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 20,
    backgroundColor: '#1C1B29', 
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1B29',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#A0A0B5',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 20,
    marginBottom: 20, 
    color: '#FFFFFF' 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#A0A0B5',
    textAlign: 'center',
    lineHeight: 24,
  }
});