import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type Project = Database['public']['Tables']['ai_projects']['Row'];
type ProjectInsert = Database['public']['Tables']['ai_projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['ai_projects']['Update'];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Omit<ProjectInsert, 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('ai_projects')
        .insert({ ...project, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      setProjects(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create project');
    }
  };

  const updateProject = async (id: string, updates: ProjectUpdate) => {
    try {
      const { data, error } = await supabase
        .from('ai_projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update project');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
};