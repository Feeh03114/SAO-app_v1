import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface TableFooterProps {
    totalElements: number;
    totalPages: number;
    page: number;
    nextPage: () => void;
    lastPage: () => void;
}

export function TableFooter({totalElements = 8, totalPages = 10, page = 1, lastPage, nextPage}:TableFooterProps): JSX.Element {	
    const itemsPerPage = 5;

    function generatePagination(totalPages:number, currentPage:number) {
        const range = 1; // Quantidade de páginas exibidas antes e depois da página atual
        const itemsBeforeLastPage = 1; // Quantidade de itens exibidos antes da última página
        const paginationHTML:any = [];
      
        if (totalPages <= 1) {
          return paginationHTML;
        }
      
        // Função auxiliar para adicionar um item à paginação
        function addItemToPagination(itemHTML:string, currentPage = false) {
          paginationHTML.push(
            <div key={itemHTML} className={`inline-flex flex-col items-center justify-center px-4 py-2 bg-white border ${currentPage? 'border-teal-500': 'border-gray-300'} `}>
              <p className={`text-sm font-medium leading-tight text-center ${currentPage? 'text-teal-600': 'text-gray-600'}`}>{itemHTML}</p>
            </div>
          );
        }
      
        // Adiciona os itens de página inicial e final
        addItemToPagination('1');
        if (currentPage > range + 2) addItemToPagination('...');
      
        // Adiciona os itens de página antes e depois da página atual
        for (let i = currentPage - range; i <= currentPage + range; i++) {
          if (i > 1 && i < totalPages)  addItemToPagination(i.toString(), i === currentPage);
        }
      
        if (currentPage < totalPages - range - 1) {
          addItemToPagination('...');
        }
      
        // Adiciona os itens antes da última página
        if (currentPage <= totalPages - itemsBeforeLastPage - range - 1) {
          addItemToPagination((totalPages - itemsBeforeLastPage).toString());
        }
      
        addItemToPagination(totalPages.toString());
      
        return paginationHTML;
    }

    return(
        <div className="inline-flex space-x-2.5 items-center justify-between py-3 h-62 w-full">
            <p className="text-sm leading-tight text-gray-700 dark:text-gray-400">{`Mostrando ${(page - 1) * itemsPerPage + 1} até ${Math.min(page * itemsPerPage, totalElements)} de ${totalElements } resultados`}</p>
            <div className="flex items-center justify-end w-1/3 h-full">
                <div className="inline-flex flex-col items-center justify-center p-2 bg-white border rounded-tl-md rounded-bl-md border-gray-300"
                  onClick={page ===1? undefined:lastPage}
                >
                    <FaChevronLeft className="w-4 flex-1 rounded-lg"/>
                </div>
                {generatePagination(totalPages, page)}
                <div className="inline-flex flex-col items-center justify-center p-2 bg-white border rounded-tr-md rounded-br-md border-gray-300"

                  onClick={page === totalPages? undefined:nextPage}
                >
                    <FaChevronRight className="w-4 flex-1 rounded-lg"/>
                </div>
            </div>
        </div>
    )
}