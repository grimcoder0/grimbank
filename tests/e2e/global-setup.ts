import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { request } from "@playwright/test";
import { E2E_EMAIL, E2E_NAME, E2E_PASSWORD } from "./test-user";

const BASE = "http://localhost:3000";
const STATE_PATH = "tests/e2e/.auth/user.json";

export default async function globalSetup() {
  mkdirSync(dirname(STATE_PATH), { recursive: true });

  const api = await request.newContext({
    baseURL: BASE,
    extraHTTPHeaders: { Origin: BASE },
  });

  // Creating the user fails harmlessly on later runs, because it already exists.
  await api.post("/api/auth/sign-up/email", {
    data: { name: E2E_NAME, email: E2E_EMAIL, password: E2E_PASSWORD },
  });

  const login = await api.post("/api/auth/sign-in/email", {
    data: { email: E2E_EMAIL, password: E2E_PASSWORD },
  });
  if (!login.ok()) {
    throw new Error(`Test sign-in failed with status ${login.status()}`);
  }

  await api.storageState({ path: STATE_PATH });
  await api.dispose();
}
