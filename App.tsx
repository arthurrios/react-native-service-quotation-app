import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from '@expo-google-fonts/lato'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Routes } from '@/routes'

// Import storage utils for development
if (__DEV__) {
  import('@/utils/storageUtils')
}

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return <Routes />
}
