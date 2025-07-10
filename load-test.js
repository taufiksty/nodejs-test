import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

const instanceCount = {};

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const res = http.get('http://<ALB_DNS_NAME>/');

  const json = res.json();
  const instanceId = json.instanceId || 'unknown';

  if (!instanceCount[instanceId]) {
    instanceCount[instanceId] = new Counter(instanceId);
  }

  instanceCount[instanceId].add(1);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
