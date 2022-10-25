import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MealsIdProgress() {
  const [showIdTitle, setShowIdTitle] = useState(false);
  const showParams = useParams();

  const titlePage = () => {
    if (Object.keys(showParams).length === 0) {
      setShowIdTitle(false);
    } else {
      setShowIdTitle(true);
    }
  };

  useEffect(() => {
    titlePage();
    console.log(Object.keys(showParams).length);
  }, []);

  return (
    <div>
      { showIdTitle && <Header />}
      <Footer />
    </div>
  );
}

export default MealsIdProgress;
