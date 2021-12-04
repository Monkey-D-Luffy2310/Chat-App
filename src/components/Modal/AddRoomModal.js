import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { Modal, Form, Input } from "antd";
import { addDocs } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomModal = () => {
  const { isVisibleAddRoom, setIsVisibleAddRoom } = useContext(AppContext);
  const { uid } = useContext(AuthContext);
  const [form] = Form.useForm();

  function addRoom() {
    try {
      form
        .validateFields(["name", "description"])
        .then((values) => {
          setIsVisibleAddRoom(false);
          form.resetFields();
          addDocs("rooms", { ...values, members: [uid] });
        })
        .catch((err) => console.log(err));
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  }
  function handleOk() {
    addRoom();
  }
  function handleAddRoomKeyDown(e) {
    if (e.key === "Enter") {
      addRoom();
    }
  }
  function handleCancel() {
    setIsVisibleAddRoom(false);
  }
  return (
    <Modal
      title="Thêm phòng"
      visible={isVisibleAddRoom}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onKeyDown={handleAddRoomKeyDown}>
        <Form.Item
          name="name"
          label="Tên phòng"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
        >
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
