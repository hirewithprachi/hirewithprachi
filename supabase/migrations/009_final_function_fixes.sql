-- Final fixes for PDF functions
-- Fix column ambiguity and test function issues

-- Function to verify and use download token (FIXED VERSION)
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
  SELECT dt.* INTO v_token_record
  FROM download_tokens dt
  WHERE dt.token = p_token 
    AND dt.user_email = p_user_email
    AND dt.expires_at > NOW()
    AND dt.is_used = false;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Get resource record
  SELECT r.* INTO v_resource_record
  FROM resources r
  WHERE r.id = v_token_record.resource_id;
  
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
  WHERE resource_downloads.resource_id = v_token_record.resource_id 
    AND resource_downloads.user_email = p_user_email
    AND download_completed = false;
  
  -- Return success
  RETURN QUERY SELECT 
    true,
    v_resource_record.id,
    v_resource_record.file_path,
    v_resource_record.title;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enhanced test function that works with real data
CREATE OR REPLACE FUNCTION test_pdf_system()
RETURNS TABLE(
  test_name TEXT,
  result TEXT,
  details TEXT
) AS $$
DECLARE
  v_resource_id UUID;
  v_token TEXT;
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
  
  -- Test 3: Check if we have resources to test with
  SELECT r.id INTO v_resource_id 
  FROM resources r 
  LIMIT 1;
  
  IF v_resource_id IS NOT NULL THEN
    -- Test 4: Test token generation with real resource
    BEGIN
      v_token := generate_download_token(v_resource_id, 'test-system@example.com');
      
      RETURN QUERY SELECT 
        'Token Generation'::TEXT,
        CASE WHEN v_token IS NOT NULL THEN 'PASS' ELSE 'FAIL' END::TEXT,
        'Generated token: ' || COALESCE(SUBSTRING(v_token, 1, 10) || '...', 'NULL')::TEXT;
    EXCEPTION
      WHEN OTHERS THEN
        RETURN QUERY SELECT 
          'Token Generation'::TEXT,
          'FAIL'::TEXT,
          'Error: ' || SQLERRM::TEXT;
    END;
  ELSE
    RETURN QUERY SELECT 
      'Token Generation'::TEXT,
      'SKIP'::TEXT,
      'No resources available for testing'::TEXT;
  END IF;
  
  -- Test 5: Check RLS policies
  RETURN QUERY SELECT 
    'RLS Policies'::TEXT,
    CASE WHEN EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' 
      AND tablename IN ('resource_categories', 'resources')
    ) THEN 'PASS' ELSE 'FAIL' END::TEXT,
    'RLS policies configured'::TEXT;
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add helper function to clean up test data
CREATE OR REPLACE FUNCTION cleanup_test_data()
RETURNS TEXT AS $$
BEGIN
  -- Clean up test tokens and downloads
  DELETE FROM download_tokens WHERE user_email LIKE '%test%' OR user_email LIKE '%example.com%';
  DELETE FROM resource_downloads WHERE user_email LIKE '%test%' OR user_email LIKE '%example.com%';
  
  RETURN 'Test data cleaned up';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION test_pdf_system() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION cleanup_test_data() TO service_role;
