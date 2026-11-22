// Downloads the public Galactic War data from the Helldivers 2 community API and writes out/war.json.
// Run by .github/workflows/update.yml. If the API does not answer, nothing is written and the last file stays.
import { mkdir, writeFile } from 'node:fs/promises';

const API = 'https://api.helldivers2.dev';
const HEADERS = {
  'X-Super-Client': 'dropzone-intel-data',
  'X-Super-Contact': 'https://github.com/zorggamestudio/dropzone-intel-data',
  Accept: 'application/json',
  'Accept-Language': 'en-US',
};

async function list(path) {
  const res = await fetch(API + path, { headers: HEADERS, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error(`${path}: not a list`);
  return data;
}

try {
  // One after the other: the API allows 5 requests every 10 seconds.
  const assignments = await list('/api/v1/assignments');
  const campaigns = await list('/api/v1/campaigns');
  await mkdir('out', { recursive: true });
  await writeFile('out/war.json', JSON.stringify({ v: 2, at: new Date().toISOString(), assignments, campaigns }));
  console.log(`ok: ${assignments.length} assignment(s), ${campaigns.length} campaign(s)`);
} catch (err) {
  // Not a failure of the workflow: the previous file stays online until the API answers again.
  console.log(`skipped: ${err?.message ?? err}`);
}
