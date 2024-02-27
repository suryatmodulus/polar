import {
  CategoryOutlined,
  FileDownloadOutlined,
  KeyOutlined,
  MovieOutlined,
} from '@mui/icons-material'

export enum VaultEntityType {
  LICENSE = 'License',
  DIGITAL = 'Digital',
  TUTORIAL = 'Tutorial',
  BUNDLE = 'Bundle',
}

export interface BaseVaultEntity {
  id: string
  slug: string
  name: string
  description: string
  type: VaultEntityType
  image?: string
  organization: {
    name: string
    avatarUrl: string
  }
  createdAt: Date
}

export interface BundleVaultEntity extends BaseVaultEntity {
  type: VaultEntityType.BUNDLE
  VaultEntitys: VaultEntity
}

export interface FileVaultEntity extends BaseVaultEntity {
  type: VaultEntityType.DIGITAL
  files: {
    name: string
    url: string
    size: number
  }[]
}

export interface TutorialVaultEntity extends BaseVaultEntity {
  type: VaultEntityType.TUTORIAL
  videos: {
    name: string
    url: string
    duration: number
  }[]
}

export interface LicenseVaultEntity extends BaseVaultEntity {
  type: VaultEntityType.LICENSE
  license: {
    key: string
  }
}

export type VaultEntity =
  | LicenseVaultEntity
  | TutorialVaultEntity
  | FileVaultEntity
  | BundleVaultEntity

export const resolveVaultEntityTypeIcon = (type: VaultEntityType) => {
  switch (type) {
    case VaultEntityType.LICENSE:
      return KeyOutlined
    case VaultEntityType.DIGITAL:
      return FileDownloadOutlined
    case VaultEntityType.TUTORIAL:
      return MovieOutlined
    case VaultEntityType.BUNDLE:
      return CategoryOutlined
    default:
      return () => null
  }
}
