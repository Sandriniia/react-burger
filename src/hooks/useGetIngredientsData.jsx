import { useState, useEffect } from 'react';

const useGetIngredientsData = () => {
  const [products, setProducts] = useState([]);

  const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    fetch(ingredientsApi)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка ${res.status}`));
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return products;
};

export default useGetIngredientsData;
