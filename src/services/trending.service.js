import { supabase } from "../utils/supabaseClient.js";

export async function fetchTrendingBooks() {
  const { data, error } = await supabase.rpc("gettrending");
  if (error) {
    console.log(error);
  }
return data;
// hi 
}
