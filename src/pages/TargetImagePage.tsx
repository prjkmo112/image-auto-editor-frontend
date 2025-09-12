import { useEffect, useState } from "react"
import { useUIStore } from "../stores/uiStore"
import { TargetImageListResponse, targetImagesApi } from "../api"
import { message } from "antd"

const TargetImagePage = () => {
  const { setIsLoading } = useUIStore()
  const [ messageApi, contextHolder ] = message.useMessage()

  const [ targetImages, setTargetImages ] = useState<TargetImageListResponse['items']>([])

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await targetImagesApi.getTargetImagesListApiTargetImagesListGet()
        console.log(data)
        setTargetImages(data.items ?? [])
        messageApi.success('Successfully got target images')
      } catch (err) {
        messageApi.error('Failed to get target images')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <>
      {contextHolder}
      <div>Target Image Page</div>
    </>
  )
}

export default TargetImagePage