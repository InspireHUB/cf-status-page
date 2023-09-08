import { processCronTrigger } from '$lib/functions/cronTrigger';

export async function POST({ platform, request }) {
  if (platform?.env) {
    const auth = request.headers.get('Authorization');
    if (platform.env.AUTH_TOKEN !== auth) {
      return new Response('unauthorized', { status: 401 });
    }
    try {
      const checkDay = await processCronTrigger(platform.env);
      return new Response(`triggered event OK: ${checkDay}`);
    } catch (err: unknown) {
      console.error(err);
      return new Response(err?.message || err?.stack || JSON.stringify(err));
    }
  }

  return new Response('no platform.env');
}
