import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nguydbw8', // User's real Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
});

export default client; 