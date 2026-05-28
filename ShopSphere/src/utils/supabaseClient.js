// console.log(import.meta.env.VITE_SUPABASE_URL);
// console.log(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://aotukjoqvujvcjdlxdvo.supabase.co'
// const supabaseKey = 'sb_publishable_A2f1OY-Y9nam3E4rm0vAHA_koBEenUv'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY


if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);