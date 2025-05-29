// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zuqerfitkrkvxdvxseog.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cWVyZml0a3JrdnhkdnhzZW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjA4NzksImV4cCI6MjA2NDAzNjg3OX0.OjrEAAzVWbhG0jE5K2OezogLhgIpWbEjcNXnzSCKm4g'
export const supabase = createClient(supabaseUrl, supabaseKey)
