-- Fix PDF Functions - Replace base64url with base64
-- This fixes the encoding issue in download token generation

-- Function to generate secure download token (FIXED VERSION)
CREATE OR REPLACE FUNCTION generate_download_token(
  p_resource_id UUID,
  p_user_email TEXT,
  p_expires_minutes INTEGER DEFAULT 60
) RETURNS TEXT AS $$
DECLARE
  v_token TEXT;
  v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate secure token using base64 instead of base64url
  v_token := encode(gen_random_bytes(32), 'base64');
  -- Remove problematic characters for URL safety
  v_token := REPLACE(REPLACE(REPLACE(v_token, '/', '_'), '+', '-'), '=', '');
  v_expires_at := NOW() + (p_expires_minutes || ' minutes')::INTERVAL;
  
  -- Store token
  INSERT INTO download_tokens (token, resource_id, user_email, expires_at)
  VALUES (v_token, p_resource_id, p_user_email, v_expires_at)
  ON CONFLICT (token) DO NOTHING;
  
  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify and use download token (ENHANCED)
CREATE OR REPLACE FUNCTION verify_download_token(
  p_token TEXT,
  p_user_email TEXT
) RETURNS TABLE(
  is_valid BOOLEAN,
  resource_id UUID,
  file_path TEXT,
  resource_title TEXT
) AS $$
DECLARE
  v_token_record RECORD;
  v_resource_record RECORD;
BEGIN
  -- Get token record
  SELECT * INTO v_token_record
  FROM download_tokens 
  WHERE token = p_token 
    AND user_email = p_user_email
    AND expires_at > NOW()
    AND is_used = false;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Get resource record
  SELECT * INTO v_resource_record
  FROM resources 
  WHERE id = v_token_record.resource_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Mark token as used
  UPDATE download_tokens 
  SET is_used = true, used_at = NOW()
  WHERE token = p_token;
  
  -- Update download tracking
  UPDATE resource_downloads 
  SET download_completed = true
  WHERE resource_id = v_token_record.resource_id 
    AND user_email = p_user_email
    AND download_completed = false;
  
  -- Return success
  RETURN QUERY SELECT 
    true,
    v_resource_record.id,
    v_resource_record.file_path,
    v_resource_record.title;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track resource download (ENHANCED)
CREATE OR REPLACE FUNCTION track_resource_download(
  p_resource_id UUID,
  p_lead_id UUID DEFAULT NULL,
  p_user_email TEXT DEFAULT NULL,
  p_user_name TEXT DEFAULT NULL,
  p_company_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_download_id UUID;
  v_token TEXT;
  v_download_url TEXT;
  v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Generate secure download token
  v_token := generate_download_token(p_resource_id, p_user_email);
  v_expires_at := NOW() + INTERVAL '1 hour';
  v_download_url := '/api/download/' || v_token;
  
  -- Insert download record
  INSERT INTO resource_downloads (
    resource_id, lead_id, user_email, user_name, company_name, phone,
    ip_address, user_agent, referrer, utm_source, utm_medium, utm_campaign,
    download_url, expires_at
  ) VALUES (
    p_resource_id, p_lead_id, p_user_email, p_user_name, p_company_name, p_phone,
    p_ip_address, p_user_agent, p_referrer, p_utm_source, p_utm_medium, p_utm_campaign,
    v_download_url, v_expires_at
  ) RETURNING id INTO v_download_id;
  
  -- Update resource download count
  UPDATE resources 
  SET download_count = COALESCE(download_count, 0) + 1
  WHERE id = p_resource_id;
  
  -- Update lead download tracking if lead_id provided
  IF p_lead_id IS NOT NULL THEN
    UPDATE leads 
    SET 
      download_count = COALESCE(download_count, 0) + 1,
      first_download_at = COALESCE(first_download_at, NOW()),
      last_download_at = NOW()
    WHERE id = p_lead_id;
  END IF;
  
  RETURN v_download_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add helpful function to test PDF system
CREATE OR REPLACE FUNCTION test_pdf_system()
RETURNS TABLE(
  test_name TEXT,
  result TEXT,
  details TEXT
) AS $$
BEGIN
  -- Test 1: Check tables exist
  RETURN QUERY SELECT 
    'Tables Check'::TEXT,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'resource_categories') 
         THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'resource_categories, resource_downloads, download_tokens'::TEXT;
  
  -- Test 2: Check categories data
  RETURN QUERY SELECT 
    'Categories Data'::TEXT,
    CASE WHEN (SELECT COUNT(*) FROM resource_categories WHERE is_active = true) > 0 
         THEN 'PASS' ELSE 'FAIL' END::TEXT,
    (SELECT COUNT(*)::TEXT || ' categories loaded' FROM resource_categories WHERE is_active = true);
  
  -- Test 3: Test token generation
  RETURN QUERY SELECT 
    'Token Generation'::TEXT,
    CASE WHEN generate_download_token(
      '123e4567-e89b-12d3-a456-426614174000'::UUID, 
      'test@example.com'::TEXT
    ) IS NOT NULL THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'Function can generate tokens'::TEXT;
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
