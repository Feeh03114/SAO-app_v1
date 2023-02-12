
interface TableProps {
    columns: string[];
    data: any[];
}

export function Tablet({columns, data}: TableProps){
    return(
        <table className="table-auto">
            <thead>
                {
                    columns.map((column, index) => (
                        <th key={index} className="sticky-top bg-gray-100 p-3 text-center">{column}</th>
                    ))
                }
            </thead>
            <tbody>
                {
                    data.map((row, index) => (
                        <tr key={index} className="p-3 items-center text-center">
                            {
                                columns.map((column, index) => (
                                    <td key={index}>{row[column]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}