export enum StatusType {
  SENT = 'sent',
  DRAFT = 'draft',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export interface StatusProps {
  status: StatusType
}
