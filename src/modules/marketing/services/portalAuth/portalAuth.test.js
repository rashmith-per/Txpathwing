import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { generateSalt, hashPassword, verifyPassword } from "./portalCrypto.js";
import {
  registerPortalAccount,
  loginPortalAccount,
  logoutPortalAccount,
  getCurrentPortalUser,
} from "./portalAuthService.js";
import {
  getStoredPortalUsers,
  savePortalUsers,
  findPortalUserByEmail,
  clearActivePortalUser,
} from "./portalStorage.js";

// Mock localStorage for Node test runner
const mockStore = {};
global.localStorage = {
  getItem: (key) => mockStore[key] || null,
  setItem: (key, val) => {
    mockStore[key] = String(val);
  },
  removeItem: (key) => {
    delete mockStore[key];
  },
  clear: () => {
    for (const k of Object.keys(mockStore)) delete mockStore[k];
  },
};
global.window = {
  dispatchEvent: () => {},
};

describe("Portal Cryptography Engine", () => {
  it("generates random salts", () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    assert.ok(salt1);
    assert.ok(salt2);
    assert.notStrictEqual(salt1, salt2);
  });

  it("hashes password and verifies matches", async () => {
    const salt = generateSalt();
    const pass = "SecurePass123!";
    const hash = await hashPassword(pass, salt);

    assert.ok(hash);
    const isValid = await verifyPassword(pass, salt, hash);
    assert.strictEqual(isValid, true);

    const isWrong = await verifyPassword("WrongPassword", salt, hash);
    assert.strictEqual(isWrong, false);
  });
});

describe("Dynamic Registration Workflow", () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  it("validates required fields during registration", async () => {
    const result = await registerPortalAccount({
      username: "",
      category: "institution",
      entityName: "",
      email: "invalid-email",
      password: "123",
      confirmPassword: "456",
    });

    assert.strictEqual(result.success, false);
    assert.ok(result.errors.username);
    assert.ok(result.errors.entityName);
    assert.ok(result.errors.email);
    assert.ok(result.errors.password);
    assert.ok(result.errors.confirmPassword);
  });

  it("registers a dynamic Institution account with logo and hashed password", async () => {
    const fakeLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
    const regResult = await registerPortalAccount({
      username: "Vamshi",
      category: "institution",
      entityName: "ABC Engineering College",
      email: "admin@abccollege.com",
      password: "CollegePassword2026!",
      confirmPassword: "CollegePassword2026!",
      logo: fakeLogo,
    });

    assert.strictEqual(regResult.success, true);
    assert.strictEqual(regResult.user.username, "Vamshi");
    assert.strictEqual(regResult.user.entityName, "ABC Engineering College");
    assert.strictEqual(regResult.user.email, "admin@abccollege.com");
    assert.strictEqual(regResult.user.logo, fakeLogo);
    assert.strictEqual(regResult.user.category, "institution");
    assert.strictEqual(regResult.user.status, "Active");
    assert.ok(regResult.user.userId);
    assert.ok(regResult.user.passwordHash);
    assert.notStrictEqual(regResult.user.passwordHash, "CollegePassword2026!"); // Hashed!

    // Verify stored in DB
    const saved = findPortalUserByEmail("admin@abccollege.com");
    assert.ok(saved);
    assert.strictEqual(saved.username, "Vamshi");
  });

  it("enforces email uniqueness against existing accounts", async () => {
    await registerPortalAccount({
      username: "First User",
      category: "organization",
      entityName: "Tech Org",
      email: "duplicate@org.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });

    const dupResult = await registerPortalAccount({
      username: "Second User",
      category: "organization",
      entityName: "Another Org",
      email: "duplicate@org.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });

    assert.strictEqual(dupResult.success, false);
    assert.ok(dupResult.errors.email.includes("already exists"));
  });

  it("registers Organization and Company accounts with proper dynamic categories", async () => {
    const org = await registerPortalAccount({
      username: "Rajesh",
      category: "organization",
      entityName: "Global Tech Foundation",
      email: "rajesh@globaltech.org",
      password: "OrgPassword2026!",
      confirmPassword: "OrgPassword2026!",
    });
    assert.strictEqual(org.success, true);
    assert.strictEqual(org.user.category, "organization");

    const comp = await registerPortalAccount({
      username: "Priya",
      category: "company",
      entityName: "Acme Technologies Inc.",
      email: "priya@acmetech.com",
      password: "CompanyPassword2026!",
      confirmPassword: "CompanyPassword2026!",
    });
    assert.strictEqual(comp.success, true);
    assert.strictEqual(comp.user.category, "company");
  });
});

describe("Dynamic Authentication and Profile Isolation", () => {
  beforeEach(async () => {
    global.localStorage.clear();
    await registerPortalAccount({
      username: "Vamshi",
      category: "institution",
      entityName: "ABC Engineering College",
      email: "admin@abccollege.com",
      password: "SecretPassword123!",
      confirmPassword: "SecretPassword123!",
      logo: "data:image/png;base64,ABC_LOGO",
    });
  });

  it("fails login with incorrect password", async () => {
    const res = await loginPortalAccount({
      email: "admin@abccollege.com",
      password: "WrongPassword999",
    });
    assert.strictEqual(res.success, false);
    assert.ok(res.error.includes("Incorrect password"));
  });

  it("successfully authenticates and generates isolated user session", async () => {
    const res = await loginPortalAccount({
      email: "admin@abccollege.com",
      password: "SecretPassword123!",
      rememberMe: true,
    });

    assert.strictEqual(res.success, true);
    assert.strictEqual(res.user.username, "Vamshi");
    assert.strictEqual(res.user.entityName, "ABC Engineering College");
    assert.strictEqual(res.user.logo, "data:image/png;base64,ABC_LOGO");
    assert.strictEqual(res.dashboardRoute, "/institution-dashboard");

    // Check active session
    const current = getCurrentPortalUser();
    assert.ok(current);
    assert.strictEqual(current.username, "Vamshi");
    assert.strictEqual(current.entityName, "ABC Engineering College");
  });

  it("logs out and clears session securely", async () => {
    await loginPortalAccount({
      email: "admin@abccollege.com",
      password: "SecretPassword123!",
    });

    assert.ok(getCurrentPortalUser());
    logoutPortalAccount();
    assert.strictEqual(getCurrentPortalUser(), null);
  });
});
