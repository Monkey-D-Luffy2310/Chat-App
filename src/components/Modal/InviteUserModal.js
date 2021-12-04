import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../../Context/AppProvider";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { db } from "../../firebase/config";
import { debounce } from "lodash";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  options,
  setOptions,
  ...props
}) {
  const [fetching, setFetching] = useState(false);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers, setOptions]);
  useEffect(() => {
      // clear when unmount
      setOptions([]);
  }, [setOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

function lowerCase(str) {
  var splitStr = str
    .toLowerCase()
    .split(" ")
    .filter((w) => w !== "");
  return splitStr.join(" ");
}

async function fetchUserList(search, curMembers) {
  const valueCompare = lowerCase(search);
  return db
    .collection("users")
    .where("keywords", "array-contains", valueCompare)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value));
    });
}

const InviteUserModal = () => {
  const {
    isVisibleInviteUser,
    setIsVisibleInviteUser,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    // reset form value
    form.resetFields();
    setValue([]);
    setOptions([]);

    // update members in current room
    const roomRef = db.collection("rooms").doc(selectedRoomId);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    setIsVisibleInviteUser(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);
    setOptions([]);

    setIsVisibleInviteUser(false);
  };

  return (
    <Modal
      title="Mời thêm thành viên"
      visible={isVisibleInviteUser}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <DebounceSelect
          options={options}
          setOptions={setOptions}
          mode="multiple"
          name="search-user"
          label="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          curMembers={selectedRoom ? selectedRoom.members : []}
        />
      </Form>
    </Modal>
  );
};

export default InviteUserModal;
