import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Card from '../components/Card';
// import Buttons from '../components/Buttons';
// import AppContext from '../context/appContext';
import Recipes from '../components/Recipes';

// const MAX_RENDER = 11;

function Drinks() {
  // const { drinksList, setDrinksList } = useContext(AppContext);
  // const [buttonsList, setButtonsList] = useState([]);

  // useEffect(() => {
  //   const getDrinksList = async () => {
  //     const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  //     const { drinks } = await fetch(endpoint).then((response) => response.json());
  //     setDrinksList(drinks);
  //   };
  //   const getCategories = async () => {
  //     const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  //     const { drinks } = await fetch(endpoint).then((response) => response.json());
  //     setButtonsList(drinks);
  //   };
  //   getDrinksList();
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

export default Drinks;
