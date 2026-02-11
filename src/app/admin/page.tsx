import DashboardStats from "./components/DashboardStats";
import { readClientData, readBookingData, readServicesData } from "./lib/data";

export default function DashboardPage() {
  // Read real data from JSON files
  const clientsData = readClientData();
  const bookingsData = readBookingData();

  // Calculate stats
  const totalClients = clientsData.clients.length;
  const totalBookings = bookingsData.bookings.length;
  const pendingBookings = bookingsData.bookings.filter((b: any) => b.status === "new" || b.status === "contacted").length;
  const completedBookings = bookingsData.bookings.filter((b: any) => b.status === "completed").length;
  const totalRevenue = bookingsData.bookings.reduce((sum: number, b: any) => sum + (b.price || 0), 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with RGV Handyman today.</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats
        totalClients={totalClients}
        totalBookings={totalBookings}
        pendingBookings={pendingBookings}
        totalRevenue={totalRevenue}
        completedBookings={completedBookings}
      />

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {bookingsData.bookings.slice(0, 5).map((booking: any, index: number) => (
              <div key={index} className="flex items-start space-x-4 pb-4 border-b border-white/5 last:border-0">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      booking.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "scheduled"
                        ? "bg-blue-500/20 text-blue-400"
                        : booking.status === "cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {booking.status === "completed" && "✅"}
                    {booking.status === "scheduled" && "📅"}
                    {booking.status === "cancelled" && "❌"}
                    {(booking.status === "new" || booking.status === "contacted") && "➕"}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{booking.clientName}</h4>
                  <p className="text-gray-400 text-sm">{booking.serviceName}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    booking.status === "completed" ? "bg-green-500/20 text-green-300" :
                    booking.status === "scheduled" ? "bg-blue-500/20 text-blue-300" :
                    booking.status === "cancelled" ? "bg-red-500/20 text-red-300" :
                    "bg-amber-500/20 text-amber-300"
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">${booking.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Service Areas</h3>
              <div className="flex flex-wrap gap-2">
                {["McAllen", "Edinburg", "Mission", "Brownsville", "Harlingen", "Pharr", "Weslaco"].map((city, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs border border-teal-500/20">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Top Services</h3>
              <div className="space-y-3">
                {[
                  { name: "Plumbing", count: 12, color: "cyan" },
                  { name: "HVAC", count: 8, color: "blue" },
                  { name: "Electrical", count: 6, color: "yellow" },
                  { name: "Painting", count: 4, color: "purple" },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{service.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm">{service.count}</span>
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${
                          service.color === "cyan" ? "bg-cyan-500" :
                          service.color === "blue" ? "bg-blue-500" :
                          service.color === "yellow" ? "bg-amber-500" : "bg-purple-500"
                        }`} style={{ width: `${(service.count / 15) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Next Follow-up</p>
                <p className="text-lg font-bold text-teal-400">{pendingBookings} pending bookings</p>
                <button className="mt-3 w-full py-2 rounded-lg bg-teal-500/10 text-teal-400 text-sm hover:bg-teal-500/20 transition-colors">
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
