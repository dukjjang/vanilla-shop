import { BASE_URL } from "../config.js";

// 1. 요청 모음
export class Api {
  constructor() {}
  request = async function (url) {
    const res = await fetch(`${BASE_URL}${url}`);
    const data = await res.json();
    console.log(data);
    return data;
  };
}
