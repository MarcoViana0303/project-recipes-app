import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Buttons from '../components/Buttons';
// import Card from '../components/Card';
// import AppContext from '../context/appContext';
import Recipes from '../components/Recipes';

// const MAX_RENDER = 11;

export default function Meals() {
  // const { mealList, setMealList } = useContext(AppContext);
  // const [buttonsList, setButtonsList] = useState([]);

  // useEffect(() => {
  //   const getMealsList = async () => {
  //     const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //     const { meals } = await fetch(endpoint).then((response) => response.json());
  //     setMealList(meals);
  //   };
  //   const getCategories = async () => {
  //     const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  //     const { meals } = await fetch(endpoint).then((response) => response.json());
  //     setButtonsList(meals);
  //   };
  //   getMealsList();
  //   getCategories();
  // }, []);

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />

    </div>
  );
}
