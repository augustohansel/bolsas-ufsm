import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type BolsaCardProps = {
  subarea: string;
  docente: string;
  pibic: number;
  probic: number;
  linkEdital: string;
  linkResultado: string;
};

export default function BolsaCard({ subarea, docente, pibic, probic, linkEdital, linkResultado }: BolsaCardProps) {
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    const options = ['Abrir Edital', 'Ver Resultado', 'Cancelar'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Ações Disponíveis",
        containerStyle: { backgroundColor: '#2A293D' },
        titleTextStyle: { color: '#FFF' },
        messageTextStyle: { color: '#A0A0B5' },
      },
      (buttonIndex) => {
        if (buttonIndex === 0) Linking.openURL(linkEdital);
        else if (buttonIndex === 1) Linking.openURL(linkResultado);
      }
    );
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card} activeOpacity={0.8}>
      <View style={styles.headerRow}>
        <Text style={styles.subarea}>{subarea}</Text>
        <Icon name="chevron-right" size={20} color="#FF6B9E" />
      </View>
      
      <View style={styles.docenteRow}>
        <Icon name="account-tie" size={16} color="#A0A0B5" />
        <Text style={styles.docente}>{docente}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.bolsasContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>PIBIC</Text>
          <Text style={styles.badgeValue}>{pibic}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: '#4DA8DA20' }]}>
          <Text style={[styles.badgeLabel, { color: '#4DA8DA' }]}>PROBIC</Text>
          <Text style={[styles.badgeValue, { color: '#4DA8DA' }]}>{probic}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A293D',
    padding: 20,
    marginBottom: 15,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3D3C54',
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subarea: { fontSize: 18, fontWeight: 'bold', color: '#FFF', flex: 1, marginRight: 10 },
  docenteRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  docente: { fontSize: 15, color: '#A0A0B5', marginLeft: 6 },
  divider: { height: 1, backgroundColor: '#3D3C54', marginVertical: 15 },
  bolsasContainer: { flexDirection: 'row' },
  badge: {
    backgroundColor: '#FF6B9E20',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  badgeLabel: { color: '#FF6B9E', fontSize: 12, fontWeight: 'bold', marginRight: 6 },
  badgeValue: { color: '#FF6B9E', fontSize: 14, fontWeight: '800' },
});