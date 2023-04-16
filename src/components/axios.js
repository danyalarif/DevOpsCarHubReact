import axios from "axios";
const http = axios.create({
    baseURL: "http://ec2-54-249-203-90.ap-northeast-1.compute.amazonaws.com:3000",
    headers: {
      "Content-type" : "application/json",
    } 
  });

export default http