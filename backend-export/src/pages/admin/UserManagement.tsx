import React from 'react';

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
        <p className="text-gray-500">User administration and role management features coming soon.</p>
      </div>
    </div>
  );
};

export default UserManagement;