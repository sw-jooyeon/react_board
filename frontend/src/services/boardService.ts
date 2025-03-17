import { Board } from '../types/Board';

const API_URL = 'http://localhost:8080/api/boards';

export const getBoards = async (page: number = 0, size: number = 20): Promise<any> => {
  const response = await fetch(`${API_URL}?page=${page}&size=${size}`);
  if (!response.ok) {
    throw new Error('Failed to fetch boards');
  }
  return await response.json();
};

export const getBoard = async (id: number): Promise<Board> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch board details');
  }
  return await response.json();
};

export const createBoard = async (data: { title: string; content: string; writer: string; password: string }): Promise<Board> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to create board');
  }
  return await response.json();
};

export const validatePassword = async (id: number, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Invalid password');
  }
};

export const updateBoard = async (id: number, data: { title: string; content: string; password: string }): Promise<Board> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update board');
  }
  return await response.json();
};

export const deleteBoard = async (id: number, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}?password=${encodeURIComponent(password)}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to delete board');
  }
};
