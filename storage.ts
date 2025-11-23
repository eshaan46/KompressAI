import { supabase } from './supabase';

export interface UploadResult {
  url: string | null;
  error: string | null;
}

export const uploadFile = async (
  file: File,
  folder: 'models' | 'datasets' | 'scripts' | 'preprocess',
  userId: string
): Promise<UploadResult> => {
  try {
    // Create a unique filename with timestamp and user ID
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}_${timestamp}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: null, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (err) {
    console.error('Upload exception:', err);
    return { 
      url: null, 
      error: err instanceof Error ? err.message : 'Upload failed' 
    };
  }
};

export const deleteFile = async (filePath: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.storage
      .from('files')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (err) {
    console.error('Delete exception:', err);
    return { 
      error: err instanceof Error ? err.message : 'Delete failed' 
    };
  }
};

// Helper function to extract file path from public URL
export const getFilePathFromUrl = (publicUrl: string): string | null => {
  try {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split('/');
    // Remove '/storage/v1/object/public/files/' parts to get the actual file path
    const fileIndex = pathParts.findIndex(part => part === 'files');
    if (fileIndex !== -1 && fileIndex < pathParts.length - 1) {
      return pathParts.slice(fileIndex + 1).join('/');
    }
    return null;
  } catch {
    return null;
  }
};