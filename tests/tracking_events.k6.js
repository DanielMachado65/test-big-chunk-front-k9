import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL;
if (!BASE_URL) {
  throw new Error(
    "Defina BASE_URL antes de rodar o teste (ex.: BASE_URL=https://meusite.com)"
  );
}

export const options = {
  scenarios: {
    login_test: {
      executor: "ramping-vus",
      stages: [
        { duration: "2m", target: 10_000 },
        { duration: "5m", target: 10_000 },
        { duration: "1m", target: 0 },
      ],
    },
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function () {
  const ids = ["input-email", "input-password", "login-btn"];
  const types = ["input", "click", "error", "rejection"];

  const payload = ids.map((baseId, idx) => ({
    id: `${baseId}-${__VU}-${__ITER}`,
    type: pick(types),
    timestamp: Date.now() + idx,
  }));

  const params = { headers: { "Content-Type": "application/json" } };
  const res = http.post(
    `${BASE_URL}/prod/tracking`,
    JSON.stringify(payload),
    params
  );

  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}
