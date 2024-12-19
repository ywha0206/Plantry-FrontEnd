import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import useUserStore from "../../store/useUserStore";
import axiosInstance from "../../services/axios";
import ReactQuill from "react-quill";

function CommunityModify() {
  const navigate = useNavigate();
  const { boardId, postId } = useParams();
  const currentUser = useUserStore((state) => state.user);
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(boardId);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]); // To store board data
  const [loading, setLoading] = useState(true);

  // 게시글 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/community/posts/${boardId}/${postId}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setIsCommentEnabled(response.data.isCommentEnabled);
        setSelectedBoardId(response.data.boardId);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPost(); // 함수 호출
  }, [boardId, postId]);

  // 게시판 목록 불러오기
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axiosInstance.get(`/api/community/boards`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("게시판 목록 불러오기 실패:", error);
      }
    };

    fetchBoards(); // 게시판 목록 불러오기
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 2) {
      alert("파일은 최대 두 개까지만 첨부할 수 있습니다.");
      return;
    }

    setFiles(selectedFiles);
  };

  // 수정 완료 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (files.length > 0) {
        files.forEach((file) => formData.append("files", file));
      }

      await axiosInstance.put(
        `/api/community/posts/${boardId}/view/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("게시글이 수정되었습니다.");
      navigate(`/community/${boardId}/view/${postId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <div id="community-container">
      <CommunitySidebar currentUser={currentUser} />

      <div className="community-modify">
        <h2>{`${boardId} 수정`}</h2>
        <form onSubmit={handleSubmit}>
          {/* 게시판 선택 */}
          <div className="form-group">
            <label>유형</label>
            <div className="select-pinned-wrapper">
              <select
                value={selectedBoardId}
                onChange={(e) => setSelectedBoardId(e.target.value)}
                required
              >
                <option value="" disabled>
                  게시판을 선택하세요
                </option>
                {/* Only render options when data is available */}
                {!loading && data.length > 0 ? (
                  data.map((board) => (
                    <option key={board.boardId} value={board.boardId}>
                      {board.boardName}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option> // Show loading if data is still loading
                )}
              </select>
            </div>
          </div>

          {/* 제목 입력 */}
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              className="title-input"
              required
            />
          </div>
          {/* 파일 첨부 */}
          <div className="form-group">
            <label htmlFor="file-upload" className="file-upload-label">
              파일 선택(최대 2개)
            </label>
            <input
              id="file-upload"
              type="file"
              className="file-upload-input"
              multiple
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <span className="file-selected">
                {files.map((file) => file.name).join(", ")}
              </span>
            )}
          </div>
          {/* 내용 입력 */}
          <div className="form-group">
            <label>내용</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ align: [] }],
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  ["link"],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ direction: "rtl" }],
                  ["clean"],
                ],
              }}
              formats={[
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
                "link",
                "header",
                "list",
                "align",
                "indent",
                "direction",
                "clean",
              ]}
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={() => {
                alert("취소했습니다!");
                navigate(-1);
              }}
            >
              취소
            </button>
            <button type="submit">수정하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunityModify;
