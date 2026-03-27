import api from './axios'
import { Transaction, TransactionRequest } from '../types'

export const createTransaction = (data: TransactionRequest): Promise<Transaction> =>
  api.post('/transactions', data).then((res) => res.data)

export const getTransaction = (id: number): Promise<Transaction> =>
  api.get(`/transactions/${id}`).then((res) => res.data)

export const updateTransaction = (id: number, data: TransactionRequest): Promise<Transaction> =>
  api.put(`/transactions/${id}`, data).then((res) => res.data)

export const deleteTransaction = (id: number): Promise<void> =>
  api.delete(`/transactions/${id}`).then((res) => res.data)
