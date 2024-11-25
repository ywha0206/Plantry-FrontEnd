import React, { useState } from 'react';

const SharingMenu = ({ sharingUsers, setSharingUsers }) => {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('읽기 전용'); // 기본 권한

  const addUser = () => {
    if (email) {
      setSharingUsers([...sharingUsers, { email, permission }]);
      setEmail('');
    }
  };

  const updatePermission = (index, newPermission) => {
    const updatedUsers = [...sharingUsers];
    updatedUsers[index].permission = newPermission;
    setSharingUsers(updatedUsers);
  };

  return (
    <div className="sharing-menu">
      <input
        type="text"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />
      <button onClick={addUser} className="add-user-btn">추가</button>
      <ul className="user-list">
        {sharingUsers.map((user, index) => (
          <li key={index}>
            {user.email}
            <select
              value={user.permission}
              onChange={(e) => updatePermission(index, e.target.value)}
            >
              <option value="읽기 전용">읽기 전용</option>
              <option value="편집 가능">편집 가능</option>
              <option value="사용 권한 없음">사용 권한 없음</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharingMenu;
