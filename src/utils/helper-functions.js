//removes tags from string
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import {ORDER_STATUS, PREFIX, ROLE_CLAIMS} from "@/utils/constants";


export const sanitizeString = string => {
    if(string){
        return string?.toString().replace(/(<([^>]+)>)/gi, '')
    }
}

export const getInitials = (name = '', join = '. ' ) => name
    ?.replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join(join);

export const formatDate = (date, format = 'DD MMM YYYY') => {
    if(date){
        return moment(date).format(format);
    }
    return null;
}

export const getYearsRange = (startYear = 1990) => {
    // Get current year
    const currentYear = moment().year();

  // Create an array of years from 1990 to current year
    const yearsRange = [];
    for (let year = startYear; year <= currentYear; year++) {
        yearsRange.push(year);
    }
   return yearsRange
}

export const getYear = (date) =>{
    if (date){
        return moment(date).year()
    }
}

export const getMonth = (date) =>{
    if (date){
        return moment(date).month()
    }
}

export const formatCurrency = (amount, currency = 'Kes') => {
    return (
        <CurrencyFormat
            displayType={'text'}
            value={amount}
            decimalScale={2}
            thousandSeparator={true}
            prefix={currency+' '}
        />
    )
}

export const getGreetings = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Night";
    }
}

export const getAutoCompleteValue = (options, value, filterField = 'id') => {
    return Array.isArray(options) ? options.find(option => option[filterField] === value) ?? null : null;
};
export const getAutocompleteMultipleValues = (values, options, field = 'id') => {
    if (!values || !Array.isArray(values)) return [];
    const valueIds = values.map(value => value[field]);

    return options.filter(opt => valueIds.includes(opt[field]));
};

export const getTrimmedNumber = (phoneNumber, n = -9) => {
    if(!phoneNumber) {
        return "";
    }
    return phoneNumber.slice(n)
}


export const maskString =  (str, firstCount = 3, lastCount = -2, isPhone = false) => {
    str = str?.trim();
    if (str.length <= 4) {
        return str.replace(/./g, '*');
    }
    if (isPhone){
        if(str.length === 9){
            firstCount = 3;
            lastCount = -3
        }
        if (str.length === 12){
            firstCount = 6;
            lastCount = -3;
        }
    }
    var firstTwo = str.slice(0, firstCount);
    var lastTwo = str.slice(lastCount);
    var middle = str.slice(firstCount, lastCount).replace(/./g, '*');
    return firstTwo + middle + lastTwo;

}

export const convertToArray = (string) => {
    if (Boolean(string)){
        return string.split(",").map(part => ({ id: parseInt(part) }));
    }
    return [];
}

export const getMaskedName = (fullName) => {
    if (!fullName){
        return null;
    }
    const names = fullName.split(" ");
    if (names.length >= 2) {
        return names[0] + " "+ maskString(names[1], 1, -1);
    }
    return null;
}

export const validateRole = (path, loginType) => {
    if (!path || !loginType){
        return true;
    }
    return ROLE_CLAIMS?.[loginType].includes(path)
}

export const saveLocally = (key, values) => {
    if( typeof window !== "undefined"){
        localStorage.setItem(key, JSON.stringify(values));
    }
}

export const getLocally = (key) => {
    let data = null;
    if( typeof window !== "undefined"){
        data = localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null
            ? JSON.parse(localStorage.getItem(key)) : null;
    }
    return data;
}

export const clearLocally = (key) => {
    if( typeof window !== "undefined"){
        localStorage.removeItem(key);
    }
}

export const showRecords = (options, size = 5) => {
    if (Array.isArray(options)){
        return options.slice(0, size)
    }
    return []
}

export const discountedPrice = (price, discount) => {
    if (discount !== 0){
        return price - (discount/100 * price);
    }
    return price;
}

export const computeGrandTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
        total += item?.Product?.discounted_price * item?.prod_qty
    });
    return total;
}

export const generateOrderNumber = (prefix = PREFIX ) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    const year = new Date().getFullYear();
    return `${prefix}/${randomNum}/${year}`;
};

export const orderStatusColor = (status) => {
    if (!status){
        return;
    }
    let color;
    if (status === ORDER_STATUS.PENDING){
        color = 'warning'
    }
    else if(status === ORDER_STATUS.CANCELED){
        color = 'error'
    }
    else{
        color = 'success'
    }

    return color;
}

