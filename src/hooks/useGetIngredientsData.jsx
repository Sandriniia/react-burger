import {useState, useEffect} from 'react'

const useGetIngredientsData = () => {

  const [products, setProducts] = useState([])

  const ingredients_api = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    fetch(ingredients_api)
      .then((res) => { return res.json() })
      .then((data) => { setProducts(data.data) })
      .catch((err) => console.log(err))
  }, [])

  return products;
}

export default useGetIngredientsData;