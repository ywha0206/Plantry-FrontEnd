import { useEffect, useState } from "react";

export default function InviteModal_userSearch(leftBoxProps) {
  const {
    users,
    setUsers,
    setSelectedGroup_Id_Name,
    selectedGroup_Id_Name,
    userList,
  } = leftBoxProps;

  const [selected, setSelected] = useState(false);

  const selectHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "orgs-User") {
      setSelected(true);
      e.target.className = "orgs-User selectedUser";
    } else {
      setSelected(false);
      e.target.className = "orgs-User";
    }
  };

  return (
    <div className="inviteLeftBox">
      <span>사용자 검색</span>

      <div className="userSearch">
        <div className="search_Input_Img">
          <input type="text" className="searchInput" onChange={null} />
          <img src="/images/search-icon.png" alt="" className="searchImg" />
        </div>
        <div className="orgs-Users-List searched-Users-List">
          <div className="orgs-User" onClick={selectHandler}>
            <img className="profile" src="../images/sample_item1.jpg" alt="" />
            <div className="name_dept">
              <div className="name">전규찬</div>
              <div className="dept">
                <span>개발팀</span>
              </div>
            </div>
          </div>
          <div className="orgs-User" onClick={selectHandler}>
            <img className="profile" src="../images/sample_item1.jpg" alt="" />
            <div className="name_dept">
              <div className="name">김규찬</div>
              <div className="dept">
                <span>인사팀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
