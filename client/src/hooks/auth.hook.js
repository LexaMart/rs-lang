import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userId, setUserId] = useState(null)
  // const [photoPath, setPhotoPath] = useState(null);

  const login = useCallback((jwtToken, jwtTokenRefresh, id) => {
    setToken(jwtToken);
    setRefreshToken(jwtTokenRefresh);
    setUserId(id);
    // setPhotoPath(photoPath)
    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken, refreshToken: jwtTokenRefresh }))
  }, [])
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    // setPhotoPath(null)
    setRefreshToken(null)
    localStorage.removeItem(storageName);
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.refreshToken, data.userId,);
    }
  }, [login])

  return { login, logout, token, userId, refreshToken }
}