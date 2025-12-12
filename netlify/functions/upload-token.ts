import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const { filename, contentType } = JSON.parse(event.body || '{}');

    if (!filename || !contentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing filename or contentType' }),
      };
    }

    const timestamp = Date.now();
    const safeName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `tracks/${user.id}/${timestamp}_${safeName}`;

    const { data, error } = await supabase.storage
      .from('audio-files')
      .createSignedUploadUrl(storagePath);

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: data.signedUrl,
        storagePath: storagePath,
        token: data.token,
      }),
    };
  } catch (error: any) {
    console.error('Error creating upload token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};