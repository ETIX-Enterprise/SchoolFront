import { Pencil, Trash2, ChevronLeft, ChevronRight, MoreVertical, User, Phone, MapPin, GraduationCap, Heart } from "lucide-react";
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
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);

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
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-black" />
                    <span className="text-[14px] font-semibold text-black">Student</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-black" />
                    <span className="text-[14px] font-semibold text-black">Grade</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-black" />
                    <span className="text-[14px] font-semibold text-black">Parent Phone</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-black" />
                    <span className="text-[14px] font-semibold text-black">City/District</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-black" />
                    <span className="text-[14px] font-semibold text-black">Health</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <span className="text-[14px] font-semibold text-black">Status</span>
                </th>
                <th className="py-5 px-6 text-left">
                  <span className="text-[14px] font-semibold text-black">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-150"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                        <User className="h-5 w-5 text-blue-700" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[14px] text-gray-900 truncate">{item.name}</div>
                        <div className="text-[14px] text-gray-500">ID: {item.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <span className="inline-flex text-[14px] items-center gap-1.5 rounded-lg  px-3.5 py-2 font-medium text-blue-700 ">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {item.grade}
                    </span>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="font-medium text-[14px] text-gray-900 whitespace-nowrap">{item.phone}</div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="min-w-[140px]">
                      <div className="font-medium text-[14px] text-gray-900 whitespace-nowrap">{item.city}</div>
                      <div className="text-[14px] text-gray-500 whitespace-nowrap">{item.district} District</div>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                      <span className="text-[14px] font-medium text-green-700 whitespace-nowrap">Healthy</span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-semibold whitespace-nowrap
                        ${item.status === "Arrived" 
                          ? "bg-green-100 text-green-800 " 
                          : "bg-orange-100 text-orange-800 "
                        }
                      `}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${item.status === "Arrived" ? "bg-green-500" : "bg-orange-500"}`}></div>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-5 px-6">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                        className="rounded-lg p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      
                      {openDropdown === item.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpenDropdown(null)}
                          ></div>
                          <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white border border-gray-200 shadow-xl z-20 overflow-hidden">
                            <button
                              onClick={() => {
                                setOpenDropdown(null);
                                // Handle edit
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[14px] text-gray-700 hover:bg-blue-50 transition-colors"
                            >
                              <Pencil className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">Edit Student</span>
                            </button>
                            <button
                              onClick={() => {
                                setOpenDropdown(null);
                                onDelete(item.id);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-[14px] text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="font-medium">Delete Student</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200 px-6 py-4">
          <div className="mb-4 sm:mb-0">
            <div className="text-[14px] text-gray-600">
              Showing <span className="font-semibold text-gray-900">{(page - 1) * PER_PAGE + 1}</span> to{" "}
              <span className="font-semibold text-gray-900">{Math.min(page * PER_PAGE, data.length)}</span> of{" "}
              <span className="font-semibold text-gray-900">{data.length}</span> students
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-all ${
                page === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-3 py-1.5 text-[14px] text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goTo(p as number)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-semibold transition-all ${
                      p === page
                        ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md"
                        : "text-gray-700 hover:bg-white hover:shadow-sm"
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
              className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-all ${
                page === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : "text-gray-700 hover:bg-white hover:shadow-sm"
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