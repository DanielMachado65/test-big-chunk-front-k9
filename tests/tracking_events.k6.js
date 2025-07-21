import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL;
const EMAIL = __ENV.EMAIL || "teste@example.com";
const PASSWORD = __ENV.PASSWORD || "senha123";

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

export default function () {
  const res = http.post(`${BASE_URL}/prod/tracking`, {
    email: EMAIL,
    password: PASSWORD,
  });

  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}
