import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import {
  HomeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  PlusIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function BrokerDashboard() {
  const [stats, setStats] = useState(null);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get("/api/dashboard/broker").catch(() => ({ data: { properties: 0, inquiries: 0, favorites: 0, cities: {} } })),
      api.get("/api/properties/my").catch(() => ({ data: [] }))
    ]).then(([dashboardRes, propertiesRes]) => {
      setStats(dashboardRes.data);
      setRecentProperties(propertiesRes.data.slice(0, 5)); // Get latest 5 properties
      setLoading(false);
    }).catch(err => {
      console.error("Dashboard error:", err);
      setStats({ properties: 0, inquiries: 0, favorites: 0, cities: {} });
      setRecentProperties([]);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const chartData = Object.keys(stats?.cities || {}).map(city => ({
    city,
    count: stats.cities[city]
  }));

  const propertyTypeData = recentProperties.reduce((acc, prop) => {
    acc[prop.type] = (acc[prop.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(propertyTypeData).map(type => ({
    name: type,
    value: propertyTypeData[type]
  }));

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const totalValue = recentProperties.reduce((sum, prop) => sum + (prop.price || 0), 0);
  const avgPrice = recentProperties.length > 0 ? totalValue / recentProperties.length : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Broker Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <button
          onClick={() => navigate('/broker/add')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Active Properties", 
            value: stats?.properties || 0, 
            icon: HomeIcon,
            color: "bg-blue-500",
            change: "+12%"
          },
          { 
            label: "Total Inquiries", 
            value: stats?.inquiries || 0, 
            icon: ChatBubbleLeftIcon,
            color: "bg-green-500",
            change: "+8%"
          },
          { 
            label: "Favorites", 
            value: stats?.favorites || 0, 
            icon: HeartIcon,
            color: "bg-pink-500",
            change: "+15%"
          },
          { 
            label: "Total Value", 
            value: totalValue, 
            icon: CurrencyDollarIcon,
            color: "bg-yellow-500",
            change: "+5%",
            format: "currency"
          }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.format === "currency" ? (
                      `$${(stat.value / 1000000).toFixed(1)}M`
                    ) : (
                      <CountUp end={stat.value} duration={1.5} />
                    )}
                  </p>
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Properties by City</h2>
            <ChartBarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <XAxis 
                dataKey="city" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Property Types</h2>
            <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Properties</h2>
          <button
            onClick={() => navigate('/broker/listings')}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            View All →
          </button>
        </div>

        {recentProperties.length === 0 ? (
          <div className="text-center py-8">
            <HomeIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No properties found</p>
            <button
              onClick={() => navigate('/broker/add')}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProperties.map((property) => (
              <div key={property.id} className="relative group">
                <div 
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {property.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      property.purpose === 'SALE' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {property.purpose}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {property.city}, {property.state}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <HomeIcon className="w-4 h-4 mr-1" />
                      {property.bedrooms}BR • {property.bathrooms}BA • {property.areaSqft} sq ft
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-indigo-600">
                        ${property.price?.toLocaleString()}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {property.type}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/broker/edit/${property.id}`);
                    }}
                    className="btn btn-xs bg-blue-600 hover:bg-blue-700 text-white mr-1"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Add Property", icon: PlusIcon, action: () => navigate('/broker/add'), color: "bg-indigo-500" },
            { label: "My Listings", icon: HomeIcon, action: () => navigate('/broker/listings'), color: "bg-blue-500" },
            { label: "Inquiries", icon: ChatBubbleLeftIcon, action: () => navigate('/inquiries'), color: "bg-green-500" },
            { label: "Analytics", icon: ChartBarIcon, action: () => toast.success("Analytics coming soon!"), color: "bg-purple-500" }
          ].map((action, i) => (
            <button
              key={i}
              onClick={action.action}
              className={`${action.color} hover:opacity-90 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-opacity`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
