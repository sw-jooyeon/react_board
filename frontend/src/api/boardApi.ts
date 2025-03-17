export interface BoardSummary {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
}

export interface BoardDetail {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface BoardCreateRequest {
  title: string;
  content: string;
  writer: string;
  password: string;
}

export interface BoardUpdateRequest {
  title: string;
  content: string;
  password: string;
}

const API_BASE = "http://localhost:8080/api/boards";

export const fetchBoardList = async (page: number = 0): Promise<{ content: BoardSummary[]; totalPages: number }> => {
  const response = await fetch(`${API_BASE}?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch board list");
  }
  return response.json();
};

export const fetchBoardDetail = async (id: number): Promise<BoardDetail> => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch board detail");
  }
  return response.json();
};

export const postCreateBoard = async (data: BoardCreateRequest): Promise<BoardDetail> => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create board");
  }
  return response.json();
};

export const putUpdateBoard = async (id: number, data: BoardUpdateRequest): Promise<BoardDetail> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update board");
  }
  return response.json();
};

export const postVerifyPassword = async (id: number, password: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/${id}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    throw new Error("Password verification failed");
  }
};

export const postDeleteBoard = async (id: number, password: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/${id}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete board");
  }
};
