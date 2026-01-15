import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uuyqvrmzgiiovqowcnvv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eXF2cm16Z2lpb3Zxb3djbnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDYwODQsImV4cCI6MjA3OTU4MjA4NH0.2vvczhBg9FV9OKTvmk3NQ68H-Ppmutgk0G1BtYcbYQw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
