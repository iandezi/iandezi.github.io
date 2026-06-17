export default {
  async fetch(request, env) {
    const origin = getAllowedOrigin(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    try {
      const body = await request.json();
      const res = await fetch(
        `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_TABLE_ID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: [{ fields: body }],
            typecast: true,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) return json({ error: data.error }, res.status, origin);
      return json({ success: true, id: data.records[0].id }, 200, origin);
    } catch (err) {
      return json({ error: 'Internal error' }, 500, origin);
    }
  },
};

function getAllowedOrigin(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',');
  if (allowed.includes(origin)) return origin;
  return allowed[0] || '';
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}
