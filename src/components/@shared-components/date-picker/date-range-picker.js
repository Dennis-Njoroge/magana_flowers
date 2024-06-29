import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {formatDate, getMonth, getYear, getYearsRange} from "@/utils/helper-functions";
import DMTPopper from "@/components/@shared-components/popper";
import {Icon} from "@mui/material";

const years = getYearsRange();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const DateRangePicker = props => {
    const { isButton, dateRange, onOk } = props;
    const [isOpen, setIsOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const [newDateRange, setNewDateRange] = useState([null, null]);
    const [startDate, endDate] = newDateRange;
    const handleOnChange = updatedDate => {
        setNewDateRange(updatedDate);
    }

    const handleOnClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
    }

    const handleOnClick = (e) => {
        setIsOpen(!isOpen);
        setAnchorEl(e.currentTarget);
    };

    const handleOnToday = () => {
        setNewDateRange([new Date(), null]);
        handleOnClose();
    }


    useEffect(() => {
        if (dateRange){
            setNewDateRange(dateRange)
        }

    },[dateRange])

    if (isButton){
     return  (
         <>
             <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                 <Button
                     startIcon={<Icon>{"date_range"}</Icon>}
                     size={'small'} sx={{ minWidth: '200px'}}
                     onClick={handleOnClick}
                     variant={'outlined'}
                     color={'primary'}
                 >
                     {`${formatDate(startDate)} ${endDate ? " - "+formatDate(endDate) : "" }`}
                 </Button>
                 <DMTPopper
                     open={isOpen}
                     onClose={handleOnClose}
                     anchorEl={anchorEl}
                 >
                     <DatePicker
                         renderCustomHeader={({
                                                  date,
                                                  changeYear,
                                                  changeMonth,
                                                  decreaseMonth,
                                                  increaseMonth,
                                                  prevMonthButtonDisabled,
                                                  nextMonthButtonDisabled,
                                              }) => (
                             <div
                                 style={{
                                     margin: 10,
                                     display: "flex",
                                     justifyContent: "center",
                                     gap:1,
                                 }}
                             >
                                 <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                     {"<"}
                                 </button>
                                 <select
                                     value={getYear(date)}
                                     onChange={({ target: { value } }) => changeYear(value)}
                                 >
                                     {years.map((option) => (
                                         <option key={option} value={option}>
                                             {option}
                                         </option>
                                     ))}
                                 </select>

                                 <select
                                     value={months[getMonth(date)]}
                                     onChange={({ target: { value } }) =>
                                         changeMonth(months.indexOf(value))
                                     }
                                 >
                                     {months.map((option) => (
                                         <option key={option} value={option}>
                                             {option}
                                         </option>
                                     ))}
                                 </select>

                                 <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                     {">"}
                                 </button>
                             </div>
                         )}
                         selectsRange={true}
                         startDate={startDate}
                         endDate={endDate}
                         onChange={(update) => handleOnChange(update)}
                         inline
                     />
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                         <Button variant={'text'} onClick={handleOnToday}>
                             {"Today"}
                         </Button>
                         <Button variant={'text'} onClick={handleOnClose}>
                             {"Ok"}
                         </Button>
                     </Box>
                 </DMTPopper>

             </Box>
         </>
     )
    }

    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
                setnewDateRange(update);
            }}
            isClearable={true}
        />
    );
}

export default DateRangePicker;