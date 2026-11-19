import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyCredentials,
  normalizeRole,
  getRoleDisplayName,
  registerCustomUser,
  setAuthenticatedSession,
} from "../../../../services/authService";

export function useLoginForm({
  isOpen,
  selectedRole,
  initialView,
  roleConfig,
  onClose,
  onLoginSuccess,
  onSwitchView,
  onAdminLogin,
}) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialView === "login");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialView === "login");
      setErrors({});
      setMessage("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, initialView, selectedRole]);

  const changeView = () => {
    setIsLogin((prev) => {
      const next = !prev;
      if (onSwitchView) onSwitchView(next ? "login" : "signup");
      return next;
    });
    setErrors({});
    setMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!form.full_name.trim()) {
        newErrors.full_name = "Full name is required";
      } else if (form.full_name.trim().length < 3) {
        newErrors.full_name = "Please enter a valid full name";
      }
    }

    const email = form.email.trim();
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!isLogin) {
      const phone = form.phone.trim();
      if (!phone) {
        newErrors.phone = "Mobile number is required";
      } else if (!/^[6-9]\d{9}$/.test(phone)) {
        newErrors.phone = "Please enter a valid 10-digit mobile number";
      }
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (isLogin && selectedRole === "student") {
      // Any password accepted for student login
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!form.confirm_password) {
        newErrors.confirm_password = "Please confirm your password";
      } else if (form.password !== form.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (isLogin) {
      const authResult = verifyCredentials(email, password, selectedRole);
      if (!authResult.success) {
        setErrors({
          general:
            authResult.error ||
            "Invalid email or password. Please verify your credentials.",
        });
        return;
      }

      const authenticatedUser = authResult.user;
      const normalizedUserRole = normalizeRole(authenticatedUser.role);
      const normalizedSelectedRole = normalizeRole(selectedRole);

      if (normalizedUserRole !== normalizedSelectedRole) {
        const actualRoleName = getRoleDisplayName(normalizedUserRole);
        const selectedDashboardName = roleConfig.displayName;
        setErrors({
          general: `Role mismatch: This account has the role of ${actualRoleName}, but you are attempting to log in to ${selectedDashboardName}. Please return to dashboard selection and choose ${actualRoleName} Dashboard.`,
        });
        return;
      }

      setAuthenticatedSession(authenticatedUser);
      if (onClose) onClose();
      if (onLoginSuccess) onLoginSuccess();
      if (onAdminLogin && normalizedUserRole === "admin") onAdminLogin();

      const targetRoute =
        roleConfig.route ||
        authenticatedUser.targetDashboard ||
        "/dashboard";
      navigate(targetRoute);
      return;
    }

    registerCustomUser({
      email,
      password: form.password,
      full_name: form.full_name,
      phone: form.phone,
      role: selectedRole,
    });

    setMessage("Account created successfully! Please sign in with your credentials.");
    setMessageType("success");
    setIsLogin(true);
    if (onSwitchView) onSwitchView("login");

    setForm((prev) => ({
      ...prev,
      password: "",
      confirm_password: "",
    }));
  };

  return {
    isLogin,
    form,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    message,
    messageType,
    handleChange,
    handleSubmit,
    changeView,
  };
}
