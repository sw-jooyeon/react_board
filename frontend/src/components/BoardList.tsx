import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Row, Col, Pagination } from 'react-bootstrap';
import { fetchBoardList, BoardSummary } from '../api/boardApi';
import '../App.css';

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

  const renderPaginationItems = () => {
    const items = [];
    const visiblePageCount = 5;
    const startPage = Math.floor(currentPage / visiblePageCount) * visiblePageCount;
    const endPage = Math.min(startPage + visiblePageCount, totalPages);

    for (let number = startPage; number < endPage; number++) {
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
    <div className="mt-5 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-3 text-center">게시판</h2>
      <div className="mb-3 d-flex justify-content-end">
        <Link to="/boards/create">
          <Button className="btn-custom" variant="success">게시글 등록</Button>
        </Link>
      </div>
      <div className="mx-auto" style={{ maxWidth: '600px'}}>
        <ListGroup>
            {boards.map(board => (
            <ListGroup.Item key={board.id}>
                <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Row>
                    <Col>
                    <div className="text-truncate" style={{ maxWidth: '350px' }}>
                        <strong>{board.title}</strong>
                    </div>
                    {/* <br /> */}
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
      </div>
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
