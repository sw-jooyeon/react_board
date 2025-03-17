// src/components/BoardEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { BoardDetail as BoardDetailType, putUpdateBoard } from '../api/boardApi';

interface LocationState {
  board: BoardDetailType;
}

const BoardEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  const [title, setTitle] = useState(state?.board.title || '');
  const [content, setContent] = useState(state?.board.content || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!state) {
      // 상태 정보가 없으면 이전 페이지로 돌아갑니다.
      navigate(-1);
    }
  }, [state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await putUpdateBoard(parseInt(id), { title, content, password });
      navigate(`/boards/${id}`);
    } catch (error) {
      alert("수정에 실패했습니다. 패스워드를 확인하세요.");
    }
  };

  return (
    <Card className="mt-5">
      <Card.Body>
        <Card.Title>게시글 수정</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>제목 (작성자와 패스워드는 수정 불가)</Form.Label>
            <Form.Control 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>내용</Form.Label>
            <Form.Control 
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>패스워드 (검증용)</Form.Label>
            <Form.Control 
              type="password"
              placeholder="패스워드 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            수정
          </Button>
          <Link to={`/boards/${id}`}>
            <Button variant="secondary">취소</Button>
          </Link>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BoardEdit;
