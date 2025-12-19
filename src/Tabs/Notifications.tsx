// NotificationPage.tsx
import React, { useCallback, useMemo, useState } from "react";
import {
  Search,
  Bell,
  Menu,
  Settings,
  Download,
  User,
  CheckCircle,
  BellOff,
  X,
} from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

type NotificationType = "info" | "success" | "warning";

export type Notification = {
  id: string;
  title: string;
  body?: string;
  time: string;
  read: boolean;
  type?: NotificationType;
};

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Booking #A123 confirmed",
    body: "Your student booking has been confirmed for 12 Dec.",
    time: "2h ago",
    read: false,
    type: "success",
  },
  {
    id: "n2",
    title: "Payment received",
    body: "We received 200 FRW for John Doe.",
    time: "1 day ago",
    read: false,
    type: "info",
  },
  {
    id: "n3",
    title: "Route update",
    body: "The bus to Kigali will depart 15 minutes earlier.",
    time: "3 days ago",
    read: true,
    type: "warning",
  },
];

export default function NotificationPage(): JSX.Element {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );
  const readCount = useMemo(
    () => notifications.filter((n) => n.read).length,
    [notifications]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const filtered = useMemo(
    () =>
      notifications.filter((n) =>
        filter === "all" ? true : filter === "unread" ? !n.read : n.read
      ),
    [filter, notifications]
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 flex">
      {/* Main content */}
      <main className="flex-1">
        {/* Tabs + actions */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Tab
                label="All"
                count={notifications.length}
                active={filter === "all"}
                onClick={() => setFilter("all")}
                icon={<Bell size={16} />}
              />
              <Tab
                label="Unread"
                count={unreadCount}
                active={filter === "unread"}
                onClick={() => setFilter("unread")}
                icon={<Bell size={16} />}
              />
              <Tab
                label="Read"
                count={readCount}
                active={filter === "read"}
                onClick={() => setFilter("read")}
                icon={<CheckCircle size={16} />}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 rounded-md bg-white border border-gray-200 hover:shadow"
                type="button"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:brightness-95 flex items-center gap-2"
                type="button"
              >
                <X size={14} />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <section className="px-6">
          {filtered.length === 0 ? (
            <EmptyState unreadCount={unreadCount} />
          ) : (
            <ul className="space-y-3">
              {filtered.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    n.read ? "bg-white border-gray-100" : "bg-blue-50 border-blue-100"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-white ${
                        n.type === "success"
                          ? "bg-green-500"
                          : n.type === "warning"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                      aria-hidden
                    >
                      {n.title.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-gray-500">{n.time}</div>
                    </div>
                    {n.body && <div className="text-sm text-gray-600 mt-1">{n.body}</div>}

                    <div className="mt-3 flex items-center gap-3">
                      {!n.read ? (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="text-sm px-3 py-1 border rounded text-blue-600"
                          type="button"
                        >
                          Mark as read
                        </button>
                      ) : (
                        <button
                          onClick={() => markAsUnread(n.id)}
                          className="text-sm px-3 py-1 border rounded text-gray-600"
                          type="button"
                        >
                          Mark as unread
                        </button>
                      )}
                      <button
                        onClick={() => dismiss(n.id)}
                        className="text-sm px-3 py-1 border rounded text-red-600"
                        type="button"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

/* ---------- small presentational components ---------- */

type NavItemProps = {
  label: string;
  active?: boolean;
};

function NavItem({ label, active = false }: NavItemProps): JSX.Element {
  return (
    <div
      className={`flex items-center gap-3 px-2 py-2 rounded-md ${
        active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={active}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <div className={`w-4 h-4 rounded ${active ? "bg-white" : "bg-gray-400"}`} />
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

type TabProps = {
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
};

function Tab({ label, count, active = false, onClick, icon }: TabProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        active ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
      }`}
      type="button"
      aria-current={active ? "true" : "false"}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span
        className={`ml-2 inline-flex items-center justify-center text-xs font-medium px-2 py-0.5 rounded-full ${
          active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

type EmptyStateProps = {
  unreadCount: number;
};

function EmptyState({ unreadCount }: EmptyStateProps): JSX.Element {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-5">
      <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center">
        <BellOff size={48} className="text-gray-400" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">No notifications</h3>
        <p className="text-sm text-gray-500 mt-1">
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification(s).`
            : "You're all caught up."}
        </p>
      </div>
      <div className="flex gap-3">
        <button className="px-5 py-2 rounded bg-blue-600 text-white" type="button">
          Refresh
        </button>
        <button className="px-5 py-2 rounded border" type="button">
          View settings
        </button>
      </div>
    </div>
  );
}
