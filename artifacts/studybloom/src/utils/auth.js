const ACCOUNTS_KEY = "studybloom-accounts";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "studybloom-salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getAccounts() {
  try {
    const stored = localStorage.getItem(ACCOUNTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function usernameExists(username) {
  const accounts = getAccounts();
  return username.toLowerCase() in accounts;
}

export async function createAccount(username, password) {
  const accounts = getAccounts();
  const key = username.toLowerCase();
  if (key in accounts) {
    return { success: false, error: "This username is already taken. Please choose another." };
  }
  const hash = await hashPassword(password);
  accounts[key] = { displayName: username, hash };
  saveAccounts(accounts);
  return { success: true };
}

export async function verifyLogin(username, password) {
  const accounts = getAccounts();
  const key = username.toLowerCase();
  if (!(key in accounts)) {
    return { success: false, error: "Username not found. Check the spelling or create an account." };
  }
  const hash = await hashPassword(password);
  if (accounts[key].hash !== hash) {
    return { success: false, error: "Incorrect password. Please try again." };
  }
  return { success: true, displayName: accounts[key].displayName };
}
