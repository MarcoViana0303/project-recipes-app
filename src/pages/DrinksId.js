import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinksid() {
  const [showIdTitle, setShowIdTitle] = useState(false);
  const showParams = useParams();

  const titlePage = () => {
    if (Object.keys(showParams).length === 0) {
      setShowIdTitle(true);
    } else {
      setShowIdTitle(false);
    }
  };

  useEffect(() => {
    titlePage();
  }, []);

  return (
    <div>
      { showIdTitle && <Header />}
      <Footer />
    </div>
  );
}

export default Drinksid;
