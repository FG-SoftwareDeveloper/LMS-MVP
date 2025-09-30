import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">System administration and management</p>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
        <div className="text-6xl mb-4">⚙️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Panel</h3>
        <p className="text-gray-500">Administrative features and system management tools coming soon.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;