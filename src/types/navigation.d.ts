export type RootStackParamList = {
  home: undefined
  quoteForm: undefined
  quoteDetails: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
