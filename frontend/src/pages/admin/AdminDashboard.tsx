import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_ORGS } from '../../data/mockData';
import type { Organization, UserRole } from '../../types';
import {
  Building2,
  Users,
  Shield,
  Activity,
  Plus,
  Building,
  Target,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Send,
  Layers,
} from 'lucide-react';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  status: 'ACTIVE' | 'SUSPENDED';
  completedCourses: number;
  lastActive: string;
}

export const AdminDashboard: React.FC = () => {
  const { skills, auditLogs, setActiveCoursePlayerId, courses } = useApp();
  const [activeTab, setActiveTab] = useState<'tenants' | 'users' | 'skills' | 'intelligence' | 'audit'>('tenants');
  const [orgs, setOrgs] = useState<Organization[]>(INITIAL_ORGS);
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');

  // User Management State
  const [usersList, setUsersList] = useState<ManagedUser[]>([
    {
      id: 'u-1',
      name: 'Shekanna H',
      email: 'shekanna@shekslms.com',
      role: 'SUPER_ADMIN',
      organization: 'SHEK\'sLMS Global Platform',
      status: 'ACTIVE',
      completedCourses: 12,
      lastActive: 'Just now',
    },
    {
      id: 'u-2',
      name: 'Rajesh Sharma',
      email: 'admin@cloudscale.com',
      role: 'ORG_ADMIN',
      organization: 'CloudScale Technologies',
      status: 'ACTIVE',
      completedCourses: 4,
      lastActive: '15 mins ago',
    },
    {
      id: 'u-3',
      name: 'Ananya Iyer',
      email: 'ananya@cloudscale.com',
      role: 'TRAINER',
      organization: 'CloudScale Technologies',
      status: 'ACTIVE',
      completedCourses: 8,
      lastActive: '1 hour ago',
    },
    {
      id: 'u-4',
      name: 'Arjun Verma',
      email: 'arjun@cloudscale.com',
      role: 'LEARNER',
      organization: 'CloudScale Technologies',
      status: 'ACTIVE',
      completedCourses: 2,
      lastActive: '2 hours ago',
    },
    {
      id: 'u-5',
      name: 'Priya Sundaram',
      email: 'priya@zenith.com',
      role: 'LEARNER',
      organization: 'Zenith Global Financial',
      status: 'ACTIVE',
      completedCourses: 1,
      lastActive: '3 days ago',
    },
  ]);

  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');
  const [atRiskNudgeSent, setAtRiskNudgeSent] = useState<Record<string, boolean>>({});

  const handleAddOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName) return;

    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: orgName,
      slug: orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      primaryColor,
      userCount: 1,
      courseCount: 0,
      status: 'ACTIVE',
    };

    setOrgs((prev) => [...prev, newOrg]);
    setShowAddOrgModal(false);
    setOrgName('');
  };

  const toggleUserStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u))
    );
  };

  const handleExportCSV = () => {
    const csvHeader = 'ID,Name,Email,Role,Organization,Status,CompletedCourses,LastActive\n';
    const csvRows = usersList
      .map((u) => `${u.id},${u.name},${u.email},${u.role},${u.organization},${u.status},${u.completedCourses},${u.lastActive}`)
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sheks-lms-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendNudge = (learnerName: string) => {
    setAtRiskNudgeSent((prev) => ({ ...prev, [learnerName]: true }));
  };

  const filteredUsers = usersList.filter((u) => {
    return userRoleFilter === 'ALL' || u.role === userRoleFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Platform Governance Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin & Platform Governance</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Principal: Shekanna H
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-tenant data isolation, competency matrices, training intelligence, and compliance audit trail
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddOrgModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Provision New Tenant</span>
          </button>
        </div>
      </div>

      {/* Global Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Tenants</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{orgs.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Isolated Schemas</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Managed Users</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{usersList.length * 320}</p>
          <span className="text-[11px] text-slate-500">Across 5 enterprise tenants</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Platform Uptime</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">99.99%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Production SLAs Met</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Security Audit</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">Verified</p>
          <span className="text-[11px] text-purple-700 font-semibold">Zero-Trust & RBAC Compliant</span>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tenants')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'tenants'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Tenants & Workspaces ({orgs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User & Role Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'skills'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Skills & Competency Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('intelligence')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'intelligence'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Training Intelligence & Predictive Risk</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Security Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: TENANTS & WORKSPACES */}
      {activeTab === 'tenants' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs animate-in fade-in">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Enterprise Tenant Directory</h2>
              <p className="text-xs text-slate-500">
                Independent organization schemas with distinct subdomains, custom branding, and RBAC policies
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Organization Name</th>
                  <th className="p-4">Subdomain Identifier</th>
                  <th className="p-4">Active Learners</th>
                  <th className="p-4">Custom Curricula</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Brand Accent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orgs.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Building className="w-4 h-4" />
                      </div>
                      <span>{org.name}</span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">/{org.slug}</td>
                    <td className="p-4 font-semibold text-slate-800">{org.userCount * 45} users</td>
                    <td className="p-4 font-semibold text-slate-800">{org.courseCount + 3} courses</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {org.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-slate-200 shadow-2xs"
                        style={{ backgroundColor: org.primaryColor }}
                      />
                      <span className="font-mono text-[11px] text-slate-500">{org.primaryColor}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USER & ROLE DIRECTORY */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs animate-in fade-in space-y-4">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">User & Access Management</h2>
              <p className="text-xs text-slate-500">
                Manage roles, account statuses, and compliance completions across organizations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ORG_ADMIN">Org Admin</option>
                <option value="TRAINER">Trainer</option>
                <option value="LEARNER">Learner</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Tenant</th>
                  <th className="p-4">Completed</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          u.role === 'SUPER_ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : u.role === 'ORG_ADMIN'
                            ? 'bg-blue-100 text-blue-700'
                            : u.role === 'TRAINER'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700">{u.organization}</td>
                    <td className="p-4 font-semibold text-slate-800">{u.completedCourses} courses</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {u.role !== 'SUPER_ADMIN' && (
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 hover:bg-slate-100 transition-colors"
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS & COMPETENCY MATRIX (2026 AI FEATURE) */}
      {activeTab === 'skills' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/20 text-white backdrop-blur-md">
                2026 Talent Intelligence
              </span>
              <h2 className="text-xl font-bold mt-1">Enterprise Skills & Competency Matrix</h2>
              <p className="text-xs text-blue-200 mt-0.5 max-w-xl">
                Automatically maps verified assessment scores and capstone grades to industry competencies, calculating corporate capability gaps.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center shrink-0">
              <p className="text-2xl font-black text-amber-300">76%</p>
              <p className="text-[10px] uppercase font-semibold text-blue-200">Overall Coverage</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {skill.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">{skill.skillName}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200">
                      Gap: -{skill.gap}%
                    </span>
                  </div>

                  {/* Dual Proficiency Gauge */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">
                        Current Team Proficiency: <strong className="text-slate-900">{skill.currentProficiency}%</strong>
                      </span>
                      <span className="text-slate-500 font-medium">Target: {skill.targetProficiency}%</span>
                    </div>

                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.currentProficiency}%` }}
                      />
                      {/* Target Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-amber-500"
                        style={{ left: `${skill.targetProficiency}%` }}
                        title={`Target: ${skill.targetProficiency}%`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                    <p>
                      <strong>Recommended Training Path:</strong> {skill.recommendedCourse}
                    </p>
                    <p>
                      <strong>Certified Personnel:</strong> {skill.certifiedEmployeesCount} Engineers
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Assessed via capstone submissions</span>
                  <button
                    onClick={() => {
                      const matched = courses.find((c) => c.title === skill.recommendedCourse);
                      if (matched) setActiveCoursePlayerId(matched.id);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TRAINING INTELLIGENCE & PREDICTIVE RISK */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-base font-bold text-slate-900">Training Intelligence & Learner Risk Telemetry</h2>
            <p className="text-xs text-slate-500">
              Machine learning telemetry identifying lagging learners before exam deadlines
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* At Risk Learners Alert Box */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Learners Flagged at Risk of Deadline Failure</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  2 Flagged
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Priya Sundaram (Zenith Global Financial)</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Enrolled: Cybersecurity Essentials · Progress: 15% (3 days inactive)
                    </p>
                    <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                      Exam Scheduled: November 14 (Risk: 82% failure probability without intervention)
                    </p>
                  </div>
                  <button
                    onClick={() => handleSendNudge('Priya Sundaram')}
                    disabled={atRiskNudgeSent['Priya Sundaram']}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      atRiskNudgeSent['Priya Sundaram']
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                    }`}
                  >
                    {atRiskNudgeSent['Priya Sundaram'] ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Nudge Dispatched</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send AI Study Nudge</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Karan Mehta (NovaTech Innovations)</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Enrolled: Full-Stack React 19 · Progress: 30% (Capstone repo overdue)
                    </p>
                    <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                      Capstone Defense: November 25 (Needs changes on state synchronizer)
                    </p>
                  </div>
                  <button
                    onClick={() => handleSendNudge('Karan Mehta')}
                    disabled={atRiskNudgeSent['Karan Mehta']}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      atRiskNudgeSent['Karan Mehta']
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                    }`}
                  >
                    {atRiskNudgeSent['Karan Mehta'] ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Nudge Dispatched</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send AI Study Nudge</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Compliance Expiry Countdown */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm pb-3 border-b border-slate-100">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Regulatory Renewal Countdown</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Cybersecurity Refresher</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      28 Days Left
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">42 employees require annual recertification.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Workplace AI Ethics Policy</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      60 Days Left
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">118 employees enrolled in automated refresher.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs animate-in fade-in space-y-4">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Platform Security & Audit Logs</h2>
              <p className="text-xs text-slate-500">
                Immutable activity records for compliance reviews and security intrusion monitoring
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Audit Logging Active</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Timestamp (UTC+5:30)</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Event Action</th>
                  <th className="p-4">Tenant Scope</th>
                  <th className="p-4">Origin IP</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 text-slate-500">{log.timestamp}</td>
                    <td className="p-4 font-semibold text-slate-900 font-sans">{log.actor}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 font-sans">{log.tenant}</td>
                    <td className="p-4 text-slate-500">{log.ipAddress}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : log.status === 'WARNING'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {showAddOrgModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">Provision New Enterprise Tenant</h3>
            <p className="text-xs text-slate-500 mb-4">
              Instantiates isolated database scoping, customized domain slug, and dedicated RBAC workspace
            </p>

            <form onSubmit={handleAddOrg} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Apex HealthCare Systems"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Brand Accent (Hex)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 p-1 rounded-xl border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddOrgModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
                >
                  Provision Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
