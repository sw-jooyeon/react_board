import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { postCreateBoard, postUploadFile } from '../api/boardApi';
import '../App.css';

const BoardCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBoard = await postCreateBoard({ title, writer, content, password });
      if (file) {
        await postUploadFile(newBoard.id, file);
      }
      navigate('/boards');
    } catch (error) {
      alert('게시글 생성에 실패했습니다.');
    }
  };

  return (
    <Card className="mt-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
      <Card.Body>
        <Card.Title className="mb-5 text-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>게시글 생성</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formWriter">
            <Form.Label>작성자</Form.Label>
            <Form.Control
              type="text"
              placeholder="작성자 입력"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="내용 입력"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>첨부파일</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) setFile(e.target.files[0]);
              }}
            />
          </Form.Group>
          <div className="d-flex mt-4 justify-content-center">
            <Button className="me-2 btn-custom" variant="primary" type="submit">
              생성
            </Button>
            <Link to="/boards">
              <Button className="btn-custom" variant="secondary">목록</Button>
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BoardCreate;
