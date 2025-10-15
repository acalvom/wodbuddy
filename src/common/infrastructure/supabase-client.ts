/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/common/infrastructure/database.types';

const { VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY } = import.meta.env;

const supabaseUrl = VITE_SUPABASE_URL;
const supabasePublishableKey = VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);
