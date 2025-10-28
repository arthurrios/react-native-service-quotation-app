import { FlatList, View } from 'react-native'
import { Button } from '@/components'
import { FilterModal } from '@/components/FilterModal'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/hooks/useQuotes'
import { colors } from '@/styles'

export function Home() {
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <HomeHeader />
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
          renderItem={({ item }) => <QuoteCard quote={item} />}
          contentContainerStyle={{ gap: 8 }}
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
