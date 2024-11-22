export default function InvitationModal({ isOpen, closeHandler }) {
  if (!isOpen) return null;
  return (
    <div id="invitation-modal">
      <div className="message-invite-container">
        <div className="title_closeBtn">
          <span>대화상대 초대</span>
          <img
            className="closeBtn"
            src="../images/closeBtn.png"
            alt=""
            onClick={closeHandler}
          />
        </div>

        <div className="options">
          <div className="userSearch">사용자 검색</div>
          <div className="orgChart selected-option">조직도</div>
          <div className="frequent">즐겨찾기</div>
        </div>

        <div className="list_add">
          <div className="orgChartList">
            <span>조직도 목록</span>

            <div className="allOrgs">
              <div className="groups">
                <img
                  className="upDownIcon"
                  src="../images/arrowUP.png"
                  alt=""
                />
                <img
                  className="representIcon"
                  src="../images/group.jpg"
                  alt=""
                />
                <span className="groupName selected-group">우리회사</span>
              </div>

              <div className="groups">
                <img
                  className="upDownIcon"
                  src="../images/arrowUP.png"
                  alt=""
                />
                <img
                  className="representIcon"
                  src="../images/group.jpg"
                  alt=""
                />
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

            <div className="orgs-Members-List">
              <div className="orgs-member">
                <img
                  className="profile"
                  src="../images/sample_item1.jpg"
                  alt=""
                />
                <div className="name_dept">
                  <div className="name">전규찬</div>
                  <div className="dept">
                    <span>개발팀</span>
                  </div>
                </div>
              </div>
              <div className="orgs-member">
                <img
                  className="profile"
                  src="../images/sample_item1.jpg"
                  alt=""
                />
                <div className="name_dept">
                  <div className="name">김규찬</div>
                  <div className="dept">
                    <span>인사팀</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="addBtn">
            <img src="../images/arrowRight.png" alt="" />
          </button>

          <div className="selected-Members-List">
            <div className="selected-title">
              <span>선택한 대상</span>
              <button className="resetBtn">초기화</button>
            </div>
            <div className="selected-Members">
              <div className="selected-member_cancelBtn">
                <div className="selected-member">
                  <img
                    className="profile"
                    src="../images/sample_item1.jpg"
                    alt=""
                  />
                  <div className="name_dept">
                    <div className="name">김규찬</div>
                    <div className="dept">
                      <span>인사팀</span>
                    </div>
                  </div>
                </div>
                <img
                  className="cancelBtn"
                  src="../images/closeBtn.png"
                  alt=""
                />
              </div>
              <div className="selected-member_cancelBtn">
                <div className="selected-member">
                  <img
                    className="profile"
                    src="../images/sample_item1.jpg"
                    alt=""
                  />
                  <div className="name_dept">
                    <div className="name">김규찬</div>
                    <div className="dept">
                      <span>인사팀</span>
                    </div>
                  </div>
                </div>
                <img
                  className="cancelBtn"
                  src="../images/closeBtn.png"
                  alt=""
                />
              </div>
              <div className="selected-member_cancelBtn">
                <div className="selected-member">
                  <img
                    className="profile"
                    src="../images/sample_item1.jpg"
                    alt=""
                  />
                  <div className="name_dept">
                    <div className="name">김규찬</div>
                    <div className="dept">
                      <span>인사팀</span>
                    </div>
                  </div>
                </div>
                <img
                  className="cancelBtn"
                  src="../images/closeBtn.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="confirmBtn_cancelBtn">
          <button className="confimBtn">확인</button>
          <button className="cancel-Btn" onClick={closeHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
