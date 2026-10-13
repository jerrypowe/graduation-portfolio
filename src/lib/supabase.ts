import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://vlvefkhppsjgxodryzfk.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdmVma2hwcHNqZ3hvZHJ5emZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MDY3MTcsImV4cCI6MjEwNzQ4MjcxN30.M4z8sbKRsVhf9zpOjIaro0FrpoIOKPzOHoJCQ0AH3Ug';

// Retrieve Supabase credentials from Vite environment variables or defaults
const envUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || DEFAULT_SUPABASE_URL;
const envAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || DEFAULT_SUPABASE_ANON_KEY;

// Allow override from localStorage for live testing in client if desired
const localUrl = typeof window !== 'undefined' ? localStorage.getItem('custom_supabase_url') : null;
const localKey = typeof window !== 'undefined' ? localStorage.getItem('custom_supabase_anon_key') : null;

export const supabaseUrl = (localUrl && localUrl.trim()) || (envUrl && envUrl.trim()) || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey = (localKey && localKey.trim()) || (envAnonKey && envAnonKey.trim()) || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

// Create Supabase client if credentials exist
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export interface DbWish {
  id: string;
  name: string;
  message: string;
  color?: 'yellow' | 'pink' | 'blue' | 'green';
  created_at: string;
}

// Client-side sanitization and length check
export function validateWishInput(name: string, message: string): { valid: boolean; error?: string } {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName) {
    return { valid: false, error: 'Vui lòng nhập tên của bạn.' };
  }
  if (trimmedName.length > 40) {
    return { valid: false, error: 'Tên không được vượt quá 40 ký tự.' };
  }
  if (!trimmedMessage) {
    return { valid: false, error: 'Vui lòng nhập nội dung lời chúc.' };
  }
  if (trimmedMessage.length > 1000) {
    return { valid: false, error: 'Lời chúc không được vượt quá 1000 ký tự.' };
  }

  return { valid: true };
}

// Fallback initial wishes for initial display or offline mode
export const initialSampleWishes: DbWish[] = [
  {
    id: 'sample-1',
    name: 'Kỳ Anh (Classmate)',
    message: 'Chúc mừng Tân Cử nhân Thanh Tú! Chúc bạn bay thật cao và kiến tạo thật nhiều sản phẩm tuyệt vời nhé! 🎓🎉',
    color: 'yellow',
    created_at: new Date('2026-10-24T10:00:00Z').toISOString(),
  },
  {
    id: 'sample-2',
    name: 'Tech Lead / Mentor',
    message: 'Impressive engineering foundations and creative eye for frontend craftsmanship. Keep shining in your SWE journey!',
    color: 'blue',
    created_at: new Date('2026-10-24T09:30:00Z').toISOString(),
  },
  {
    id: 'sample-3',
    name: 'FPT University Alumni',
    message: 'Tự hào FPT Can Tho! Chúc cậu gặt hái thật nhiều thành công rực rỡ trong sự nghiệp Software Engineering!',
    color: 'pink',
    created_at: new Date('2026-10-24T09:00:00Z').toISOString(),
  },
];

// Fetch all wishes from Supabase or fallback
export async function getWishesFromDatabase(): Promise<{ wishes: DbWish[]; fromDb: boolean; error?: string }> {
  if (!supabase || !isSupabaseConfigured) {
    // If not configured, check localStorage mock cache or use initial samples
    try {
      const cached = localStorage.getItem('grad_offline_wishes');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { wishes: parsed, fromDb: false };
        }
      }
    } catch {
      // ignore
    }
    return { wishes: initialSampleWishes, fromDb: false };
  }

  try {
    const { data, error } = await supabase
      .from('wishes')
      .select('id, name, message, color, created_at')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) {
      console.warn('Supabase query error:', error.message);
      return { wishes: initialSampleWishes, fromDb: false, error: error.message };
    }

    if (data && data.length > 0) {
      return { wishes: data as DbWish[], fromDb: true };
    }

    return { wishes: [], fromDb: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    return { wishes: initialSampleWishes, fromDb: false, error: message };
  }
}

// Insert new wish into Supabase
export async function insertWishToDatabase(
  name: string,
  message: string,
  color: 'yellow' | 'pink' | 'blue' | 'green' = 'yellow'
): Promise<{ success: boolean; data?: DbWish; error?: string }> {
  const validation = validateWishInput(name, message);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const cleanName = name.trim();
  const cleanMessage = message.trim();

  // If Supabase is configured, write to real database
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([
          {
            name: cleanName,
            message: cleanMessage,
            color,
          },
        ])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data as DbWish };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi kết nối cơ sở dữ liệu';
      return { success: false, error: errorMsg };
    }
  }

  // Fallback when Supabase env is not configured yet
  const fallbackWish: DbWish = {
    id: `local-${Date.now()}`,
    name: cleanName,
    message: cleanMessage,
    color,
    created_at: new Date().toISOString(),
  };

  try {
    const existing = localStorage.getItem('grad_offline_wishes');
    const list: DbWish[] = existing ? JSON.parse(existing) : [...initialSampleWishes];
    list.unshift(fallbackWish);
    localStorage.setItem('grad_offline_wishes', JSON.stringify(list));
  } catch {
    // ignore
  }

  return { 
    success: true, 
    data: fallbackWish, 
    error: 'Đã lưu cục bộ (Chưa cấu hình Supabase VITE_SUPABASE_URL)' 
  };
}
