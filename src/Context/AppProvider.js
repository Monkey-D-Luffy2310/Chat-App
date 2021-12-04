import { createContext, useState, useContext, useMemo } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

const Appprovider = ({ children }) => {
  const [isVisibleAddRoom, setIsVisibleAddRoom] = useState(false);
  const [isVisibleInviteUser, setIsVisibleInviteUser] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const { uid } = useContext(AuthContext);

  const conditionRooms = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", conditionRooms);

  const selectedRoom = useMemo(() => {
    return rooms.find((r) => r.id === selectedRoomId);
  }, [selectedRoomId, rooms]);

  const conditionUsers = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom ? selectedRoom.members : [""]
    };
  }, [selectedRoom]);
  const users = useFirestore("users", conditionUsers);

  return (
    <AppContext.Provider
      value={{
        rooms,
        users,
        selectedRoom,
        isVisibleAddRoom,
        setIsVisibleAddRoom,
        selectedRoomId,
        setSelectedRoomId,
        isVisibleInviteUser,
        setIsVisibleInviteUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Appprovider;
