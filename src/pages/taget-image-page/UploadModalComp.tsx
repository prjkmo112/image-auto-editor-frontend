import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, message, Modal, Select, Space, Upload, UploadFile } from "antd"
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { useUIStore } from "@/stores/uiStore"
import { targetImagesApi } from "@/api"

interface UploadModalCompProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const UploadModalComp: React.FC<UploadModalCompProps> = (props) => {
  const navigate = useNavigate()
  const { setIsLoading } = useUIStore()
  const [ form ] = Form.useForm()
  const [ messageApi, contextHolder ] = message.useMessage()

  const [ fileList, setFileList ] = useState<UploadFile[]>([])

  const uploadImg = async (formValues: any) => {
    try {
      setIsLoading(true)
      console.log('Form Values:', formValues)
      await targetImagesApi.createTargetImageApiTargetImagesRegisterPost(
        formValues.name,
        formValues.tags.join(',') || "",
        formValues.file?.file,
        formValues.is_active
      )

      props.setIsModalOpen(false)
      form.resetFields()
      setFileList([])

      navigate(0)

      messageApi.success('Successfully uploaded image')
    } catch (error) {
      messageApi.error('Failed to upload image')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {contextHolder}

      <Modal
        title="Upload Target Image"
        open={props.isModalOpen}
        okText="Upload"
        width="50vw"
        onOk={() => form.submit()}
        onCancel={() => props.setIsModalOpen(false)}
        style={{ gap: '1rem' }}
      >
        <Space direction="vertical" size="small" style={{ width: '60%' }}>
          <Form
            form={form}
            layout="vertical"
            wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }}
            onFinish={uploadImg}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="is_active" label="Is Active" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: 'Active', value: true },
                  { label: 'Inactive', value: false },
                ]}
              />
            </Form.Item>

            <Form.List name="tags">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item key={field.key} label={index === 0 ? 'Tags' : ''}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle
                      >
                        <Input placeholder="tag" style={{ width: "60%" }} />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ marginLeft: '.5rem', fontSize: "1.2rem", opacity: .5 }}
                      />
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      Add Tag
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item name="file" label="Image File" rules={[{ required: true }]}>
              <Upload
                name="file"
                multiple={false}
                beforeUpload={() => false}
                onChange={(info) => setFileList(info.fileList)}
                onRemove={() => setFileList([])}
              >
                <Button disabled={fileList.length >= 1} icon={<UploadOutlined />}>Click to Select</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Space>
      </Modal>
    </>
  )
}

export default UploadModalComp