import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StatusBar } from 'react-native'; 

import HomeScreen from './src/screens/HomeScreen';
import AreasICScreen from './src/screens/AreasICScreen';
import BolsasScreen from './src/screens/BolsasScreen';

export type RootStackParamList = {
  Home: undefined;
  AreasIC: undefined;
  Bolsas: { area: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#1C1B29" />
        
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#1C1B29',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              navigation.canGoBack() ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 8, marginLeft: 4, marginRight: 8, bottom: 2 }}
                  activeOpacity={0.6}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ) : null
            ),
          })}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
            name="AreasIC" 
            component={AreasICScreen} 
            options={{ title: 'IC Unificado' }} 
          />
          
          <Stack.Screen 
            name="Bolsas" 
            component={BolsasScreen} 
            options={{ title: 'Bolsas' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}