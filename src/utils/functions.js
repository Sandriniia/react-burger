const getRefreshToken = () => {
  const refToken = localStorage.getItem('refreshToken');

  if (!refToken) {
    return;
  }
  return refToken;
};

const getToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }
  return token;
};

const filterProductsByType = (products, type) => {
  const ingredients = products.filter((item) => {
    return item.type === type;
  });
  return ingredients;
};

export { getRefreshToken, getToken, filterProductsByType };
