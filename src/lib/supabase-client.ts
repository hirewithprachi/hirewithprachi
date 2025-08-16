// Supabase client configuration using existing project settings
import { createClient } from '@supabase/supabase-js'

// Use environment variables for configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ktqrzokrqizfjqdgwmqs.supabase.co"
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cXJ6b2tycWl6ZmpxZGd3bXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzIzOTIsImV4cCI6MjA2OTgwODM5Mn0.2g3y9b7bsX444RlJ5_syCtHb-WEhHmZf2WxucPrRiPQ"

// Create the Supabase client with the existing project configuration
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Export the configuration for use in other parts of the application
export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY
}
