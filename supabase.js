// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zuqerfitkrkvxdvxseog.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cWVyZml0a3JrdnhkdnhzZW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTk1NjEsImV4cCI6MjA2MDA3NTU2MX0.n5L0jKvccj6yI7JhZW95iYiBivLPII584Khzw-C-8UY'
export const supabase = createClient(supabaseUrl, supabaseKey)
