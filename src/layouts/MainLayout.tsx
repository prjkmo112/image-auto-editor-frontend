import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
      {/* <div style={{ width: "60%", minWidth: "220px", margin: "0 auto" }}>
        <Input.Search size="large" enterButton loading={false} />
      </div> */}

      <div style={{ marginTop: "2rem" }}>
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout