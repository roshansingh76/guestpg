import api, { unwrapResponse } from './api'

export const listExpenses = (pgId) =>
    api.get(`/pgs/${pgId}/expenses`).then(unwrapResponse)

export const getExpense = (pgId, expenseId) =>
    api.get(`/pgs/${pgId}/expenses/${expenseId}`).then(unwrapResponse)

export const getExpenseSummary = (pgId) =>
    api.get(`/pgs/${pgId}/expenses/summary`).then(unwrapResponse)

export const createExpense = (pgId, data) =>
    api.post(`/pgs/${pgId}/expenses`, data).then(unwrapResponse)

export const updateExpense = (pgId, expenseId, data) =>
    api.put(`/pgs/${pgId}/expenses/${expenseId}`, data).then(unwrapResponse)

export const deleteExpense = (pgId, expenseId) =>
    api.delete(`/pgs/${pgId}/expenses/${expenseId}`).then(unwrapResponse)
