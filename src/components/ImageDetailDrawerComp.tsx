import { Col, Divider, Drawer, Row, Typography } from "antd"


interface ImageViewInfo {
  type: "single" | "split";
}

interface SingleImageViewInfo extends ImageViewInfo {
  type: "single";
  url: string;
}

interface SplitImageViewInfo extends ImageViewInfo {
  type: "split";
  leftUrl: string;
  leftTitle?: string;
  rightUrl: string;
  rightTitle?: string;
}

interface ImageDetailDrawerCompProps {
  open: boolean;
  drawerCloseFn: () => void;
  width?: string | number;
  imgViewInfo?: SingleImageViewInfo | SplitImageViewInfo;
}

const SingleImageView: React.FC<{ url: string }> = ({ url }) => {
  return (
    <img src={url} style={{ width: '60%' }} />
  )
}

const SplitImageView: React.FC<{ viewInfo: SplitImageViewInfo }> = (props) => {
  return (
    <Row gutter={16}>
      <Col span={11} style={{ margin: "0 auto", textAlign: "center" }}>
        <Typography.Title level={3}>{props.viewInfo.leftTitle}</Typography.Title>
        <img src={props.viewInfo.leftUrl} style={{ width: "80%" }} alt={props.viewInfo.leftTitle || "Left image"} />
      </Col>
      <Col span={2} style={{ textAlign: "center" }}>
        <Divider type="vertical" style={{ height: "100%" }} />
      </Col>
      <Col span={11} style={{ margin: "0 auto", textAlign: "center" }}>
        <Typography.Title level={3}>{props.viewInfo.rightTitle}</Typography.Title>
        <img src={props.viewInfo.rightUrl} style={{ width: "80%" }} alt={props.viewInfo.rightTitle || "Right image"} />
      </Col>
    </Row>
  )
}

const ImageDetailDrawerComp: React.FC<ImageDetailDrawerCompProps> = (props) => {
  return (
    <Drawer
      open={props.open}
      width={props.width || '60vw'}
      onClose={() => props.drawerCloseFn()}
      styles={{ mask: { backdropFilter: 'blur(8px)' } }}
    >
      {props.imgViewInfo && (
        props.imgViewInfo.type === 'single' ? (
          <SingleImageView url={props.imgViewInfo.url} />
        ) : (
          <SplitImageView viewInfo={props.imgViewInfo} />
        )
      )}
    </Drawer>
  )
}

export default ImageDetailDrawerComp