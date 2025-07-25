import React, { useState } from 'react';
import FormField from '../FormField/FormField';
import Button from '../Button/Button';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useAuth } from '../../context/AuthContext';
import './LoginForm.css';

export default function LoginForm({ onLogin, onSignUp }) {
  const { login, socialLogin, error: authError, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      setErrors({ general: error.message || 'Giriş başarısız oldu. Lütfen tekrar deneyin.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-form-section">
      <img src="/logo.png" alt="Logo" style={{ width: 48, height: 48, position: 'absolute', top: 24, left: 24 }} />
      <header className="form-header">
        <h1 className="form-title">Sign in</h1>
        <p className="form-subtitle">If you don't have an account register</p>
        <p className="form-register-link">
          You can{' '}
          <span className="register-link" onClick={onSignUp} style={{ cursor: 'pointer' }}>Register here !</span>
        </p>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          icon="email"
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleInputChange}
          icon="password"
          showPasswordToggle={true}
          error={errors.password}
        />
        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="checkbox"
            />
            <span className="checkbox-label">Remember me</span>
          </label>
          <a href="#" className="forgot-password">Forgot Password ?</a>
        </div>
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <SocialLogin onSocialLogin={onLogin} />
      </form>
    </section>
  );
}
