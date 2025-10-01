import { useEffect, useState } from "react"
import { Row, Col, Card, Image, Pagination } from "antd"
import { ProcessedImageListResponse, procImageApi } from '@api'
import { useUIStore } from "@/stores/uiStore"
import ImageDetailDrawerComp from "@/components/ImageDetailDrawerComp"
import { useMessageStore } from "@/stores/messageStore"


const ITEMS_PER_PAGE = 8

const ProcessedImagePage = () => {
  const { setIsLoading } = useUIStore()
  const { successMsg, errorMsg } = useMessageStore()

  const [ drawerOpenedImage, setDrawerOpenedImage ] = useState<ProcessedImageListResponse['items'][number] | null>(null)
  const [ processedImages, setProcessedImages ] = useState<ProcessedImageListResponse['items']>([])
  const [ totalCnt, setTotalCnt ] = useState(ITEMS_PER_PAGE)

  const loadProcImages = async (page: number) => {
    try {
      setIsLoading(true)
      const { data } = await procImageApi.getProcImageListApiProcImagesListGet(page, ITEMS_PER_PAGE)
      setProcessedImages(data.items ?? [])
      setTotalCnt(data.cnt ?? ITEMS_PER_PAGE)
      successMsg('Successfully got processed images')
    } catch (_) {
      errorMsg('Failed to get processed images')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProcImages(1)
  }, [])

  return (
    <>
      <div style={{ marginTop: "2em" }}>
        <Row gutter={[24, 24]}>
          {processedImages.map((img) => (
            <Col span={6}>
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
                  <Card.Meta description={img.created_at} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: "2em" }}>
          <Pagination align="center" total={totalCnt} pageSize={ITEMS_PER_PAGE} onChange={p => loadProcImages(p)} />
        </div>
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