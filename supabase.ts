import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;//use VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for neltify env variables

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      ai_projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          model_file_url: string | null;
          dataset_file_url: string | null;
          evaluation_script_url: string | null;
          preprocessing_file_url: string | null;
          optimization_level: string | null; // Updated to support 5 options: extreme, balanced, latency, size, accuracy
          deployment_target: string | null;
          status: 'draft' | 'submitted' | 'processing' | 'completed' | 'failed';
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          model_file_url?: string | null;
          dataset_file_url?: string | null;
          evaluation_script_url?: string | null;
          preprocessing_file_url?: string | null;
          optimization_level?: string | null; // Updated to support 5 options
          deployment_target?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          model_file_url?: string | null;
          dataset_file_url?: string | null;
          evaluation_script_url?: string | null;
          preprocessing_file_url?: string | null;
          optimization_level?: string | null; // Updated to support 5 options
          deployment_target?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
