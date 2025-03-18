import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { fetchBoardDetail, postVerifyPassword, postDeleteBoard, BoardDetail as BoardDetailType } from '../api/boardApi';
import { handleFileDownload } from '../utils/handleFileDownload';
import '../App.css';

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<BoardDetailType | null>(null);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loadBoard = async (boardId: number) => {
    try {
      const data = await fetchBoardDetail(boardId);
      setBoard(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadBoard(parseInt(id));
    }
  }, [id]);

  const handleEdit = async () => {
    if (!id) return;
    try {
      await postVerifyPassword(parseInt(id), password);
      navigate(`/boards/${id}/edit`, { state: { board } });
    } catch (error) {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await postDeleteBoard(parseInt(id), password);
      alert("게시글이 삭제되었습니다.");
      navigate('/boards');
    } catch (error) {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  if (!board) {
    return <div>로딩 중...</div>;
  }

  return (
    <Card className="mt-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
      <Card.Body className="p-4">
        <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }} className="mb-3">
          {board.title}
        </Card.Title>
        <Card.Subtitle className="mt-4 mb-3 text-muted text-end" style={{ fontSize: '0.8rem' }}>
          작성자: {board.writer} |{" "}
          {board.updatedAt
            ? `수정일: ${new Date(board.updatedAt).toLocaleString()}`
            : `작성일: ${new Date(board.createdAt).toLocaleString()}`}
        </Card.Subtitle>
        <hr className="mb-4" />
        <Card.Text className="mt-3" style={{ whiteSpace: 'pre-line', width: '80%', margin: '0 auto' }}>
          {board.content}
        </Card.Text>
        {board.filePath && (
          <div className="mt-5">
            {isImageFile(board.filePath) ? (
              <img 
                src={`http://localhost:8080/uploads/${board.filePath}`} 
                alt="첨부파일" 
                style={{ width: '80%', display: 'block', margin: '0 auto' }} 
              />
            ) : (
              <div className="d-flex justify-content-end">
                <Button className="btn-custom" variant="outline-primary" size="sm" onClick={() => handleFileDownload(board.filePath!)}>
                  첨부파일 다운로드
                </Button>
              </div>
            )}
          </div>
        )}

        <hr className="mt-4 mb-3" />

        <Form.Group className="mt-2 mb-3" controlId="formBoardPassword">
          <div className="d-flex justify-content-end">
            <Form.Control
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '150px', fontSize: '0.8rem' }}
            />
          </div>
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/boards">
              <Button className="btn-custom" variant="secondary">목록</Button>
            </Link>
          </div>
          <div>
            <Button className="me-2 btn-custom" variant="primary" onClick={handleEdit}>
              수정
            </Button>
            <Button className="btn-custom" variant="danger" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BoardDetail;
