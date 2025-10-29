import { FlatList, Text, View } from 'react-native'
import { Button } from '@/components'
import { FilterModal } from '@/components/FilterModal'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/hooks/useQuotes'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors, textStyles } from '@/styles'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  const {
    quotes,
    filters,
    modalVisible,
    tempStatuses,
    tempOrderBy,
    setSearch,
    openModal,
    closeModal,
    updateTempStatuses,
    updateTempOrderBy,
    applyModalFilters,
    resetModalFilters,
  } = useQuotes()

  function handleNewQuote() {
    navigation.navigate('quoteForm')
  }

  function handleQuotePress(quoteId: string) {
    navigation.navigate('quoteDetails', { quoteId })
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <HomeHeader onNewQuote={handleNewQuote} />
      <View style={{ paddingVertical: 24, paddingHorizontal: 20, gap: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input
              icon="search"
              placeholder="Título ou cliente"
              value={filters.search}
              onChangeValue={(value) => setSearch(value as string)}
            />
          </View>
          <Button.Root variant="secondary" onPress={openModal}>
            <Button.Icon name="filter" />
          </Button.Root>
        </View>
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuoteCard quote={item} onPress={() => handleQuotePress(item.id)} />
          )}
          contentContainerStyle={{ gap: 8, paddingBottom: 250 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 100,
                }}
              >
                <Text style={{ ...textStyles.textMd, color: colors.gray[500] }}>
                  Nenhum orçamento encontrado
                </Text>
              </View>
            )
          }}
        />
      </View>
      <FilterModal
        visible={modalVisible}
        onClose={closeModal}
        statuses={tempStatuses}
        orderBy={tempOrderBy}
        onReset={resetModalFilters}
        onApply={applyModalFilters}
        onStatusChange={updateTempStatuses}
        onOrderByChange={updateTempOrderBy}
      />
    </View>
  )
}
