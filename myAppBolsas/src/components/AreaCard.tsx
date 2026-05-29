// src/components/AreaCard.tsx

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

type AreaCardProps = {
  area: string;
  onPress: () => void;
};

export default function AreaCard({ area, onPress }: AreaCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.circle} />
      <Text style={styles.areaText}>{area}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: '#BDBDBD',
    borderRadius: 25,
    marginBottom: 12,
  },
  areaText: {
    fontSize: 18,
    color: '#424242',
    fontWeight: '500',
    textAlign: 'center',
  },
});
