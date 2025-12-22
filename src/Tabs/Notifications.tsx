import React, { useCallback, useMemo, useState } from "react";
import {
  Search,
  Bell,
  BellOff,
  X,
  Calendar,
  Eye,
  Clock,
  DownloadCloud,
} from "lucide-react";

type NotificationType = "info" | "success" | "warning";

export type Notification = {
  id: string;
  title: string;
  body?: string;
  time: string;
  read: boolean;
  type?: NotificationType;
};

type Student = {
  id: number;
  name: string;
  grade: string;
  parentPhone: string;
};

type PickupSchedule = {
  id: string;
  date: string;
  route: string;
  pickupTime: string;
  studentCount: number;
  status: 'active' | 'completed' | 'cancelled';
  students: Student[];
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

const mockPickupSchedules: PickupSchedule[] = [
  {
    id: "ps1",
    date: "Mon, Dec 23, 2024",
    route: "Route A - Kicukiro",
    pickupTime: "07:00 AM",
    studentCount: 25,
    status: "active",
    students: [
      { id: 1, name: "Alice Johnson", grade: "Grade 10", parentPhone: "+250 788 123 456" },
      { id: 2, name: "Bob Smith", grade: "Grade 10", parentPhone: "+250 788 234 567" },
      { id: 3, name: "Carol White", grade: "Grade 11", parentPhone: "+250 788 345 678" },
    ],
  },
  {
    id: "ps2",
    date: "Mon, Dec 23, 2024",
    route: "Route B - Remera",
    pickupTime: "07:15 AM",
    studentCount: 18,
    status: "active",
    students: [
      { id: 4, name: "Frank Wilson", grade: "Grade 12", parentPhone: "+250 788 678 901" },
      { id: 5, name: "Grace Taylor", grade: "Grade 11", parentPhone: "+250 788 789 012" },
    ],
  },
  {
    id: "ps3",
    date: "Fri, Dec 20, 2024",
    route: "Route C - Kimironko",
    pickupTime: "07:30 AM",
    studentCount: 32,
    status: "completed",
    students: [
      { id: 6, name: "Iris Anderson", grade: "Grade 9", parentPhone: "+250 788 901 234" },
      { id: 7, name: "Jack Thomas", grade: "Grade 11", parentPhone: "+250 788 012 345" },
    ],
  },
  {
    id: "ps4",
    date: "Thu, Dec 19, 2024",
    route: "Route D - Nyarutarama",
    pickupTime: "07:45 AM",
    studentCount: 21,
    status: "completed",
    students: [
      { id: 8, name: "Liam Garcia", grade: "Grade 12", parentPhone: "+250 788 234 567" },
      { id: 9, name: "Mia Rodriguez", grade: "Grade 11", parentPhone: "+250 788 345 678" },
    ],
  },
  {
    id: "ps5",
    date: "Wed, Dec 18, 2024",
    route: "Route A - Kicukiro",
    pickupTime: "07:00 AM",
    studentCount: 20,
    status: "cancelled",
    students: [],
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [pickupSchedules] = useState<PickupSchedule[]>(mockPickupSchedules);
  const [mainTab, setMainTab] = useState<"notifications" | "schedules">("notifications");
  const [notificationFilter, setNotificationFilter] = useState<"all" | "unread" | "read">("all");
  const [scheduleFilter, setScheduleFilter] = useState<"active" | "all">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );
  const readCount = useMemo(
    () => notifications.filter((n) => n.read).length,
    [notifications]
  );

  const activeSchedulesCount = useMemo(
    () => pickupSchedules.filter((s) => s.status === "active").length,
    [pickupSchedules]
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: false } : n)));
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

  const handleViewStudents = (students: Student[]) => {
    setSelectedStudents(students);
    setShowStudentModal(true);
  };

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((n) =>
        notificationFilter === "all" ? true : notificationFilter === "unread" ? !n.read : n.read
      ),
    [notificationFilter, notifications]
  );

  const filteredSchedules = useMemo(() => {
    let filtered = pickupSchedules;

    // Filter by status
    if (scheduleFilter === "active") {
      filtered = filtered.filter((s) => s.status === "active");
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.route.toLowerCase().includes(query) ||
          s.date.toLowerCase().includes(query) ||
          s.pickupTime.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [scheduleFilter, searchQuery, pickupSchedules]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="flex-1">
        {/* Main Tabs */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <MainTab
              label="Notifications"
              count={notifications.length}
              active={mainTab === "notifications"}
              onClick={() => setMainTab("notifications")}
              icon={<Bell size={16} />}
            />
            <MainTab
              label="Pickup Schedules"
              count={activeSchedulesCount}
              active={mainTab === "schedules"}
              onClick={() => setMainTab("schedules")}
              icon={<Calendar size={16} />}
            />
          </div>
        </div>

        {/* Notifications Tab Content */}
        {mainTab === "notifications" && (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <SubTab
                    label="All"
                    count={notifications.length}
                    active={notificationFilter === "all"}
                    onClick={() => setNotificationFilter("all")}
                  />
                  <SubTab
                    label="Unread"
                    count={unreadCount}
                    active={notificationFilter === "unread"}
                    onClick={() => setNotificationFilter("unread")}
                  />
                  <SubTab
                    label="Read"
                    count={readCount}
                    active={notificationFilter === "read"}
                    onClick={() => setNotificationFilter("read")}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 text-[14px] rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all"
                    type="button"
                  >
                    Mark all as read
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-[14px] rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all flex items-center gap-2"
                    type="button"
                  >
                    <X size={14} />
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <section className="px-6 py-4">
              {filteredNotifications.length === 0 ? (
                <EmptyState type="notifications" count={unreadCount} />
              ) : (
                <ul className="space-y-3">
                  {filteredNotifications.map((n) => (
                    <li
                      key={n.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                        n.read ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                            n.type === "success"
                              ? "bg-green-600"
                              : n.type === "warning"
                              ? "bg-amber-600"
                              : "bg-blue-800"
                          }`}
                        >
                          {n.title.charAt(0)}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-[14px] font-semibold text-gray-900">{n.title}</div>
                          <div className="text-[12px] text-gray-500">{n.time}</div>
                        </div>
                        {n.body && <div className="text-[14px] text-gray-600 mt-1">{n.body}</div>}

                        <div className="mt-3 flex items-center gap-3">
                          {!n.read ? (
                            <button
                              onClick={() => markAsRead(n.id)}
                              className="text-[13px] px-3 py-1 border border-blue-200 rounded-lg text-blue-800 hover:bg-blue-50 transition-all"
                              type="button"
                            >
                              Mark as read
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsUnread(n.id)}
                              className="text-[13px] px-3 py-1 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                              type="button"
                            >
                              Mark as unread
                            </button>
                          )}
                          <button
                            onClick={() => dismiss(n.id)}
                            className="text-[13px] px-3 py-1 border border-red-200 rounded-lg text-red-700 hover:bg-red-50 transition-all"
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
          </>
        )}

        {/* Pickup Schedules Tab Content */}
        {mainTab === "schedules" && (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <SubTab
                    label="Active"
                    count={activeSchedulesCount}
                    active={scheduleFilter === "active"}
                    onClick={() => setScheduleFilter("active")}
                  />
                  <SubTab
                    label="All Schedules"
                    count={pickupSchedules.length}
                    active={scheduleFilter === "all"}
                    onClick={() => setScheduleFilter("all")}
                  />
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by route, date, or time..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-[14px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <section className="px-6 py-4">
              <div className="flex p-3 justify-end">
            <button className="px-4 py-2 text-[14px] font-medium rounded-lg bg-green-700 text-white hover:bg-green-800 transition-all duration-200 flex items-center gap-2 shadow-sm">
            <DownloadCloud className="w-4 h-4" />
            Download schedule
          </button>
              </div>
              {filteredSchedules.length === 0 ? (
                <EmptyState type="schedules" count={0} />
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Route</th>
                        <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Pickup Time</th>
                        <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Students</th>
                        <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.map((schedule) => (
                        <tr
                          key={schedule.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-[14px] text-gray-900">{schedule.date}</td>
                          <td className="py-3 px-4 text-[14px] text-gray-600">{schedule.route}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-[14px] text-gray-600">
                              <Clock className="w-4 h-4" />
                              {schedule.pickupTime}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-col gap-2">
                              <span className="text-[14px] font-semibold text-gray-900">
                                {schedule.studentCount}
                              </span>
                              {schedule.students.length > 0 && (
                                <button
                                  onClick={() => handleViewStudents(schedule.students)}
                                  className="inline-flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors w-fit"
                                >
                                  <Eye className="w-3 h-3" />
                                  View
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex px-3 py-1 text-[12px] font-medium rounded-full border ${getStatusStyle(
                                schedule.status
                              )}`}
                            >
                              {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Student List Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-[16px] font-semibold text-gray-900">Student List</h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Student Name</th>
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Grade</th>
                    <th className="text-left py-3 px-4 text-[14px] font-semibold text-gray-700">Parent Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-[14px] text-gray-900">{student.name}</td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">{student.grade}</td>
                      <td className="py-3 px-4 text-[14px] text-gray-600">{student.parentPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-blue-800 text-white hover:bg-blue-900 transition-all w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Components ---------- */

type MainTabProps = {
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
};

function MainTab({ label, count, active = false, onClick, icon }: MainTabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${
        active ? "border-blue-800 text-blue-800" : "border-transparent text-gray-600 hover:text-gray-900"
      }`}
      type="button"
    >
      {icon}
      <span className="text-[14px] font-medium">{label}</span>
      <span
        className={`ml-1 inline-flex items-center justify-center text-[12px] font-medium px-2 py-0.5 rounded-full ${
          active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

type SubTabProps = {
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
};

function SubTab({ label, count, active = false, onClick }: SubTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[14px] font-medium rounded-lg transition-all ${
        active ? "bg-blue-50 text-blue-800" : "text-gray-600 hover:bg-gray-50"
      }`}
      type="button"
    >
      {label}
      <span className="ml-2 text-[12px]">({count})</span>
    </button>
  );
}

type EmptyStateProps = {
  type: "notifications" | "schedules";
  count: number;
};

function EmptyState({ type, count }: EmptyStateProps) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-5">
      <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center">
        {type === "notifications" ? (
          <BellOff size={48} className="text-gray-400" />
        ) : (
          <Calendar size={48} className="text-gray-400" />
        )}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {type === "notifications" ? "No notifications" : "No schedules found"}
        </h3>
        <p className="text-[14px] text-gray-500 mt-1">
          {type === "notifications"
            ? count > 0
              ? `You have ${count} unread notification(s).`
              : "You're all caught up."
            : "No pickup schedules match your search criteria."}
        </p>
      </div>
    </div>
  );
}