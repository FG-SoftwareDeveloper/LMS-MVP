import React from 'react';

const Chat: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        <p className="text-gray-600 mt-1">Real-time communication with instructors and peers</p>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chat System</h3>
        <p className="text-gray-500">Real-time messaging and communication features coming soon.</p>
      </div>
    </div>
  );
};

export default Chat;