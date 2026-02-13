import { supabase } from "../utils/supabaseClient.js";
import { setCache, getCache } from "../services/cacheService.js";

export async function fetchTrendingBooks() {
  const cached = await getCache("trending");
  if (cached) {
    return cached;
  }
  const { data, error } = await supabase.rpc("get_trending_books");
  if (error) {
    console.log(error);
  }
  setCache("trending", data);
  return data;
}
