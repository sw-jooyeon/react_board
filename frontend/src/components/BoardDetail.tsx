// src/components/BoardDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { fetchBoardDetail, postVerifyPassword, postDeleteBoard, BoardDetail as BoardDetailType } from '../api/boardApi';

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
      alert("패스워드가 올바르지 않습니다.");
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
      alert("패스워드가 올바르지 않습니다.");
    }
  };

  if (!board) {
    return <div>로딩 중...</div>;
  }

  return (
    <Card className="mt-5">
      <Card.Body>
        <Card.Title>{board.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          작성자: {board.writer} | 작성일: {new Date(board.createdAt).toLocaleString()}
        </Card.Subtitle>
        {board.updatedAt && (
          <Card.Subtitle className="mb-2 text-muted">
            수정일: {new Date(board.updatedAt).toLocaleString()}
          </Card.Subtitle>
        )}
        <Card.Text>{board.content}</Card.Text>
        <Form.Group className="mb-3" controlId="formBoardPassword">
          <Form.Control
            type="password"
            placeholder="패스워드 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="primary" onClick={handleEdit} className="me-2">
            수정
          </Button>
          <Button variant="danger" onClick={handleDelete} className="me-2">
            삭제
          </Button>
          <Link to="/boards">
            <Button variant="secondary">목록</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BoardDetail;
