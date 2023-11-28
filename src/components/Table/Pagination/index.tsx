import { BiSolidChevronLeft, BiSolidChevronRight, BiSolidChevronsLeft, BiSolidChevronsRight } from "react-icons/bi";

const MAX_ITEMS = 5;
const MAX_LEFT = 2;

interface PaginationProps {
    pageSize?: number;
    totalElements: number;
    currentPage: number;
    setCurrentPage: (e:number) => void;
}

export function Pagination({pageSize=5, totalElements=5, currentPage=1, setCurrentPage}:PaginationProps): JSX.Element {	
    const pages = Math.ceil(totalElements / pageSize);
    const first = Math.max(currentPage - MAX_LEFT, 1);

    function enumerateArray(index: number) {
      if (first + MAX_ITEMS > pages) {
        return pages - Math.min(MAX_ITEMS, pages) + index + 1;
      }
      return index + first;
    }

    function threePointsReturn() {
      if (currentPage === 5) {
        return currentPage - 3;
      } else if (currentPage === 6) {
        return currentPage - 4;
      } 
      return currentPage - 5;
    }

    function threePointsAdvance() {
      if (currentPage === pages - 4) {
        return currentPage + 3;
      } else if (currentPage === pages - 5) {
        return currentPage + 4;
      } 
      return currentPage + 5;
    }

    return(
      <div className="w-screen mt-8">
        <div className="mx-6 pb-3 pt-4 flex items-center justify-between border-t-2 border-gray-200 dark:border-gray-600">
          <div className="hidden md:block font-Inter text-sm font-medium leading-5 text-gray-400">
            {`Mostrando ${(currentPage - 1) * pageSize + 1} até ${Math.min(currentPage * pageSize, totalElements)} de ${totalElements } resultados`}
          </div>
          <div className="md:hidden font-Inter text-sm font-medium leading-5 text-gray-400">
            {`Página ${currentPage} de ${pages}`}
          </div>
          <div className="h-full flex items-center justify-end">
              <button className={`md:hidden w-9 h-9 flex flex-col items-center justify-center bg-white dark:bg-slate-800 dark:text-gray-300 border rounded-tl-md rounded-bl-md border-gray-300 dark:border-none  ${currentPage === 1 ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={() => setCurrentPage(1)}
              >
                <BiSolidChevronsLeft className="w-6 h-6 flex-1 rounded-lg"/>
              </button>

              <button className={`w-9 h-9 flex flex-col items-center justify-center bg-white dark:bg-slate-800 dark:text-gray-300 border md:rounded-tl-md md:rounded-bl-md border-gray-300 dark:border-none  ${currentPage === 1 ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)}
              >
                <BiSolidChevronLeft className="w-6 h-6 flex-1 rounded-lg"/>
              </button>

              {(currentPage > (MAX_ITEMS - MAX_LEFT) && pages > 5) &&
                <div className="hidden md:inline-flex w-9 h-9 flex-col items-center justify-center px-4 border bg-white dark:bg-slate-800 dark:text-gray-300 border-gray-300 dark:border-none cursor-pointer"
                  onClick={() => setCurrentPage(1)}
                >
                 <p className={`text-sm font-medium leading-tight text-center text-gray-600}`}>1</p>
               </div>
              }

              {(currentPage > (MAX_ITEMS - MAX_LEFT + 1) && pages > 5) &&
                <div className="hidden md:inline-flex w-9 h-9 flex-col items-center justify-center px-4 border bg-white dark:bg-slate-800 dark:text-gray-300 border-gray-300 dark:border-none cursor-pointer"
                  onClick={() => setCurrentPage(threePointsReturn())}
                >
                 <p className={`text-sm font-medium leading-tight text-center text-gray-600}`}>...</p>
               </div>
              }

              {Array.from( {length: Math.min(MAX_ITEMS, pages)} )
                .map((_, index) => enumerateArray(index))
                .map((page) => ( 
                  <div key={page} className={`hidden md:inline-flex w-9 h-9 flex-col items-center justify-center px-4 py-2 ${page === currentPage ? 'border-teal-500' : 'dark:border-none'} bg-white dark:bg-slate-800 dark:text-gray-300 border border-gray-300 cursor-pointer`}
                    onClick={() => setCurrentPage(page)}
                  >
                    <p className={`text-sm font-medium leading-tight text-center text-gray-600}`}>{page}</p>
                  </div>
              ))}

              {(currentPage < (pages - 3) && pages > 6) &&
                <div className="hidden md:inline-flex w-9 h-9 flex-col items-center justify-center px-4 border bg-white dark:bg-slate-800 dark:text-gray-300 border-gray-300 dark:border-none cursor-pointer"
                  onClick={() => setCurrentPage(threePointsAdvance())}
                >
                 <p className={`text-sm font-medium leading-tight text-center text-gray-600}`}>...</p>
               </div>
              }

              {(currentPage < (pages - 2) && pages > 5) &&
                <div className="hidden md:inline-flex w-9 h-9 flex-col items-center justify-center px-4 border bg-white dark:bg-slate-800 dark:text-gray-300 border-gray-300 dark:border-none cursor-pointer"
                  onClick={() => setCurrentPage(pages)}
                >
                 <p className={`text-sm font-medium leading-tight text-center text-gray-600}`}>{pages}</p>
               </div>
              }

              <button className={`w-9 h-9 flex flex-col items-center justify-center bg-white dark:bg-slate-800 dark:text-gray-300 border md:rounded-tr-md md:rounded-br-md border-gray-300 dark:border-none ${(currentPage + 1) > pages ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => setCurrentPage((currentPage + 1) > pages ? currentPage : currentPage + 1)}
              >
                <BiSolidChevronRight className="w-6 h-6 flex-1 rounded-lg"/>
              </button>

              <button className={`md:hidden w-9 h-9 flex flex-col items-center justify-center bg-white dark:bg-slate-800 dark:text-gray-300 border rounded-tr-md rounded-br-md border-gray-300 dark:border-none ${(currentPage + 1) > pages ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => setCurrentPage(pages)}
              >
                <BiSolidChevronsRight className="w-6 h-6 flex-1 rounded-lg"/>
              </button>
          </div>
        </div>
      </div>
    )
}