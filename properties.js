import axios from 'axios';

export const serverUrl = 'https://reqres.in/api/';


export async function postMethod(url, data) {
    return axios.post(url, data)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  
  export async function getMethod(url, data) {
   
    return axios.get(url)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          Router.push('/')
        }else{
          console.log(error);
        }
      });
  }
  export async function deleteMethod(url, data) {
   
    return axios.delete(url)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          Router.push('/')
        }else{
          console.log(error);
        }
      });
  }