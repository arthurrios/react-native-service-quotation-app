import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { Button } from '@/components'
import { FilterModal } from '@/components/FilterModal'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { QuoteCard } from '@/components/QuoteCard'
import { StatusType } from '@/components/Status/types'
import { quotesData } from '@/data'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  const [search, setSearch] = useState('')
  const [filterModalVisible, setFilterModalVisible] = useState(false)

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
              value={search}
              onChangeValue={(value) => setSearch(value as string)}
            />
          </View>
          <Button.Root
            variant="secondary"
            onPress={() => setFilterModalVisible(true)}
          >
            <Button.Icon name="filter" />
          </Button.Root>
        </View>
        <FlatList
          data={quotesData.getAll()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <QuoteCard quote={item} />}
          contentContainerStyle={{ gap: 8 }}
        />
      </View>
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        statuses={[StatusType.SENT, StatusType.DRAFT]}
        orderBy="mostRecent"
      />
    </View>
  )
}
