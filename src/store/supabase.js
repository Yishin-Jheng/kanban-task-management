import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lnaaodfhnjqrepxlzawm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYWFvZGZobmpxcmVweGx6YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1ODA2NDYsImV4cCI6MTk5NjE1NjY0Nn0.j-rhJ8b6RHiChNx90skqlnRVoRqG9z2i9MHziLXnCLU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
