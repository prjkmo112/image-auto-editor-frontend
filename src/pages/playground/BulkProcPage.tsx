import { InboxOutlined } from "@ant-design/icons"
import { Typography, Upload } from "antd"
import { procImageApi } from '@api'
import { useMessageStore } from "@/stores/messageStore"

const BulkProcPage: React.FC = () => {
  const { successMsg, infoMsg } = useMessageStore()

  return (
    <>
      <Typography.Title level={3}>Bulk Upload Dest Files</Typography.Title>
      <Typography.Paragraph>
        You can upload multiple files at once by dragging and dropping them into the area below or by clicking to select files.<br />
        {/* If you leave the page, the upload process will continue, but the list may disappear. */}
        Do not leave this page during the upload images.
      </Typography.Paragraph>

      <Upload.Dragger
        action={`${window.APP_CONFIG.REST_API_URL}/api/proc-images/bulk/remove`}
        multiple
        onChange={(info) => {
          infoMsg('Uploading file: ' + info.file.name)
        }}
        customRequest={async (options) => {
          const { onSuccess, onError, file, onProgress } = options

          try {
            const { data } = await procImageApi.procImageApiProcImagesRemovePost("sitecode=NAM", file as File)
            if (data && data.status === "ok") {
              onSuccess?.(data, new XMLHttpRequest())
              successMsg(`successfully uploaded file (${options.filename})`)
            } else onError?.(new Error("Upload failed"))
          } catch (error) {
            onError?.(error as Error)
          }
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Upload.Dragger>
    </>
  )
}

export default BulkProcPage