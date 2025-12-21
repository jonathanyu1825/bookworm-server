import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const ISBN_KEY = process.env.ISBN_KEY;
const GB_KEY = process.env.GB_KEY;

// const instance = axios.create({
//   baseURL: "https://api2.isbndb.com",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: ISBN_KEY,
//   },
// });

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

export async function searchService(query) {
  const url = "https://www.googleapis.com/books/v1/volumes";
  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        key: GB_KEY,
        maxResults: 40,
        // startIndex: 2,
      },
    });
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
}
