import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import {useMemo, useState} from "react";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {useSelector} from "react-redux";
import {RotatingLines} from "react-loader-spinner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const DMTDataGrid = props => {
    const {data, columns, showFilters = false, maxHeight= '75vh', loading = false, ...other} = props;
    const [sortedColumn, setSortedColumn] = useState('id');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterValues, setFilterValues] = useState({});
    const {isLoading} = useSelector(({loading}) => loading);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);


    const handleSort = column => {
        const direction = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortedColumn(column);
        setSortDirection(direction);
    };

    const handleFilterChange = (column, value) => {
        setFilterValues({...filterValues, [column]: value});
    };

    const filteredData = data.filter(row => {
        return Object.keys(filterValues).every(column => {
            const filterValue = filterValues[column].toLowerCase();
            return String(row[column]).toLowerCase().includes(filterValue);
        });
    });


    const sortedAndFilteredData = filteredData.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
        } else {
            return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
        }
    });

    const visibleRows = useMemo(
        () =>
            stableSort(data, getComparator(sortDirection, sortedColumn)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [sortedColumn, sortDirection, page, rowsPerPage, data],
    );

    // Pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer sx={{ maxHeight: maxHeight}}  {...other}>
                <Table component={Paper} stickyHeader >
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => {
                                    if (column?.visible === false){
                                        return null;
                                    }
                                    return (
                                        <TableCell key={index} sx={{color: 'secondary.main'}}>
                                            {Boolean(column.attribute) ? (
                                                <TableSortLabel
                                                    sx={{
                                                        '&:hover': {
                                                            color: 'neutral.700',
                                                        },
                                                    }}
                                                    active={sortedColumn === column.attribute}
                                                    direction={sortedColumn === column.attribute ? sortDirection : 'asc'}
                                                    onClick={() => handleSort(column.attribute)}
                                                >
                                                    {column.label}
                                                </TableSortLabel>
                                            ) : column.label}

                                            {Boolean(column.attribute && showFilters) && (
                                                <DMTTextInput
                                                    sx={{mt: 2}}
                                                    //variant=""
                                                    size={'small'}
                                                    // placeholder={`${column.label}`}
                                                    onChange={e => handleFilterChange(column.attribute, e.target.value)}
                                                />
                                            )}
                                        </TableCell>
                                    )
                                }
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading || loading ? (
                            <>
                                <TableCell colspan={columns.length}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <RotatingLines
                                            visible={true}
                                            height="50"
                                            width="50"
                                            color="grey"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                        <Typography>
                                            {"Fetching Data..."}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </>
                        ) : (
                            <>
                                {visibleRows.length > 0 ? visibleRows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {columns.map((column, colIndex) => {
                                                if (column?.visible === false){
                                                    return null;
                                                }
                                                return (
                                                    <TableCell key={colIndex}>
                                                        {Boolean(column.value) ? column.value(row, rowIndex) : row[column?.attribute]}
                                                    </TableCell>
                                                )
                                            }
                                        )}
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colspan={columns.length}>
                                            {"No records found!"}
                                        </TableCell>

                                    </TableRow>
                                )}
                            </>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default DMTDataGrid;