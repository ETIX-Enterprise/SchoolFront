import React from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import { FiDelete } from "react-icons/fi";

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

  // ensure current page is valid when data changes
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

  // simple page number generator with ellipsis for many pages
  const pageNumbers = React.useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // always show first, last, current +/-1 and ellipses where appropriate
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
    <div className="w-full mt-5 overflow-x-auto">
      {/* include uploaded file path as an (inaccessible) image reference for tooling */}
      <img src="/mnt/data/Capture0.PNG" alt="" className="sr-only" />

      <table className="w-full border-collapse">
        <thead>
          <tr className=" text-[14px]">
            <th className="py-3 px-4  text-left font-semibold text-gray-700">Student</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Grade</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Parent phone</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">City</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">District</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Action</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((item) => (
            <tr
              key={item.id}
              className="border-b text-[14px] border-gray-300 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4 flex items-center gap-2">
                <span className=" w-7 h-7  flex justify-center items-center rounded-full">
                    <FaUser className="w-4 h-4 text-gray-500"/>
                </span>
                {item.name}
              </td>

              <td className="py-3 px-4">{item.grade}</td>
              <td className="py-3 px-4">{item.phone}</td>
              <td className="py-3 px-4">{item.city}</td>
              <td className="py-3 px-4">{item.district}</td>

              <td className="py-3 px-4">
                <span
                  className={`
                    px-4 py-1 rounded-full text-sm font-medium
                    ${item.status === "Arrived" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                  `}
                >
                  {item.status}
                </span>
              </td>

              <td className="py-2 px-5 text-right">
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-red-800 text-[13px] bg-red-100 flex rounded-full transition"
                >
                <FaTrash  className="w-4 h-4 text-red-500"/>
                <span className="ml-[1px]">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{Math.min((page - 1) * PER_PAGE + 1, data.length)}</span>
          {" - "}
          <span className="font-medium">{Math.min(page * PER_PAGE, data.length)}</span>
          {" of "}
          <span className="font-medium">{data.length}</span>
        </div>

        <nav className="flex items-center gap-2" aria-label="Pagination">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md transition ${page === 1 ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"}`}
            aria-label="Previous page"
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {pageNumbers.map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className="px-3 py-1 text-sm text-gray-500">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goTo(p as number)}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    p === page ? "bg-blue-800 text-white shadow" : "bg-white text-gray-700 hover:bg-gray-50"
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
            className={`px-3 py-1 text-[15px] rounded-md transition ${page === totalPages ? "bg-gray-100 text-gray-400 " : "bg-white text-blue-800 font-semibold hover:bg-gray-50 shadow-sm"}`}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default StudentTable;
