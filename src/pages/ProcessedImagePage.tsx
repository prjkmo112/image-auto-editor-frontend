import { useEffect, useState } from "react"
import { Row, Col, Card, message, Image } from "antd"
import { ProcessedImageListResponse, procImageApi } from '../api'
import { useUIStore } from "@/stores/uiStore"
import ImageDetailDrawerComp from "./ImageDetailDrawerComp"

const ProcessedImagePage = () => {
  const { setIsLoading } = useUIStore()
  const [ messageApi, contextHolder ] = message.useMessage()

  const [ drawerOpenedImage, setDrawerOpenedImage ] = useState<ProcessedImageListResponse['items'][number] | null>(null)
  const [ processedImages, setProcessedImages ] = useState<ProcessedImageListResponse['items']>([])

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await procImageApi.getProcImageListApiProcImagesListGet()
        setProcessedImages(data.items ?? [])
        messageApi.success('Successfully got processed images')
      } catch (err) {
        messageApi.error('Failed to get processed images')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <>
      {contextHolder}

      <div style={{ marginTop: "2em" }}>
        <Row gutter={[24, 24]}>
          {processedImages.map((img) => (
            <Col span={8}>
              <Card
                key={img.id}
                hoverable
                style={{ padding: ".2rem", borderWidth: '2px' }}
                cover={
                  <Image
                    src={`${window.APP_CONFIG.IMG_SERVER_URL}/sliced/${img.url_id}`}
                    style={{ height: "20em", objectFit: "contain", backgroundColor: 'gray' }}
                  />
                }
              >
                <div onClick={() => setDrawerOpenedImage(img)}>
                  <Card.Meta
                    description={img.created_at}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <ImageDetailDrawerComp
        open={drawerOpenedImage !== null}
        drawerCloseFn={() => setDrawerOpenedImage(null)}
        width="80vw"
        imgViewInfo={{
          type: "split",
          leftUrl: `${window.APP_CONFIG.IMG_SERVER_URL}/marked/${drawerOpenedImage?.url_id}`,
          rightUrl: `${window.APP_CONFIG.IMG_SERVER_URL}/sliced/${drawerOpenedImage?.url_id}`,
          leftTitle: "Marked Image",
          rightTitle: "Sliced Image",
        }}
      />
    </>
  )
}

export default ProcessedImagePage