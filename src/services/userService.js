import api, { unwrapResponse } from './api'

export const listUsers = (params) =>
    api.get('/users', { params }).then(unwrapResponse)

export const getUser = (id) =>
    api.get(`/users/${id}`).then(unwrapResponse)

export const getUsersByPG = (pgId) =>
    api.get(`/users/pg/${pgId}`).then(unwrapResponse)

export const getAvailablePGs = () =>
    api.get('/users/pgs/available').then(unwrapResponse)

export const createUser = (data) =>
    api.post('/users', data).then(unwrapResponse)

export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data).then(unwrapResponse)

export const deleteUser = (id) =>
    api.delete(`/users/${id}`).then(unwrapResponse)

export const changeUserStatus = (id, status) =>
    api.patch(`/users/${id}/status`, { status }).then(unwrapResponse)
