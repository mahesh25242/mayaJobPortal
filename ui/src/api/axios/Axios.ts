import axios from "axios";

const instance = axios.create({
	baseURL:  'https://fiya.in/api/public/v1/', // 'http://localhost:8082/v1/', // 
});
// instance.defaults.withCredentials = true;
const token = localStorage.getItem('token');
if (token) {
  let tkn = JSON.parse(token);
  instance.defaults.headers.common['Authorization'] = `Bearer ${tkn.access_token}`;
}

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async (error) => {
    const originalRequest = error.config;
    if(error.response.status == 401 && originalRequest.url != "refreshToken"){ //403

      console.log(originalRequest)
      let token:any = localStorage.getItem('token');
      if(token){
        token = JSON.parse(token);
      }

      if(token){
        const postData = {
          'grant_type' : 'refresh_token',
          'refresh_token' : `${token.refresh_token}`,
        }

        const tokenResponse =  instance.post(`refreshToken`, postData);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'as';
        return instance(originalRequest);

        // try{
        //   const tokenResponse =  instance.post(`refreshToken`, postData);
        // }catch(e){
        // console.log(1)
        // }
        
       

       
      }
        

    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default instance;