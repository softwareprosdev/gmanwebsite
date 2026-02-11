"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
  FaCog,
  FaFilter,
  FaUsers,
  FaClipboardList,
  FaToolbox,
  FaCalculator,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { readActivityLog } from "@/lib/data";

interface ActivityEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName?: string;
  details?: any;
  userId?: string;
  userName?: string;
  createdAt: string;
}

const ENTITY_ICONS: Record<string, React.ReactNode> = {
  client: <FaUsers size={14} />,
  booking: <FaClipboardList size={14} />,
  service: <FaToolbox size={14} />,
  estimate: <FaCalculator size={14} />,
  invoice: <FaFileInvoiceDollar size={14} />,
  settings: <FaCog size={14} />,
};

const ACTION_ICONS: Record<string, React.ReactNode> = {
  created: <FaPlus size={12} />,
  updated: <FaEdit size={12} />,
  deleted: <FaTrash size={12} />,
  status_changed: <FaExchangeAlt size={12} />,
};

const ACTION_COLORS: Record<string, string> = {
  created: "bg-green-500/20 text-green-400",
  updated: "bg-blue-500/20 text-blue-400",
  deleted: "bg-red-500/20 text-red-400",
  status_changed: "bg-amber-500/20 text-amber-400",
};

const ENTITY_COLORS: Record<string, string> = {
  client: "text-purple-400",
  booking: "text-blue-400",
  service: "text-teal-400",
  estimate: "text-amber-400",
  invoice: "text-green-400",
  settings: "text-gray-400",
};

export default function ActivityPage() {
  const [logs, setLogs] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState("");
  const [limit, setLimit] = useState(50);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await readActivityLog(limit);
      setLogs(data.logs || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [limit]);

  const filteredLogs = entityFilter ? logs.filter((l) => l.entityType === entityFilter) : logs;

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  const getActionText = (log: ActivityEntry) => {
    const entity = log.entityName || log.entityType;
    switch (log.action) {
      case "created":
        return (
          <>
            created <span className={ENTITY_COLORS[log.entityType]}>{entity}</span>
          </>
        );
      case "updated":
        return (
          <>
            updated <span className={ENTITY_COLORS[log.entityType]}>{entity}</span>
          </>
        );
      case "deleted":
        return (
          <>
            deleted <span className={ENTITY_COLORS[log.entityType]}>{entity}</span>
          </>
        );
      case "status_changed":
        return (
          <>
            changed status of <span className={ENTITY_COLORS[log.entityType]}>{entity}</span>
          </>
        );
      default:
        return (
          <>
            {log.action} <span className={ENTITY_COLORS[log.entityType]}>{entity}</span>
          </>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Activity Log</h1>
          <p className="text-gray-400 mt-1">Track all admin actions and changes</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-gray-300 text-sm"
          >
            <option value={25}>Last 25</option>
            <option value={50}>Last 50</option>
            <option value={100}>Last 100</option>
          </select>
        </div>
      </div>

      {/* Entity Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setEntityFilter("")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !entityFilter ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-slate-800/50 text-gray-400 border border-white/10 hover:text-white"
          }`}
        >
          All
        </button>
        {["client", "booking", "service", "estimate", "invoice", "settings"].map((type) => (
          <button
            key={type}
            onClick={() => setEntityFilter(type)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              entityFilter === type
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                : "bg-slate-800/50 text-gray-400 border border-white/10 hover:text-white"
            }`}
          >
            {ENTITY_ICONS[type]}
            <span className="capitalize">{type}s</span>
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No activity recorded yet. Actions will appear here as you use the admin panel.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-start space-x-4 p-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Action Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${ACTION_COLORS[log.action] || "bg-gray-500/20 text-gray-400"}`}>
                  {ACTION_ICONS[log.action] || <FaEdit size={12} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">{log.userName || "System"}</span>{" "}
                    {getActionText(log)}
                  </p>
                  {log.details && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {log.details.clientName && `Client: ${log.details.clientName}`}
                      {log.details.total !== undefined && ` · $${log.details.total}`}
                      {log.details.changes && `Changed: ${log.details.changes.join(", ")}`}
                      {log.details.keys && `Updated: ${log.details.keys.join(", ")}`}
                    </p>
                  )}
                </div>

                {/* Entity Badge */}
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${ENTITY_COLORS[log.entityType] || "text-gray-500"}`}>
                    {log.entityType}
                  </span>
                </div>

                {/* Time */}
                <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                  {formatTime(log.createdAt)}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
