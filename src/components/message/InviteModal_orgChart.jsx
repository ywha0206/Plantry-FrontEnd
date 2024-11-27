import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InviteModal_orgChart(addUser) {
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

  useEffect(() => {
    axios.get();
  }, []);

  return (
    <div className="inviteLeftBox">
      <span>조직도 목록</span>

      <div className="allOrgs">
        <div className="groupsDiv">
          <div className="groups">
            <img className="upDownIcon" src="../images/arrowUP.png" alt="" />
            <img className="representIcon" src="../images/group.jpg" alt="" />
            <span className="groupName selected-group">우리회사그룹</span>
          </div>
          <div className="departments selected-dept">
            <img
              className="representIcon"
              src="../images/deptartment.jpg"
              alt=""
            />
            <span className="groupName">홍보기획실</span>
          </div>
          <div className="departments">
            <img
              className="representIcon"
              src="../images/deptartment.jpg"
              alt=""
            />
            <span className="groupName">영업팀</span>
          </div>
          <div className="groups">
            <img className="upDownIcon" src="../images/arrowUP.png" alt="" />
            <img className="representIcon" src="../images/group.jpg" alt="" />
            <span className="groupName selected-group">우리회사그룹</span>
          </div>
          <div className="departments selected-dept">
            <img
              className="representIcon"
              src="../images/deptartment.jpg"
              alt=""
            />
            <span className="groupName">홍보기획실</span>
          </div>
          <div className="departments">
            <img
              className="representIcon"
              src="../images/deptartment.jpg"
              alt=""
            />
            <span className="groupName">영업팀</span>
          </div>
        </div>
      </div>

      <div className="orgs-Users-List">
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
  );
}
