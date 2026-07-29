'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, LogOut, AlertTriangle, Lock, Mail, Users, ExternalLink } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { supabase } from '../lib/supabaseClient';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

const adminTools = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Certificate Manager',
    desc: 'Add, view, revoke, or delete certificates issued by Sarwagyna.',
    path: '/admin/certificates',
    badge: 'Active',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Client Management',
    desc: 'Manage clients, projects, invoices and payment tracking.',
    path: '/admin/clients',
    badge: 'Active',
  },
];


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });
    setLoading(false);
    if (err) setError(err.message);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="card p-10 rounded-3xl w-full max-w-sm"
      >
        <div className="w-16 h-16 rounded-2xl bg-green-light flex items-center justify-center mx-auto mb-6 text-(--color-green-icon)">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-display font-bold text-text mb-1 text-center">Admin Login</h1>
        <p className="text-text-secondary text-sm mb-8 text-center">Sarwagyna Admin Portal</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-text-secondary mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border-subtle text-text focus:outline-none transition-colors text-sm"
                placeholder="admin@sarwagyna.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-text-secondary mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border-subtle text-text focus:outline-none transition-colors text-sm"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="glass-button-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {loading
              ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              : <Lock className="w-4 h-4" />
            }
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { session, loading, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <span className="animate-spin w-8 h-8 border-2 border-border-subtle border-t-text rounded-full" />
      </div>
    );
  }

  if (!session) return <LoginForm />;

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="section-label mb-3">SARWAGYNA</div>
            <h1 className="text-4xl font-display font-bold text-text mb-1">Admin Dashboard</h1>
            <p className="text-text-secondary text-sm">Logged in as <span className="font-medium text-text">{session.user.email}</span></p>
          </div>
          <button
            onClick={signOut}
            className="glass-button-ghost px-5 py-2.5 flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminTools.map((tool, i) => (
            <motion.button
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => router.push(tool.path)}
              className="card p-8 rounded-2xl text-left group hover:scale-[1.02] transition-transform duration-200 cursor-pointer w-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center text-(--color-green-icon) group-hover:scale-110 transition-transform duration-200">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                  {tool.badge}
                </span>
              </div>
              <h2 className="text-xl font-display font-bold text-text mb-2">{tool.title}</h2>
              <p className="text-text-secondary text-sm leading-relaxed">{tool.desc}</p>
            </motion.button>
          ))}

          <motion.a
            href="/blogstudio"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.4 }}
            className="card p-8 rounded-2xl text-left group hover:scale-[1.02] transition-transform duration-200 w-full border-dashed"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center text-(--color-green-icon)">
                <ExternalLink className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-text/5 text-text-muted">
                Sanity
              </span>
            </div>
            <h2 className="text-xl font-display font-bold text-text mb-2">Job Listings</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Careers listings are managed in Sanity Studio. Open the studio to add, edit, or
              activate roles.
            </p>
          </motion.a>
        </div>

      </div>
    </div>
  );
}
