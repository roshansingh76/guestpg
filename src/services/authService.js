import api, { unwrapResponse } from './api'

export const login = (email, password) =>
    api.post('/auth/login', { email, password }).then(unwrapResponse)

export const getProfile = () =>
    api.get('/auth/profile').then(unwrapResponse)

export const changePassword = (data) =>
    api.put('/auth/change-password', data).then(unwrapResponse)
