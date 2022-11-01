import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeInProgress from '../components/RecipeInProgress';

function Drinksid() {
  const [showIdTitle, setShowIdTitle] = useState(false);
  const showParams = useParams();
  console.log(showParams, 'params');

  const titlePage = () => {
    if (Object.keys(showParams).length === 0) {
      setShowIdTitle(true);
    } else {
      setShowIdTitle(false);
    }
  };

  useEffect(() => {
    titlePage();
    console.log(Object.keys(showParams).length);
    console.log(showParams);
  }, []);

  return (
    <div>
      { showIdTitle && <Header />}
      <RecipeInProgress />
      <Footer />
    </div>
  );
}

export default Drinksid;
