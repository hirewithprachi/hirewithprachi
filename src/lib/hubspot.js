// HubSpot Analytics Tracking Only - No Lead/Contact Saving
// All data is saved to Supabase, HubSpot is only used for analytics

export async function trackAnalyticsEvent(eventName, properties = {}) {
  // Check if HubSpot is configured
  const apiKey = 'na2-2756-5f24-45c9-8d7b-d08e8ad93839';
  const portalId = '243445611';
  
  // If no API key, skip HubSpot analytics
  if (!apiKey || apiKey === 'YOUR_HUBSPOT_API_KEY') {
    console.log('HubSpot not configured, skipping analytics tracking');
    return { success: false, reason: 'not_configured' };
  }
  
  // HubSpot Analytics API endpoint
  const url = `https://api.hubapi.com/analytics/v1/events?hapikey=${apiKey}`;
  
  const data = {
    eventName: eventName,
    properties: properties,
    timestamp: Date.now()
  };
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      console.error('HubSpot analytics API error:', res.status, res.statusText);
      return { success: false, reason: 'api_error', status: res.status };
    }
    
    console.log('HubSpot analytics event tracked successfully:', eventName);
    return { success: true };
    
  } catch (err) {
    console.error('HubSpot analytics network error:', err);
    return { success: false, reason: 'network_error', error: err.message };
  }
}

// Legacy function - kept for backward compatibility but not used
export async function addContactToHubSpot({ email, name, phone, company, designation, service, source }) {
  console.log('HubSpot contact saving disabled - all data saved to Supabase only');
  return { success: false, reason: 'disabled' };
} 