import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import { Home } from '@/app/Home'
import { QuoteDetails } from '@/app/QuoteDetails'
import { QuoteForm } from '@/app/QuoteForm'

export type StackRoutesList = {
  home: undefined
  quoteForm: undefined | { quoteId: string }
  quoteDetails: { quoteId: string }
}

export type StackRoutesProps<T extends keyof StackRoutesList> =
  NativeStackScreenProps<StackRoutesList, T>

const Stack = createNativeStackNavigator<StackRoutesList>()

export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="quoteForm" component={QuoteForm} />
      <Stack.Screen name="quoteDetails" component={QuoteDetails} />
    </Stack.Navigator>
  )
}
