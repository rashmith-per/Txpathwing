/**
 * Staff API Client Service
 * Dispatches REST API requests to backend endpoints with fallback router resilience
 */

import { StaffApiRouter } from "../backend/api/staffApiRouter.js";

const BASE_URL = "/api/institution/staff";

async function executeApiRequest(method, url, body = null) {
  // If Vite server middleware is active and serving, fetch will work.
  // We use fallback to StaffApiRouter for standard in-browser and offline execution.
  const isNodeOrTest = typeof window === "undefined" || window.__TX_MOCK_API__ === true;
  if (isNodeOrTest) {
    const res = await StaffApiRouter.handleRequest({ method, url, body });
    if (!res.body.success) {
      const err = new Error(res.body.error || "API Request failed");
      err.status = res.status;
      err.errors = res.body.errors;
      err.field = res.body.field;
      throw err;
    }
    return res.body;
  }

  // Try standard fetch first (if proxy or mock-server is running)
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (!res.ok || !data.success) {
        const err = new Error(data.error || `HTTP error ${res.status}`);
        err.status = res.status;
        err.errors = data.errors;
        err.field = data.field;
        throw err;
      }
      return data;
    }
  } catch (fetchErr) {
    if (fetchErr.status) throw fetchErr;
    // Fallback to internal REST Router
  }

  const routerRes = await StaffApiRouter.handleRequest({ method, url, body });
  if (!routerRes.body.success) {
    const err = new Error(routerRes.body.error || "API Request failed");
    err.status = routerRes.status;
    err.errors = routerRes.body.errors;
    err.field = routerRes.body.field;
    throw err;
  }
  return routerRes.body;
}

export const staffApi = {
  /**
   * GET /api/institution/staff
   */
  async getStaffList(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        query.append(key, String(val));
      }
    });

    const url = `${BASE_URL}${query.toString() ? `?${query.toString()}` : ""}`;
    return executeApiRequest("GET", url);
  },

  /**
   * GET /api/institution/staff/{id}
   */
  async getStaffById(id) {
    const url = `${BASE_URL}/${encodeURIComponent(id)}`;
    return executeApiRequest("GET", url);
  },

  /**
   * POST /api/institution/staff
   */
  async createStaff(payload) {
    const res = await executeApiRequest("POST", BASE_URL, payload);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("staff_record_created", { detail: res.data }));
    }
    return res;
  },

  /**
   * PUT /api/institution/staff/{id}
   */
  async updateStaff(id, payload) {
    const url = `${BASE_URL}/${encodeURIComponent(id)}`;
    const res = await executeApiRequest("PUT", url, payload);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("staff_record_updated", { detail: res.data }));
    }
    return res;
  },

  /**
   * PATCH /api/institution/staff/{id}/status
   */
  async updateStaffStatus(id, status, reason = "") {
    const url = `${BASE_URL}/${encodeURIComponent(id)}/status`;
    const res = await executeApiRequest("PATCH", url, { status, reason });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("staff_status_changed", { detail: res.data }));
    }
    return res;
  },

  /**
   * DELETE /api/institution/staff/{id}
   */
  async deleteStaff(id) {
    const url = `${BASE_URL}/${encodeURIComponent(id)}`;
    const res = await executeApiRequest("DELETE", url);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("staff_record_deleted", { detail: { id } }));
    }
    return res;
  },

  /**
   * GET /api/institution/staff/statistics
   */
  async getStaffStatistics() {
    const url = `${BASE_URL}/statistics`;
    return executeApiRequest("GET", url);
  },

  /**
   * GET /api/institution/staff/statistics (standard alias matching learnerApi / learningApi)
   */
  async getStatistics() {
    const res = await this.getStaffStatistics();
    return res && res.data ? res.data : res;
  },
};
