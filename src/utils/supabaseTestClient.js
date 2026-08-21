import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseTestUrl = process.env.SUPABASE_TEST_URL;
const supabaseTestServiceKey = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseTestUrl, supabaseTestServiceKey);