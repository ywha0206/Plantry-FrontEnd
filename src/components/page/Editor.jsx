import React, { useEffect, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';



const Editor = () => {
  const editor = withReact(createEditor());
  // 기본값 설정
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '이곳에 내용을 입력하세요.' }],
    },
  ];

  const [value, setValue] = useState(initialValue); // 초기값 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가


  const isValidSlateValue = (value) => {
    return (
      Array.isArray(value) &&
      value.every(
        (block) =>
          typeof block.type === 'string' &&
          Array.isArray(block.children) &&
          block.children.every((child) => typeof child.text === 'string')
      )
    );
  };

  useEffect(() => {
   /*  const fetchData = async () => {
      try {
        const response = await fetch('/api/editor-content');
        const data = await response.json();

        if (isValidSlateValue(data)) {
          setValue(data);
        } else {
          console.warn('유효하지 않은 데이터:', data);
          setValue(initialValue);
        }
      } catch (error) {
        console.error('데이터 로드 오류:', error);
        setValue(initialValue);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); */
  }, []);


  // 로딩 상태 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Slate
    editor={editor}
    value={value || initialValue}
    onChange={(newValue) => setValue(newValue)}
    >     
      <Editable
        placeholder="텍스트 내용 입력"
        style={{
          width: '100%',
          minHeight: '300px',
          padding: '10px',
          fontSize: '1em',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      />
    </Slate>
  );
};

export default Editor;
