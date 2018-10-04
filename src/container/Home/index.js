import React from 'react';
import checkAuth from '../../utils/checkAuth';
const Home = props => {
  if (checkAuth()) props.history.push('/user');
  return <div>Home</div>;
};
export default Home;
