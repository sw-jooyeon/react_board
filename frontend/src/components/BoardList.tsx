// src/components/BoardList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Row, Col, Pagination } from 'react-bootstrap';
import { fetchBoardList, BoardSummary } from '../api/boardApi';

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<BoardSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadBoards = async (page: number) => {
    try {
      const data = await fetchBoardList(page);
      setBoards(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBoards(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지번호가 너무 많으면 일부만 보여주는 로직을 추가할 수 있지만, 여기서는 모든 페이지 번호를 표시합니다.
  const renderPaginationItems = () => {
    const items = [];
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="mt-5">
      <h2 className="mb-3">게시판 목록</h2>
      <div className="mb-3">
        <Link to="/boards/create">
          <Button variant="success">게시글 등록</Button>
        </Link>
      </div>
      <ListGroup>
        {boards.map(board => (
          <ListGroup.Item key={board.id}>
            <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Row>
                <Col>
                  <strong>{board.title}</strong>
                  <br />
                  <small>{board.writer}</small>
                </Col>
                <Col xs="auto">
                  <small>{new Date(board.createdAt).toLocaleString()}</small>
                </Col>
              </Row>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {renderPaginationItems()}
        <Pagination.Next
          disabled={currentPage + 1 >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default BoardList;
