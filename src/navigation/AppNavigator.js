import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nManager } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import BusinessesScreen from '../screens/BusinessesScreen';
import BusinessDetailScreen from '../screens/BusinessDetailScreen';
import ProductsScreen from '../screens/ProductsScreen';
import SecondHandScreen from '../screens/SecondHandScreen';
import SecondHandDetailScreen from '../screens/SecondHandDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

import { COLORS } from '../constants/theme';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.beige,
          },
          headerTintColor: COLORS.black,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'העיר שלי' }}
        />
        <Stack.Screen
          name="Businesses"
          component={BusinessesScreen}
          options={{ title: 'עסקים' }}
        />
        <Stack.Screen
          name="BusinessDetail"
          component={BusinessDetailScreen}
          options={({ route }) => ({ title: route.params?.business?.name || 'פרטי עסק' })}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ title: 'מוצרים' }}
        />
        <Stack.Screen
          name="SecondHand"
          component={SecondHandScreen}
          options={{ title: 'יד שנייה' }}
        />
        <Stack.Screen
          name="SecondHandDetail"
          component={SecondHandDetailScreen}
          options={{ title: 'פרטי מוצר' }}
        />
        <Stack.Screen
          name="Events"
          component={EventsScreen}
          options={{ title: 'אירועים' }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ title: 'פרטי אירוע' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
