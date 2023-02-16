/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import MyDictionary from './screens/MyDictionary';
import Play from './screens/Play';
import Settings from './screens/Settings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            tabBarLabel: ({focused}) => {
              return focused ? (
                <Text style={{fontWeight: 'bold', color: '#ee5067'}}>
                  {route.name}
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: '#c4c4c4',
                  }}>
                  {route.name}
                </Text>
              );
            },
          })}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="home-sharp"
                  color={focused ? '#ee5067' : '#000'}
                  size={focused ? 30 : 30}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Games"
            component={Play}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="game-controller-sharp"
                  color={focused ? '#ee5067' : '#000'}
                  size={focused ? 30 : 30}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MyDictionary"
            component={MyDictionary}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="book-sharp"
                  color={focused ? '#ee5067' : '#000'}
                  size={focused ? 30 : 30}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Icon
                  name="cog-sharp"
                  color={focused ? '#ee5067' : '#000'}
                  size={focused ? 30 : 30}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
