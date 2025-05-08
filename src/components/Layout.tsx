import React from 'react';

const sidebarItems = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '💸', label: 'Transactions' },
  { icon: '🎁', label: 'Rewards' },
  { icon: '⚙️', label: 'Settings' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-gray-900 bg-opacity-80 backdrop-blur-lg border-r border-gray-800 flex flex-col items-center py-8">
        <div className="mb-10 flex flex-col items-center">
          <img src="/vite.svg" alt="Logo" className="w-10 h-10 mb-2" />
          <span className="text-xl font-bold text-white tracking-wide hidden lg:block">CoinFusion</span>
        </div>
        <nav className="flex flex-col gap-8 mt-8 w-full items-center">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition w-16 lg:w-48 justify-center lg:justify-start"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="hidden lg:inline text-white text-base font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto mb-4">
          <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700">
            <span className="text-xl">👤</span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900 bg-opacity-70 backdrop-blur-lg">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 bg-opacity-60 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700">
              <span className="text-xl">🔔</span>
            </button>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-blue-500" />
          </div>
        </header>
        {/* Main Area */}
        <main className="flex-1 p-6 bg-gray-900 bg-opacity-80 backdrop-blur-lg overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 