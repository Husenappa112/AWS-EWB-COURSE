import React, { useState } from 'react';
import { INITIAL_ORGS } from '../../data/mockData';
import type { Organization } from '../../types';
import {
  Building2,
  Users,
  Shield,
  Activity,
  Plus,
  Building,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [orgs, setOrgs] = useState<Organization[]>(INITIAL_ORGS);
  const [showAddOrgModal, setShowAddOrgModal] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');

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

  return (
    <div className="space-y-8">
      {/* Platform Governance Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Super Admin & Multi-Tenant Control</h1>
          <p className="text-xs text-slate-500">
            Global organization provisioning, tenant data isolation, and system audit trail
          </p>
        </div>
        <button
          onClick={() => setShowAddOrgModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Tenant</span>
        </button>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Tenants</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{orgs.length}</p>
          <span className="text-[11px] text-emerald-600 font-medium">100% Isolated Data</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Users</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">1,460</p>
          <span className="text-[11px] text-slate-500">Across all enterprise tenants</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Platform Uptime</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">99.98%</p>
          <span className="text-[11px] text-emerald-600 font-medium">SLAs Met</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Security Audit</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">Passed</p>
          <span className="text-[11px] text-slate-500">RBAC & bcrypt verified</span>
        </div>
      </div>

      {/* Organizations / Tenants Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Provisioned Organizations</h2>
            <p className="text-xs text-slate-500">
              Isolated enterprise workspaces with custom branding and domain routing
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Organization</th>
                <th className="p-4">Tenant Identifier</th>
                <th className="p-4">Users</th>
                <th className="p-4">Courses</th>
                <th className="p-4">Status</th>
                <th className="p-4">Primary Brand Color</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>{org.name}</span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-500">/{org.slug}</td>
                  <td className="p-4 font-semibold text-slate-800">{org.userCount}</td>
                  <td className="p-4 font-semibold text-slate-800">{org.courseCount}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {org.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-200"
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

      {/* Add Tenant Modal */}
      {showAddOrgModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-1">Provision New Enterprise Tenant</h3>
            <p className="text-xs text-slate-500 mb-4">
              Instantiates isolated database scoping and organization workspace
            </p>

            <form onSubmit={handleAddOrg} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Nexus Technology Labs"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand Color (Hex)
                </label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-10 p-1 rounded-xl border border-slate-200 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddOrgModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
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
