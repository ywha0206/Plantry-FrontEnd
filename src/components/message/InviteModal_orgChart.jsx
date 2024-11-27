import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function InviteModal_orgChart({
  users,
  setUsers,
  setSelectedGroup_Id_Name,
  selectedGroup_Id_Name,
}) {
  const [selected, setSelected] = useState(false);
  const [userIds, setUserIds] = useState([]);
  const selectHandler = (e, user_Id) => {
    if (e.target.className === "orgs-User") {
      setSelected(true);
      if (userIds.includes(user_Id)) {
        // 이미 선택된 사용자면 선택 해제
        setUserIds((prevIds) => prevIds.filter((id) => id !== user_Id));
      } else {
        // 선택되지 않은 사용자면 선택 추가
        setUserIds((prevIds) => [...prevIds, user_Id]);
        setUsers(() => [
          ...users,
          ...userList.filter((user) => user.user_id === user_Id),
        ]);
        setUserIds([]);
      }
      e.target.className = "orgs-User selectedUser";
    } else if (e.target.className === "orgs-User selectedUser") {
      setSelected(false);
      e.target.className = "orgs-User";
    }
  };

  console.log("userIds : " + userIds);
  console.log("users : " + JSON.stringify(users));

  const [groups, setGroups] = useState([]);

  const handleGroupClick = (group_Id, group_Name) => {
    setSelectedGroup_Id_Name((prev) => ({
      ...prev,
      group_id: group_Id,
      group_name: group_Name,
    }));
  };

  const [showList, setShowList] = useState({
    type1: false,
    type2: false,
    arrow1: "/images/arrow-down.png",
    arrow2: "/images/arrow-down.png",
  });
  const type1Handler = (e) => {
    e.preventDefault();
    if (showList.type1 == false) {
      setShowList((prev) => ({
        ...prev,
        type1: true,
        arrow1: "/images/arrow-up.png",
      }));
    } else {
      setShowList((prev) => ({
        ...prev,
        type1: false,
        arrow1: "/images/arrow-down.png",
      }));
    }
  };
  const type2Handler = (e) => {
    e.preventDefault();
    if (showList.type2 == false) {
      setShowList((prev) => ({
        ...prev,
        type2: true,
        arrow2: "/images/arrow-up.png",
      }));
    } else {
      setShowList((prev) => ({
        ...prev,
        type2: false,
        arrow2: "/images/arrow-down.png",
      }));
    }
  };

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user_group")
      .then((resp) => setGroups(resp.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/user")
      .then((resp) => setUserList(resp.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="inviteLeftBox">
      <span>조직도 목록</span>

      <div className="allOrgs">
        <div className="groupsDiv">
          <div className="groups" onClick={type1Handler}>
            <img className="upDownIcon" src={showList.arrow1} alt="" />
            <img className="representIcon" src="../images/group.jpg" alt="" />
            <span className="groupName selected-group">부서 목록</span>
          </div>
          {/* 부서 목록 출력 */}
          {groups.length > 0 && showList.type1 == true
            ? groups
                .filter((group) => group.group_type === 0)
                .map((group) => (
                  <div
                    className={`departments ${
                      selectedGroup_Id_Name === group.group_id
                        ? "selected-dept"
                        : ""
                    }`}
                    onClick={() =>
                      handleGroupClick(group.group_id, group.group_name)
                    }
                    key={group.group_id}
                  >
                    <img
                      className="representIcon"
                      src="../images/deptartment.jpg"
                      alt=""
                    />
                    <span className="groupName">{group.group_name}</span>
                  </div>
                ))
            : null}

          <div className="groups" onClick={type2Handler}>
            <img className="upDownIcon" src={showList.arrow2} alt="" />
            <img className="representIcon" src="../images/group.jpg" alt="" />
            <span className="groupName selected-group">팀 목록</span>
          </div>
          {/* 팀 목록 출력 */}
          {groups.length > 0 && showList.type2 == true
            ? groups
                .filter((group) => group.group_type === 1)
                .map((group) => (
                  <div
                    className={`departments ${
                      selectedGroup_Id_Name.group_id === group.group_id
                        ? "selected-dept"
                        : ""
                    }`}
                    onClick={() =>
                      handleGroupClick(group.group_id, group.group_name)
                    }
                    key={group.group_id}
                  >
                    <img
                      className="representIcon"
                      src="../images/deptartment.jpg"
                      alt=""
                    />
                    <span className="groupName">{group.group_name}</span>
                  </div>
                ))
            : null}
        </div>
      </div>

      <div className="orgs-Users-List">
        {userList
          .filter((user) => user.group === selectedGroup_Id_Name.group_name)
          .map((user) => (
            <div
              className="orgs-User"
              key={user.user_id}
              onClick={(e) => selectHandler(e, user.user_id)}
            >
              <img
                className="profile"
                src="../images/sample_item1.jpg"
                alt=""
              />
              <div className="name_dept">
                <div className="name">{user.userName}</div>
                <div className="dept">
                  <span>{user.group}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
