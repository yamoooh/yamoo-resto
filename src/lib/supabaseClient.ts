import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ ATTENTION: Variables d\'environnement Supabase manquantes. Assurez-vous que VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont définies dans Vercel.');
}

// On passe des valeurs par défaut pour éviter un crash complet de React à l'importation
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
