// login.k6.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    login_test: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "2m", target: 10_000 }, // sobe até 10 000 usuários
        { duration: "5m", target: 10_000 }, // mantém
        { duration: "1m", target: 0 }, // rampa para baixo
      ],
      gracefulRampDown: "30s",
    },
  },
};

export default function () {
  const res = http.post("https://seusite.com/api/login", {
    email: "teste@example.com",
    password: "senha123",
  });

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  // pensa 1 s para simular o usuário navegando
  sleep(1);
}
