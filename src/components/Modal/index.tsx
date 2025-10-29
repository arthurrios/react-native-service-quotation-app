import { ReactNode } from 'react'
import { Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles'
import { Icon } from '../Icon'
import { styles } from './styles'

export interface ModalComponentProps extends Omit<ModalProps, 'children'> {
  visible: boolean
  onClose: () => void
  title?: string
  showCloseButton?: boolean
  children: ReactNode
  footer?: ReactNode
}

export function ModalComponent({
  visible,
  onClose,
  title,
  showCloseButton = true,
  children,
  footer,
  ...props
}: ModalComponentProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.headerTitle}>{title}</Text>}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose}>
                  <Icon name="multiply" size={24} color={colors.gray[600]} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={styles.content}>{children}</View>
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </View>
    </Modal>
  )
}
