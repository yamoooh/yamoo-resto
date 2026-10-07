import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://zcmukdqqadcgypqdkrjg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbXVrZHFxYWRjZ3lwcWRrcmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNTg5MDAsImV4cCI6MjEwNjkzNDkwMH0.SxxMLJw2Nsp9h-r01_5JyIHkBc2iTwu_Gv_KsxZTp5U');

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'juniorstella322@gmail.com',
    password: 'Cabrelfranck254@',
  });

  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('User created:', data.user?.id);
    
    // Mettre à jour la table public.admins
    const { error: dbError } = await supabase
      .from('admins')
      .update({ auth_id: data.user?.id })
      .eq('email', 'juniorstella322@gmail.com');
      
    if (dbError) {
      console.error('Error linking user:', dbError.message);
    } else {
      console.log('User successfully linked to public.admins');
    }
  }
}

createAdmin();
