import React from 'react';
import '../../App.css';
import Cards from '../Cards/Cards';
import FrontPage from '../FrontPage/FrontPage';
import SecondPage from '../SecondPage/SecondPage'
import Footer from '../Footer/Footer';

function Home(props) {

  return (
    <>
      <FrontPage data={props.data}/>
      <SecondPage data={props.data}/>
      <Footer />
    </>
  );
}

export default Home;
