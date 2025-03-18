package com.example.board.dto;

import java.time.LocalDateTime;

public class BoardSummaryDto {
    private Long id;
    private String title;
    private String writer;
    private LocalDateTime createdAt;
    
    public BoardSummaryDto() {}
    
    public BoardSummaryDto(Long id, String title, String writer, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.createdAt = createdAt;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getWriter() { return writer; }
    public void setWriter(String writer) { this.writer = writer; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
