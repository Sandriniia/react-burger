const getRefreshToken = () => {
  const refToken = localStorage.getItem('refreshToken');

  if (!!refToken) {
    return;
  }
  return refToken;
};

const getToken = () => {
  const token = localStorage.getItem('token');

  if (!!token) {
    return;
  }
  return token;
};

export { getRefreshToken, getToken };
