import { TargetImageResponse } from "@/api"
import { Drawer } from "antd"

interface ImageDetailDrawerCompProps {
  isOpen: boolean;
  closeDrawer: () => void;
  img: TargetImageResponse | null;
}

const ImageDetailDrawerComp: React.FC<ImageDetailDrawerCompProps> = (props) => {
  return (
    <Drawer
      open={props.isOpen}
      width="60vw"
      onClose={() => props.closeDrawer()}
      styles={{ mask: { backdropFilter: 'blur(8px)' } }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{props.img?.name}</div>
        <img
          src={`${window.APP_CONFIG.IMG_SERVER_URL}/${props.img?.url_id}`}
          alt={props.img?.name}
          style={{ width: '100%', borderRadius: '8px', objectFit: 'contain' }}
        />
        <div>
          <div><b>Uploaded At:</b> {props.img?.created_at}</div>
          <div><b>Tags:</b> {props.img?.tags?.join(', ')}</div>
          <div><b>Status:</b> {props.img?.is_active ? 'Active' : 'Inactive'}</div>
        </div>
      </div>
    </Drawer>
  )
}

export default ImageDetailDrawerComp