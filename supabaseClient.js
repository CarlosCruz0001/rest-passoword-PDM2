import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bifczzoagtjwauenwnue.supabase.co"; 
const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZmN6em9hZ3Rqd2F1ZW53bnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTQyODksImV4cCI6MjA1MzEzMDI4OX0.Nv9YY2CTY8ofPucD3yp2uQW9KcsbV_iHlwUVeBuT7kk"; 


  export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
