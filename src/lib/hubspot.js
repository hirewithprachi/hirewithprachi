export async function addContactToHubSpot({ email, firstname, lastname }) {
  // Updated with real HubSpot API key and portal ID
  const apiKey = 'na2-2756-5f24-45c9-8d7b-d08e8ad93839';
  const portalId = '243445611';
  const url = `https://api.hubapi.com/contacts/v1/contact?hapikey=${apiKey}`;
  const data = {
    properties: [
      { property: 'email', value: email },
      { property: 'firstname', value: firstname || '' },
      { property: 'lastname', value: lastname || '' },
    ],
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('HubSpot API error');
    return true;
  } catch (err) {
    // For demo, just log error
    console.error('HubSpot error:', err);
    return false;
  }
} 