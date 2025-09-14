import React, { useState } from "react"
import { ConfigProvider, Layout, Menu, Spin, theme } from "antd"
import type { ItemType, MenuItemType } from "antd/es/menu/interface"
import { FileAddOutlined, FileExclamationFilled, FileImageOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { useUIStore } from "./stores/uiStore"
import { Route, Routes, useNavigate } from "react-router-dom"
import { PageRoutes } from "./routes"
import TargetImagePage from "./pages/TargetImagePage"
import SourceImagePage from "./pages/SourceImagePage"
import ProcessedImagePage from "./pages/ProcessedImagePage"
import MainLayout from "./layouts/MainLayout"

const { Sider, Content } = Layout

const items: ItemType<MenuItemType>[] = [
  {
    key: 'image',
    label: 'Image',
    children: [
      {
        key: 'target-image',
        label: 'Target Image',
        icon: <FileAddOutlined />,
      },
      {
        key: 'source-image',
        label: 'Source Image',
        icon: <FileExclamationFilled />,
      },
      {
        key: 'processed-image',
        label: 'Processed Image',
        icon: <FileImageOutlined />,
      }
    ]
  },
  {
    key: "playground",
    label: "Playground",
    icon: <PlayCircleOutlined />,
  }
]

const App: React.FC = () => {
  const { isLoading } = useUIStore()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG, colorBgMask }
  } = theme.useToken()

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