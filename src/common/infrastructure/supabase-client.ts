import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/common/infrastructure/database.types.ts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);
