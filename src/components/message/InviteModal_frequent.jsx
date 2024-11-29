import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InviteModal_frequent(props) {
  const {
    users,
    setUsers,
    setSelectedGroup_Id_Name,
    selectedGroup_Id_Name,
    selectedUserIds,
    setSelectedUserIds,
    userList,
    setUserList,
    selectHandler,
  } = props;

  const [userIds, setUserIds] = useState([]);
  const [frequentList, setFrequentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((resp) => setUserList(resp.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/frequentUser")
      .then((resp) => {
        setFrequentList(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="inviteLeftBox">
      <span>즐겨찾기</span>

      <div className="orgs-Users-List frequent-List">
        {frequentList.length > 0
          ? frequentList.map((frequent) => (
              <div
                className={`orgs-User ${
                  selectedUserIds.some(
                    (selectedUserId) => selectedUserId === frequent.user_id
                  )
                    ? "selectedUser"
                    : ""
                }`}
                onClick={(e) => selectHandler(e, frequent.user_id)}
                key={frequent.user_id}
              >
                <img
                  className="profile"
                  src="../images/sample_item1.jpg"
                  alt=""
                />
                <div className="name_dept">
                  <div className="name">{frequent.userName}</div>
                  <div className="dept">
                    <span>{frequent.group}</span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
