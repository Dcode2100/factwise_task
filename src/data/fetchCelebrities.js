import axios from 'axios';

export default fetchCelebrities = () => {
  return axios.get('./celebrities.json')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      return [];
    });
};
