import { ViewProps } from 'react-native'

export enum StatusType {
  SENT = 'sent',
  DRAFT = 'draft',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export interface StatusProps extends ViewProps {
  status: StatusType
}
