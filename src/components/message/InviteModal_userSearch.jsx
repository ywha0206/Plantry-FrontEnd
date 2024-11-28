import axios from "axios";
import { useEffect, useState } from "react";

export default function InviteModal_userSearch(props) {
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

  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((resp) => setUserList(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      setSearchResult(
        userList.filter((user) => user.userName.includes(keyword))
      );
    }
  }, [keyword, userList]);

  const searchHandler = (e) => {
    setKeyword(e.target.value);
  };

  console.log("searchResult : " + JSON.stringify(searchResult));
  console.log("users : " + JSON.stringify(users));
  console.log("userIds : " + JSON.stringify(userIds));

  return (
    <div className="inviteLeftBox">
      <span>사용자 검색</span>

      <div className="userSearch">
        <div className="search_Input_Img">
          <input
            type="text"
            className="searchInput"
            value={keyword}
            onChange={searchHandler}
          />
          <img src="/images/search-icon.png" alt="" className="searchImg" />
        </div>
        <div className="orgs-Users-List searched-Users-List">
          {searchResult.length > 0
            ? searchResult.map((result) => (
                <div
                  className={`orgs-User ${
                    selectedUserIds.some(
                      (selectedUserId) => selectedUserId === result.user_id
                    )
                      ? "selectedUser"
                      : null
                  }`}
                  onClick={(e) => selectHandler(e, result.user_id)}
                  key={result.user_id}
                >
                  <img
                    className="profile"
                    src="../images/sample_item1.jpg"
                    alt=""
                  />
                  <div className="name_dept">
                    <div className="name">{result.userName}</div>
                    <div className="dept">
                      <span>개발팀</span>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
