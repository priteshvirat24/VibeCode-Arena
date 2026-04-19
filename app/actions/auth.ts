'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // const supabase = await createClient();
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // if (error) return { error: error.message };

  revalidatePath('/dashboard');
  return { success: true };
}

export async function signupWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;

  // const supabase = await createClient();
  // const { data, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: { data: { username } }
  // });
  // if (error) return { error: error.message };

  revalidatePath('/dashboard');
  return { success: true };
}
