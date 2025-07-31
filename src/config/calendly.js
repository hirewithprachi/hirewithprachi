// Calendly Configuration
// This file contains Calendly API configuration and endpoints

export const CALENDLY_CONFIG = {
  // Your Calendly personal access token
  ACCESS_TOKEN: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzUzODYzOTc0LCJqdGkiOiIwMDVkMGFkYi03NmMwLTRlMWEtYTQwMC1lMGZkYjQwYjZhN2UiLCJ1c2VyX3V1aWQiOiJmZDk3ZDFhMy04MTUzLTQ0OTQtYmViNy1iNzY5MjMyYzE2MjQifQ.IPtIejLlLzavQflltDa-lasgfyOqdGKVKRGr84cX-ZFsgA7eYAVvIw7qOCafoh-h8bAnuYM1Q37Y4NP1BbsJLg',
  
  // Base API URL
  API_BASE_URL: 'https://api.calendly.com',
  
  // Your Calendly user UUID (extracted from the token)
  USER_UUID: 'fd97d1a3-8153-4494-beb7-b769232c1624',
  
  // Your booking URL
  BOOKING_URL: 'https://calendly.com/hirewithprachi/30min',
  
  // Embed widget URL
  EMBED_URL: 'https://assets.calendly.com/assets/external/widget.js',
  
  // Event types (can be fetched via API)
  EVENT_TYPES: {
    '30min': {
      name: '30 Minute Meeting',
      duration: 30,
      url: 'https://calendly.com/hirewithprachi/30min',
      description: 'Free HR consultation session'
    }
  }
};

// API endpoints for future integrations
export const CALENDLY_ENDPOINTS = {
  // Get user's event types
  EVENT_TYPES: `${CALENDLY_CONFIG.API_BASE_URL}/event_types?user=${CALENDLY_CONFIG.BOOKING_URL}`,
  
  // Get scheduled events
  SCHEDULED_EVENTS: `${CALENDLY_CONFIG.API_BASE_URL}/scheduled_events`,
  
  // Get user info
  USER_INFO: `${CALENDLY_CONFIG.API_BASE_URL}/users/${CALENDLY_CONFIG.USER_UUID}`,
  
  // Create scheduling link
  SCHEDULING_LINKS: `${CALENDLY_CONFIG.API_BASE_URL}/scheduling_links`
};

// Helper function to make authenticated API calls
export const makeCalendlyRequest = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${CALENDLY_CONFIG.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(endpoint, {
    ...defaultOptions,
    ...options
  });

  if (!response.ok) {
    throw new Error(`Calendly API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Helper function to get event types
export const getEventTypes = async () => {
  return makeCalendlyRequest(CALENDLY_ENDPOINTS.EVENT_TYPES);
};

// Helper function to get scheduled events
export const getScheduledEvents = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${CALENDLY_ENDPOINTS.SCHEDULED_EVENTS}?${queryString}`;
  return makeCalendlyRequest(url);
};

// Helper function to create a scheduling link
export const createSchedulingLink = async (eventTypeUri, maxEventCount = 1) => {
  const payload = {
    max_event_count: maxEventCount,
    owner: eventTypeUri
  };

  return makeCalendlyRequest(CALENDLY_ENDPOINTS.SCHEDULING_LINKS, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export default CALENDLY_CONFIG; 