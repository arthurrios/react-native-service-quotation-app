import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { QuoteItem } from '@/types/quote'
import { Button } from '../Button'
import { Input } from '../Input'
import { ModalComponent } from '../Modal'
import { styles } from './styles'

export interface QuoteItemModalProps {
  visible: boolean
  onClose: () => void
  onAddItem: (item: QuoteItem) => void
  quoteItem: QuoteItem | null
  onUpdateItem: (item: QuoteItem) => void
  onDeleteItem: (id: string) => void
}

export function QuoteItemModal({
  visible,
  onClose,
  onAddItem,
  quoteItem,
  onUpdateItem,
  onDeleteItem,
}: QuoteItemModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(1)

  // Initialize state when quoteItem changes or modal opens
  useEffect(() => {
    if (visible) {
      if (quoteItem) {
        setName(quoteItem.name || '')
        setDescription(quoteItem.description || '')
        setPrice(quoteItem.price || 0)
        setQty(quoteItem.qty || 1)
      } else {
        // Reset to default values for new item
        setName('')
        setDescription('')
        setPrice(0)
        setQty(1)
      }
    }
  }, [quoteItem, visible])

  function handleSave() {
    const itemData = {
      name,
      description,
      price,
      qty,
    }

    if (quoteItem) {
      // Update existing item
      onUpdateItem({ ...quoteItem, ...itemData })
      onClose()
    } else {
      // Add new item
      onAddItem(itemData as QuoteItem)
      onClose()
    }
  }

  function handleDelete() {
    if (quoteItem) {
      onDeleteItem(quoteItem.id)
      onClose()
    }
  }

  return (
    <ModalComponent
      title="Service"
      visible={visible}
      onClose={onClose}
      footer={
        <View style={styles.footer}>
          {quoteItem && (
            <Button.Root variant="danger" onPress={handleDelete}>
              <Button.Icon name="trash-2" />
            </Button.Root>
          )}
          <Button.Root
            variant="primary"
            onPress={handleSave}
            disabled={!name.trim()}
          >
            <Button.Icon name="check" />
            <Button.Title>Save</Button.Title>
          </Button.Root>
        </View>
      }
    >
      <View style={styles.content}>
        <Input
          placeholder="Name"
          value={name}
          onChangeValue={(value) => setName(value as string)}
        />
        <Input
          variant="textarea"
          value={description}
          placeholder="Description"
          onChangeValue={(value) => setDescription(value as string)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Input
            variant="currency"
            value={price}
            onChangeValue={(value) => {
              const numericValue =
                typeof value === 'string' ? Number(value) : value
              setPrice(numericValue)
            }}
            style={{ flex: 1 }}
          />
          <Input
            variant="quantity"
            value={qty}
            onChangeValue={(value) => {
              const numericValue =
                typeof value === 'string' ? Number(value) : value
              setQty(numericValue)
            }}
          />
        </View>
      </View>
    </ModalComponent>
  )
}
