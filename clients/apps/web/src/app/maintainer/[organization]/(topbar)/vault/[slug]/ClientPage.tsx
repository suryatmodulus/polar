'use client'

import { DashboardBody } from '@/components/Layout/DashboardLayout'
import { useParams } from 'next/navigation'
import { Input, ShadowBoxOnMd, TextArea } from 'polarkit/components/ui/atoms'
import { vaultMocks } from '../data'

const ClientPage = () => {
  const { slug } = useParams()
  const entity = vaultMocks.find((entity) => entity.slug === slug)

  if (!entity) {
    return null
  }

  return (
    <DashboardBody>
      <ShadowBoxOnMd className="flex w-2/3 flex-col gap-y-6">
        <h2 className="text-lg font-medium">Edit Product</h2>
        <div className="flex flex-col items-start gap-y-6">
          <div className="flex min-w-[260px] flex-col gap-y-2">
            <span className="text-sm">Name</span>
            <Input placeholder="Name" defaultValue={entity.name} />
          </div>
          <div className="flex w-full flex-col gap-y-2">
            <span className="text-sm">Description</span>
            <TextArea
              placeholder="Description"
              defaultValue={entity.description}
            />
          </div>
        </div>
      </ShadowBoxOnMd>
    </DashboardBody>
  )
}

export default ClientPage
