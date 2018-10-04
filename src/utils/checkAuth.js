import jwt_decode from 'jwt-decode';

const checkAuth = () => {
  try {
    const sessionAccessToken = localStorage.getItem('sessionAccessToken');
    const decoded = jwt_decode(sessionAccessToken);
    const currentTime = new Date().getTime() / 1000;
    const expTime = decoded.exp;
    if (currentTime < expTime) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export default checkAuth;
