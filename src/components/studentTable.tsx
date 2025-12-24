import { Pencil, ChevronLeft, ChevronRight, MoreVertical, User, Phone, MapPin, GraduationCap, Heart } from "lucide-react";
import React from "react";

type Student = {
  id: number;
  name: string;
  grade: string;
  phone: string;
  city: string;
  district: string;
  status: "Arrived" | "Pending";
};

interface Props {
  data: Student[];
  onDelete: (id: number) => void;
}

const PER_PAGE = 5;

const StudentTable: React.FC<Props> = ({ data, onDelete }) => {
  const [page, setPage] = React.useState<number>(1);

  const totalPages = React.useMemo(() => {
    return Math.max(1, Math.ceil(data.length / PER_PAGE));
  }, [data.length]);

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = React.useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return data.slice(start, start + PER_PAGE);
  }, [data, page]);

  function goTo(p: number) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  }

  const pageNumbers = React.useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, page]);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Student</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Grade</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Parent Phone</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">City/District</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Health</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <span className="text-sm font-semibold text-gray-700">Status</span>
                </th>
                <th className="py-4 px-6 text-left">
                  <span className="text-sm font-semibold text-gray-700">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">ID: {item.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {item.grade}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{item.phone}</div>
                  </td>

                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{item.city}</div>
                      <div className="text-sm text-gray-500">{item.district} District</div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-green-700">Healthy</span>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium
                        ${item.status === "Arrived" 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-orange-100 text-orange-800 border border-orange-200"
                        }
                      `}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${item.status === "Arrived" ? "bg-green-500" : "bg-orange-500"}`}></div>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      
                      <button
                        className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 px-6 py-4">
          <div className="mb-4 sm:mb-0">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{(page - 1) * PER_PAGE + 1}</span> to{" "}
              <span className="font-semibold text-gray-900">{Math.min(page * PER_PAGE, data.length)}</span> of{" "}
              <span className="font-semibold text-gray-900">{data.length}</span> students
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-colors ${
                page === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-3 py-1.5 text-sm text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goTo(p as number)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-colors ${
                page === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>

      {/* No data state */}
      {data.length === 0 && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">No students found</h3>
          <p className="text-gray-500">Add students to get started</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;