import React from 'react';
import './styles.css';

const Home = () => (
  <div className="home-content">
    <h2>Ласкаво просимо до магазину ялинок!</h2>
    <p>У нас ви знайдете широкий вибір якісних штучних ялинок на будь-який смак.</p>
    <div className="tree-images">
      <img src={`${process.env.PUBLIC_URL}/tree.png`} alt="Ялинка 1" />
      <img src={`${process.env.PUBLIC_URL}/tree1.png`} alt="Ялинка 2" />
      <img src={`${process.env.PUBLIC_URL}/tree2.png`} alt="Ялинка 3" />
    </div>
    <p>Контакти: +380123456759, email: info@christmastree.com</p>
  </div>
);

export default Home;
