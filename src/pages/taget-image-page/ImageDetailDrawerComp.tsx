import { Drawer } from "antd"

interface ImageDetailDrawerCompProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ImageDetailDrawerComp: React.FC<ImageDetailDrawerCompProps> = (props) => {
  return (
    <Drawer
      open={props.open}
      width="60vw"
      onClose={() => props.setOpen(false)}
      styles={{ mask: { backdropFilter: 'blur(8px)' } }}
    >

    </Drawer>
  )
}

export default ImageDetailDrawerComp