import { supabase } from "../utils/supabaseClient.js";

export async function fetchTrendingBooks() {
  const { data, error } = await supabase.rpc("get_trending_books");
  console.log(data);
  if (error) {
    console.log(error);
  }
return data;
}
