import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <div className="div-meals">
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}
