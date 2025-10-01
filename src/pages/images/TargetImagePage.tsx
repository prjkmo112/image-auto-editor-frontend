import { useEffect, useState } from "react"
import { useUIStore } from "../../stores/uiStore"
import { TargetImageListResponse, targetImagesApi } from "../../api"
import { Button, Card, Col, Image, Row, Tag } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import UploadModalComp from "@/components/UploadModalComp"
import ImageDetailDrawerComp from "@/components/ImageDetailDrawerComp"
import { useMessageStore } from "@/stores/messageStore"

const TargetImagePage = () => {
  const { setIsLoading } = useUIStore()
  const { successMsg, errorMsg } = useMessageStore()

  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ drawerOpenedImage, setDrawerOpenedImage ] = useState<TargetImageListResponse['items'][number] | null>(null)
  const [ targetImages, setTargetImages ] = useState<TargetImageListResponse['items']>([])

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await targetImagesApi.getTargetImagesListApiTargetImagesListGet()
        setTargetImages(data.items ?? [])
        successMsg('Successfully got target images')
      } catch (_) {
        errorMsg('Failed to get target images')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <>
      <Row>
        <Col span={12}>
          <Tag color="red">Inactive: Red border</Tag>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type="link" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Upload New Target Image</Button>
        </Col>
      </Row>

      <div style={{ marginTop: "2em" }}>
        <Row gutter={[24, 24]}>
          {targetImages.map((img) => (
            <Col span={8}>
              <Card
                key={img.id}
                hoverable
                style={{
                  padding: ".2rem",
                  borderColor: img.is_active ? '' : 'red',
                  borderWidth: '2px',
                }}
                cover={
                  <Image
                    src={`${window.APP_CONFIG.IMG_SERVER_URL}/target/${img.url_id}`}
                    style={{ height: "20em", objectFit: "contain" }}
                  />
                }
              >
                <div onClick={() => setDrawerOpenedImage(img)}>
                  <Card.Meta
                    title={img.name}
                    description={(
                      <div style={{ marginTop: '0.5rem', opacity: 0.5, fontStyle: "italic" }}>
                        <div>{img.created_at}</div>
                        <div>{img.tags?.map((v) => <Tag>{v}</Tag>)}</div>
                      </div>
                    )}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <UploadModalComp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ImageDetailDrawerComp
        open={drawerOpenedImage !== null}
        drawerCloseFn={() => setDrawerOpenedImage(null)}
        imgViewInfo={{
          type: "single",
          url: `${window.APP_CONFIG.IMG_SERVER_URL}/target/${drawerOpenedImage?.url_id}`,
        }}
      />
    </>
  )
}

export default TargetImagePage