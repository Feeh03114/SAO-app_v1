/* eslint-disable react-hooks/exhaustive-deps */
import api from '@/service/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdCheckCircle, MdRemoveRedEye } from 'react-icons/md';
import { CustomProvider, Table as RSuiteTable } from 'rsuite';
import ptBR from 'rsuite/locales/pt_BR';

interface TableProps {
    endPoint: string;
    colunm: TableColunmsProps[];
    viewProperty?: string;
    refreshTable?: boolean;
}

interface TableColunmsProps {
    property: string;
    label: string;
    visible?: boolean;
    type?: 'status' | 'actions' | 'image' | 'date' | 'time' | 'datetime';
    optionsActions?: ('view'|'status')[];
    customActions?: JSX.Element[];
}

export default function Table({
    endPoint,
    colunm,
    viewProperty = 'id',
    refreshTable = false,
}:TableProps): JSX.Element {
    const { push, pathname } = useRouter();
    const [data, setData] = useState([]);
    const [params, setParams] = useState({
      pageSize: 10,
      pageNumber: 1,
      status: 2,
      sortField: 'Id',
      sortOrder: 'asc',
      value: undefined,
    });
    const[ pages, setPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);


    const loadData = async () => {
        setIsLoading(true);
        try {
          const { data:RespAPI } = await api.get(endPoint);
          setData(RespAPI);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [params, refreshTable]);


    function StatusCell({ rowData, dataKey, ...props }: any): JSX.Element {
        return (
          <RSuiteTable.Cell {...props}>
            {rowData[dataKey] ? (
                <MdCheckCircle color='#00C853' size='1.5rem' className='mx-auto' />
            ) : (
              <MdCheckCircle color='#D32F2F' size='1.5rem' className='mx-auto' />
            )}
          </RSuiteTable.Cell>
        );
    }
    
    function LogoCell({ rowData, dataKey, ...props }: any): JSX.Element {
        return (
            <RSuiteTable.Cell {...props}>
                <Image
                    className='object-contain'
                    src={rowData[dataKey]}
                    alt='logo'
                />
            </RSuiteTable.Cell>
        );
    }
    
    function ActionsCell({ rowData, dataKey, ...props }: any): JSX.Element {
        return (
            <RSuiteTable.Cell {...props}>
            {props?.optionsActions?.includes('view') && (
                <div
                    className="inline-flex space-x-2 items-center justify-center px-3 py-2 bg-white border rounded-md border-gray-300 cursor-pointer"
                    onClick={() => push(`${pathname}/view/${rowData[viewProperty]}`)}
                >
                    <MdRemoveRedEye className="flex-1 h-full rounded-lg text-teal-500"/>
                </div>
            )}
            {/* 
            {props?.optionsActions?.includes('status') && (
                <IconButton
                    bg={rowData['isEnabled'] ? undefined : '#EFFFF0'}
                    aria-label='status'
                    icon={
                        rowData['isEnabled'] ? (
                        <MdOutlinePowerSettingsNew />
                        ) : (
                        <MdOutlinePowerSettingsNew color='#00C853' />
                        )
                    }
                    variant='action'
                    ml='1.063rem'
                    onClick={() => {
                        setIsOpen(true);
                        setRow(rowData);
                    }}
                />
            )} */}
            {props?.customActions && props.customActions}
            </RSuiteTable.Cell>
        );
    }

    function ColumnsTableDynamic(key: string) {
        const colunmDynamic = colunm?.find(
            (x) => x.property.toLowerCase() === key.toLowerCase()
        );

        if (!colunmDynamic) return null;

        let Cell = <RSuiteTable.Cell dataKey={key} key={key} />;

        if (colunmDynamic?.type === 'status')
            Cell = <StatusCell dataKey={key} key='status' />;

        if (colunmDynamic?.type === 'image')
            Cell = <LogoCell dataKey={key} key='logo' />;

        if (colunmDynamic?.type === 'actions')
            Cell = (
                <ActionsCell
                    dataKey={key}
                    key='actions'
                    customActions={colunmDynamic?.customActions}
                    optionsActions={colunmDynamic?.optionsActions}
                />
            );

        if (colunmDynamic?.visible === false) return null;

        return (
            <RSuiteTable.Column
                width={
                    colunmDynamic?.type === 'image'
                    ? 80
                    : colunmDynamic?.type === 'actions'
                    ? 200
                    : undefined
                }
                align='center'
                verticalAlign='middle'
                flexGrow={colunmDynamic?.type === 'image' ? undefined : 1}
                sortable={
                    colunmDynamic?.type !== 'image' && colunmDynamic?.type !== 'actions'
                }
                key={key}
            >
                <RSuiteTable.HeaderCell>{colunmDynamic?.label}</RSuiteTable.HeaderCell>
                {Cell}
            </RSuiteTable.Column>
        );
    }

    return(
        <div className="inline-flex items-start justify-start bg-white shadow border rounded-lg border-gray-200 m-[2rem] mt-0">
            <CustomProvider
                locale={ptBR}
                //theme={theme.colorMode === 'dark' ? 'dark' : 'light'}
            >
                <RSuiteTable
                    className='w-full '
                    width={windowSize.width - 60}
                    height={windowSize.height - 200}
                    data={data}
                    onSortColumn={(sortColumn, sortType = 'asc') => {
                        setParams((e:any)=> {
                        return{
                            ...e,
                            sortColumn:sortColumn,
                            sortType:sortType
                        }
                        })
                    }}
                    rowHeight={72}
                    loading={isLoading}
                >
                    {data.length > 0 &&
                        Object.keys(data[0]).map((key) => ColumnsTableDynamic(key))}
                    {ColumnsTableDynamic('actions')}
                </RSuiteTable>
            </CustomProvider>
        </div>
    )
}