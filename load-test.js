import http from 'k6/http';
import { Counter } from 'k6/metrics';

const requests = new Counter('requests_per_instance');

export const options = {
  vus: 20,
  duration: '10s',
};

export default function () {
  const res = http.get('{ELB DNS}');
  const instanceId = res.json('instanceId') || 'unknown';

  console.log(`instance=${instanceId}`);

  // ✅ increment counter with a dynamic tag
  requests.add(1, { instance: instanceId });
}
