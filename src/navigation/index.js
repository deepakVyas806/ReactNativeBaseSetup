import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BaseNavigationContainer } from '@react-navigation/native'
import Navigation from './main'
import SplashScreen from 'react-native-splash-screen'

const NavigationContainer = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const navRef = useRef();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#FFFFFF' }]}>
        <BaseNavigationContainer
          ref={navRef}
        >
          {/* <FlashMessage position="bottom" /> */}
          {/* <StatusBar backgroundColor={themeColor} /> */}
          <Navigation />
          {/* <BottomPlayer /> */}
        </BaseNavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default NavigationContainer