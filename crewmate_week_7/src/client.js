import { createClient } from '@supabase/supabase-js'

const URL = "postgresql://postgres.xajhacjvumgmvpvxixbn:Mur6yUF!ndK-p4t@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhamhhY2p2dW1nbXZwdnhpeGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODUwNDMsImV4cCI6MjA0NjM2MTA0M30.nmeX7CIiRyIf7HT_sOgb_BCLuI9jpB3hB06hShSy7Gw"

export const supabase = createClient(URL, API_KEY);