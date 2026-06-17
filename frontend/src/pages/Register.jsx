import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/authService';
import { loginSuccess } from '../store/authSlice';
import { showToast } from '../store/uiSlice';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // exclude confirmPassword from payload
        const { confirmPassword, ...registerData } = values;
        
        const data = await authService.register(registerData);
        
        if (data.token) {
          dispatch(loginSuccess({ token: data.token, user: data.data }));
          dispatch(showToast({ message: 'Registration successful!', severity: 'success' }));
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Registration failed', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-md p-8 rounded-[24px]"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4 border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-muted mt-2">Join the Grandmaster Analytics platform</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="e.g. MagnusC"
              className={`w-full bg-black/20 border ${formik.touched.username && formik.errors.username ? 'border-danger focus:border-danger' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:ring-1 ${formik.touched.username && formik.errors.username ? 'focus:ring-danger' : 'focus:ring-primary'} transition-colors`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-xs text-danger mt-1">{formik.errors.username}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="grandmaster@chess.com"
              className={`w-full bg-black/20 border ${formik.touched.email && formik.errors.email ? 'border-danger focus:border-danger' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:ring-1 ${formik.touched.email && formik.errors.email ? 'focus:ring-danger' : 'focus:ring-primary'} transition-colors`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-danger mt-1">{formik.errors.email}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full bg-black/20 border ${formik.touched.password && formik.errors.password ? 'border-danger focus:border-danger' : 'border-white/10 focus:border-primary'} rounded-xl pl-4 pr-12 py-3 text-white placeholder-muted focus:outline-none focus:ring-1 ${formik.touched.password && formik.errors.password ? 'focus:ring-danger' : 'focus:ring-primary'} transition-colors`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white p-1 rounded-md transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-danger mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full bg-black/20 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-danger focus:border-danger' : 'border-white/10 focus:border-primary'} rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:ring-1 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'focus:ring-danger' : 'focus:ring-primary'} transition-colors`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-danger mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
            ) : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-bold transition-colors">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
