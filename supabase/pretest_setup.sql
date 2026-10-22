-- ==============================================================================
-- CYBERSAFE QUEST - BẢNG LƯU TRỮ VÀ QUẢN LÝ ĐÁNH GIÁ NĂNG LỰC ĐẦU VÀO (PRE-TEST & RE-TEST)
-- Chạy toàn bộ file này trong Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Bổ sung các cột Pre-test vào bảng user_profiles nếu chưa có
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'pretest_score') THEN
    ALTER TABLE public.user_profiles ADD COLUMN pretest_score INTEGER DEFAULT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'pretest_level') THEN
    ALTER TABLE public.user_profiles ADD COLUMN pretest_level TEXT DEFAULT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'needs_improvement') THEN
    ALTER TABLE public.user_profiles ADD COLUMN needs_improvement JSONB DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'pretest_completed') THEN
    ALTER TABLE public.user_profiles ADD COLUMN pretest_completed BOOLEAN DEFAULT false;
  END IF;
END $$;

-- 2. Tạo bảng nhật ký các lần làm bài kiểm tra Pre-Test & Re-test (public.pretest_results)
-- Cho phép lưu vết lịch sử nhiều lần làm bài để so sánh trước và sau khi học
CREATE TABLE IF NOT EXISTS public.pretest_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 10,
  competency_level TEXT NOT NULL,
  needs_improvement JSONB DEFAULT '[]'::jsonb,
  answers JSONB DEFAULT '{}'::jsonb,
  test_type VARCHAR(20) DEFAULT 'pretest', -- 'pretest' hoặc 'retest'
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index tra cứu nhanh theo user_id và thời gian
CREATE INDEX IF NOT EXISTS idx_pretest_user_id ON public.pretest_results(user_id);
CREATE INDEX IF NOT EXISTS idx_pretest_created_at ON public.pretest_results(created_at DESC);

-- 3. Bật RLS và cấp quyền đọc/ghi
ALTER TABLE public.pretest_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cho phép đọc kết quả pretest" ON public.pretest_results;
CREATE POLICY "Cho phép đọc kết quả pretest" 
  ON public.pretest_results FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Cho phép tạo kết quả pretest" ON public.pretest_results;
CREATE POLICY "Cho phép tạo kết quả pretest" 
  ON public.pretest_results FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Cho phép sửa kết quả pretest" ON public.pretest_results;
CREATE POLICY "Cho phép sửa kết quả pretest" 
  ON public.pretest_results FOR UPDATE 
  USING (true);
