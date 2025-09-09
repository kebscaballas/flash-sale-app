import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '2m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<400'],
  },
};

const BASE = 'http://api:3000';

const currentDate = new Date();
const currentDateIsoString = currentDate.toISOString();

const tomorrowDate = new Date();
tomorrowDate.setDate(currentDate.getDate() + 1);
const tomorrowDateIsoString = tomorrowDate.toISOString();

export default function () {
  const payload = JSON.stringify({
    started_at: currentDateIsoString,
    ended_at: tomorrowDateIsoString,
  });

  const response = http.post(`${BASE}/api/flash_sales`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(response, {
    'status is 200/201/202': (r) => [200, 201, 202].includes(r.status),
  });

  sleep(0.2);
}
