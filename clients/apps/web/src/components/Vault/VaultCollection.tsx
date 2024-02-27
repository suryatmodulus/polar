import { VaultEntity } from './VaultEntity'

export interface VaultCollection {
  id: string
  name: string
  slug: string
  description: string
  entities: VaultEntity[]
  subscriptionTier:
    | {
        id: string
        name: string
      }
    | undefined
  organization: {
    name: string
    avatarUrl: string
  }
  createdAt: Date
}
