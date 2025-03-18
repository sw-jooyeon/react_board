package com.example.board.controller;

import com.example.board.dto.*;
import com.example.board.entity.Board;
import com.example.board.repository.BoardRepository;
import com.example.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {
    
    @Autowired
    private BoardService boardService;
    
    @Autowired
    private BoardRepository boardRepository;
    
    // 게시판 목록 조회
    @GetMapping
    public ResponseEntity<Page<BoardSummaryDto>> getBoards(@RequestParam(name="page", defaultValue = "0") int page) {
        return ResponseEntity.ok(boardService.getBoards(page));
    }
    
    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardDetailDto> getBoardDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(boardService.getBoardDetail(id));
    }
    
    // 게시글 생성
    @PostMapping
    public ResponseEntity<BoardDetailDto> createBoard(@RequestBody BoardCreateRequest request) {
        return ResponseEntity.ok(boardService.createBoard(request));
    }
    
    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<BoardDetailDto> updateBoard(@PathVariable("id") Long id, @RequestBody BoardUpdateRequest request) {
        return ResponseEntity.ok(boardService.updateBoard(id, request));
    }
    
    // 패스워드 검증
    @PostMapping("/{id}/verify")
    public ResponseEntity<Void> verifyPassword(@PathVariable("id") Long id, @RequestBody PasswordRequest request) {
        boardService.verifyPassword(id, request.getPassword());
        return ResponseEntity.ok().build();
    }
    
    // 게시글 삭제
    @PostMapping("/{id}/delete")
    public ResponseEntity<Void> deleteBoard(@PathVariable("id") Long id, @RequestBody PasswordRequest request) {
        boardService.deleteBoard(id, request.getPassword());
        return ResponseEntity.ok().build();
    }
    
    // 파일 업로드
    @PostMapping("/{id}/upload")
    public ResponseEntity<?> uploadFile(
            @PathVariable("id") Long id,
            @RequestParam("file") MultipartFile file) {
        Board board = boardRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Board not found"));
        
        String fileName = boardService.storeFile(file);
        board.setFilePath(fileName);
        boardRepository.save(board);
        
        return ResponseEntity.ok("File uploaded successfully: " + fileName);
    }
}
