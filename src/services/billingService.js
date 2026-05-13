import api, { unwrapResponse } from './api'

export const listBills = (pgId) =>
    api.get(`/pgs/${pgId}/bills`).then(unwrapResponse)

export const getBill = (pgId, billId) =>
    api.get(`/pgs/${pgId}/bills/${billId}`).then(unwrapResponse)

export const getOverdueBills = (pgId) =>
    api.get(`/pgs/${pgId}/bills/overdue`).then(unwrapResponse)

export const generateBills = (pgId, data) =>
    api.post(`/pgs/${pgId}/bills/generate`, data).then(unwrapResponse)

export const recordPayment = (pgId, billId, data) =>
    api.post(`/pgs/${pgId}/bills/${billId}/payments`, data).then(unwrapResponse)

export const getReceipt = (pgId, billId) =>
    api.get(`/pgs/${pgId}/bills/${billId}/receipt`).then(unwrapResponse)
