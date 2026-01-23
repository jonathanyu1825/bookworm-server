import axios from "axios";
import dotenv from "dotenv";
import { setCache, getCache } from "../services/cacheService.js";
import { supabase } from "../utils/supabaseClient.js";

dotenv.config();
const ISBN_KEY = process.env.ISBN_KEY;
const GB_KEY = process.env.GB_KEY;

// export async function bookService(id) {
//     const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
//     try {
//     const response = await axios.get(url, {
//       params: {
//         key: GB_KEY,
//       },
//     });

//     console.log(response);
//     return response.data.items;
//   } catch (error) {
//     console.log(error);
//   }
// }

const instance = axios.create({
  baseURL: "https://api2.isbndb.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: ISBN_KEY,
  },
});

// export async function searchService(query) {
//   try {
//     console.log(query);
//     const response = await instance.get(
//       `/search/books?page=1&pageSize=20&text=${encodeURIComponent(query)}`
//     );
//     console.log(response.data);
//     return response.data[0];
//   } catch (error) {
//     console.log("hi error");
//   }
// }

export async function bookService(id) {
  try {
    // cache for redis here
    // const cached = await redis.get(`book-${id}`);
    // if (cached) {
    //   console.log(cached);
    // }

    const key = `book-${id}`;
    const cached = await getCache(key);
    if (cached) {
      return cached;
    }

    const response = await instance.get(`/book/${id}`);

    const bookInfo = response.data.book;
    setCache(key, bookInfo, 7200);
    
    const { data, error } = await supabase.from("books").upsert({
      isbn: id,
      author: bookInfo.authors,
      title: bookInfo.title,
      image: bookInfo.image
    });
    // await redis.set(`book-${id}`, JSON.stringify(response.data.book));
    return bookInfo;
  } catch (error) {
    console.log("error here");
  }
}
