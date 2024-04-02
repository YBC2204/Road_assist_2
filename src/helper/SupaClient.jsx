import { createClient } from "@supabase/supabase-js";

const supabase = 
createClient(
    "https://hxlkvldqxjraxxyrxbld.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bGt2bGRxeGpyYXh4eXJ4YmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTY5MzEsImV4cCI6MjAyNDkzMjkzMX0.ZNCPfCUQj_Vqv-WCX2tj6GEuE7ZDGwMgFc69zLZKhgM"
    );

export default supabase