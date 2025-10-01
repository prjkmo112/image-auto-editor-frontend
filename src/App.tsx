import React, { useEffect, useState } from "react"
import { ConfigProvider, Layout, Menu, message, Spin, theme } from "antd"
import type { ItemType, MenuItemType } from "antd/es/menu/interface"
import { FileAddOutlined, FileImageOutlined, PlayCircleOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { useUIStore } from "./stores/uiStore"
import { Route, Routes, useNavigate } from "react-router-dom"
import { PageRoutes } from "./routes"
import TargetImagePage from "./pages/images/TargetImagePage"
import SourceImagePage from "./pages/images/SourceImagePage"
import ProcessedImagePage from "./pages/images/ProcessedImagePage"
import MainLayout from "./layouts/MainLayout"
import BulkProcPage from "./pages/playground/BulkProcPage"
import { useMessageStore } from "./stores/messageStore"

const { Sider, Content } = Layout

const items: ItemType<MenuItemType>[] = [
  {
    key: 'image',
    label: 'Image',
    children: [
      {
        key: 'image/target-image',
        label: 'Target Image',
        icon: <FileAddOutlined />,
      },
      // {
      //   key: 'image/source-image',
      //   label: 'Source Image',
      //   icon: <FileExclamationFilled />,
      // },
      {
        key: 'image/processed-image',
        label: 'Processed Image',
        icon: <FileImageOutlined />,
      }
    ]
  },
  {
    key: "playground",
    label: "Playground",
    icon: <PlayCircleOutlined />,
    children: [
      {
        key: "playground/bulk-process",
        label: "Bulk Process",
        icon: <UnorderedListOutlined />
      }
    ]
  }
]

const App: React.FC = () => {
  const { isLoading } = useUIStore()
  const navigate = useNavigate()
  const [ messageApi, contextHolder ] = message.useMessage()
  const { setMessageApi } = useMessageStore()

  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG, colorBgMask }
  } = theme.useToken()

  useEffect(() => {
    setMessageApi(messageApi)
  }, [messageApi, setMessageApi])

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: colorBgContainer,
            colorBgContainer: colorBgContainer,
            borderRadiusLG: borderRadiusLG,
            colorBgMask: colorBgMask,
          }
        }
      }}
    >
      { contextHolder }
      <Layout style={{ minHeight: "100vh", minWidth: "100vw", overflow: "auto" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <img src="/icon.svg" alt="Logo" style={{ width: '2rem', margin: '1rem' }} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} onClick={(info) => navigate(info.key)} />
        </Sider>

        <Layout>
          <Content style={{ margin: '2rem' }}>
            <div
              style={{
                padding: '2rem',
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path={PageRoutes.TARGET_IMAGE} element={<TargetImagePage />} />
                  <Route path={PageRoutes.SOURCE_IMAGE} element={<SourceImagePage />} />
                  <Route path={PageRoutes.PROCESSED_IMAGE} element={<ProcessedImagePage />} />

                  <Route path={PageRoutes.BULK_PROCESS} element={<BulkProcPage />} />
                </Route>
              </Routes>
            </div>
          </Content>

          {/* <Footer>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer> */}
        </Layout>
      </Layout>

      <Spin spinning={isLoading} tip="Loading..." size="large" fullscreen />
    </ConfigProvider>
  )
}

export default App