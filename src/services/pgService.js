import api, { unwrapResponse } from './api'

export const listPGs = () =>
    api.get('/pgs').then(unwrapResponse)

export const getPG = (id) =>
    api.get(`/pgs/${id}`).then(unwrapResponse)

export const createPG = (data) =>
    api.post('/pgs', data).then(unwrapResponse)

export const updatePG = (id, data) =>
    api.put(`/pgs/${id}`, data).then(unwrapResponse)

export const deletePG = (id) =>
    api.delete(`/pgs/${id}`).then(unwrapResponse)

export const changePGStatus = (id, status) =>
    api.patch(`/pgs/${id}/status`, { status }).then(unwrapResponse)

export const listRooms = (pgId) =>
    api.get(`/pgs/${pgId}/rooms`).then(unwrapResponse)

export const getRoom = (pgId, roomId) =>
    api.get(`/pgs/${pgId}/rooms/${roomId}`).then(unwrapResponse)

export const createRoom = (pgId, data) =>
    api.post(`/pgs/${pgId}/rooms`, data).then(unwrapResponse)

export const updateRoom = (pgId, roomId, data) =>
    api.put(`/pgs/${pgId}/rooms/${roomId}`, data).then(unwrapResponse)

export const deleteRoom = (pgId, roomId) =>
    api.delete(`/pgs/${pgId}/rooms/${roomId}`).then(unwrapResponse)

export const listBeds = (pgId, roomId) =>
    api.get(`/pgs/${pgId}/rooms/${roomId}/beds`).then(unwrapResponse)

export const listBedsByPG = (pgId) =>
    api.get(`/pgs/${pgId}/beds`).then(unwrapResponse)

export const createBed = (pgId, roomId, data) =>
    api.post(`/pgs/${pgId}/rooms/${roomId}/beds`, data).then(unwrapResponse)

export const updateBed = (pgId, roomId, bedId, data) =>
    api.put(`/pgs/${pgId}/rooms/${roomId}/beds/${bedId}`, data).then(unwrapResponse)

export const deleteBed = (pgId, roomId, bedId) =>
    api.delete(`/pgs/${pgId}/rooms/${roomId}/beds/${bedId}`).then(unwrapResponse)

export const listPhotos = (pgId) =>
    api.get(`/pgs/${pgId}/photos`).then(unwrapResponse)

export const addPhoto = (pgId, data) =>
    api.post(`/pgs/${pgId}/photos`, data).then(unwrapResponse)

export const deletePhoto = (pgId, photoId) =>
    api.delete(`/pgs/${pgId}/photos/${photoId}`).then(unwrapResponse)
