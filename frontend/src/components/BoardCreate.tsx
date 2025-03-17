// src/components/BoardCreate.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { postCreateBoard } from '../api/boardApi';

const BoardCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postCreateBoard({ title, writer, content, password });
      navigate('/boards');
    } catch (error) {
      alert('게시글 생성에 실패했습니다.');
    }
  };

  return (
    <Card className="mt-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
      <Card.Body>
        <Card.Title>게시글 생성</Card.Title>
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
            <Form.Label>패스워드</Form.Label>
            <Form.Control 
              type="password"
              placeholder="패스워드 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            생성
          </Button>
          <Link to="/boards">
            <Button variant="secondary">목록</Button>
          </Link>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BoardCreate;
