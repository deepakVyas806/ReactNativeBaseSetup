import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drawer_Content from '../components/Drawer_Content';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '../config/vector_icons';

export default function Navigation() {
  const MainStack = createNativeStackNavigator();
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <MainStack.Navigator
        initialRouteName={
          // userData ? 
          "DrawerNavigator"
          // : 'Login'
        }>
        <MainStack.Screen name="DrawerNavigator" options={{ headerShown: false }} component={DrawerNavigation} />
      </MainStack.Navigator>
    </View>
  )
}

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <Drawer_Content {...props} />}
        screenOptions={{
          drawerStyle: {
            width: '85%'
          },
        }}
      >
        <Drawer.Screen name="Dashboard" component={BottomTabNavigator} options={{ headerShown: false }} />

      </Drawer.Navigator>
    </>
  )
}
const Dashboard = () => {
  return (
    <View>
      <Text>
        Dashboard
      </Text>
    </View>
  )
}
const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator(); // To use Normal Bottom Tab
  // const BottomTab = createMaterialBottomTabNavigator(); // To use Material Bottom Tab
  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#e35375',
          tabBarStyle: {
            // backgroundColor:'',
            height: 60,
            paddingTop: 5
          },
          tabBarLabelStyle: {
            marginBottom: 5
          }
        }}
      // activeColor='#e35375'
      // activeIndicatorStyle={{
      //   backgroundColor: '#fcebef'
      // }}
      // headerMode="none"
      // barStyle={{ backgroundColor: 'white', borderColor: '#272727'}}
      // screenOptions={{
      //   tabBarLabel: ''
      // }}
      >
        <BottomTab.Screen
          name="Home"
          component={Dashboard}
          listeners={({ navigation, route }) => ({})}
          options={{
            title: 'Home',
            // tabBarLabel: ({ focused }) => { return (<>{!focused && <TabLableText lable={'Home'} />}</>) },
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="home" color={color} size={focused ? 30 : 25} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Calender"
          component={Dashboard}
          listeners={({ navigation, route }) => ({})}
          options={{
            title: 'Calender',
            // tabBarLabel: ({ focused }) => { return (<>{!focused && <TabLableText lable={'Calender'} />}</>) },
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={focused ? 28 : 25} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Community"
          component={Dashboard}
          listeners={({ navigation, route }) => ({})}
          options={{
            title: 'Community',
            // tabBarLabel: ({ focused }) => { return (<>{!focused && <TabLableText lable={'Community'} />}</>) },
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={focused ? 28 : 25} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={Dashboard}
          listeners={({ navigation, route }) => ({})}
          options={{
            title: 'Profile',
            // tabBarLabel: ({ focused }) => { return (<>{!focused && <TabLableText lable={'Profile'} />}</>) },
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="account" color={color} size={focused ? 28 : 25} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}
const TabLableText = (props: any) => {
  return (
    <View style={{
      marginBottom: 5
    }}>
      <Text style={{
        fontSize: 10,
        fontWeight: '600'
      }}>{props.lable}</Text>
    </View>
  )
}