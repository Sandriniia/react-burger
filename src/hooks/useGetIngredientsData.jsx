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
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return products;
};

export default useGetIngredientsData;
