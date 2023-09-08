import { getKVMonitors } from '$lib/functions/helpers.js';

export async function GET({ request, platform }) {
  if (platform?.env) {
    try {
      const kvMonitors = await getKVMonitors(platform.env);
      return new Response(JSON.stringify(kvMonitors), {
        headers: {
          'content-type': 'application/json'
        }
      });
    } catch (err) {
      return new Response(err?.message || err?.stack || JSON.stringify(err));
    }
  }

  return new Response(JSON.stringify({ firstCheck: null, lastCheck:{}, monitors: {} }), {
    headers: {
      'content-type': 'application/json'
    }
  });
}
