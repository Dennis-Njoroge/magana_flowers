import {Autocomplete, Checkbox, FormControl, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import {getAutocompleteMultipleValues, getAutoCompleteValue} from "@/utils/helper-functions";
import BootstrapInput from "@/components/@shared-components/forms/bootstrap-base-input";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDamagedParts} from "@/redux/slices/dashboard/claims-slice";
import {
    MdCheckBox as CheckBoxIcon,
    MdOutlineCheckBoxOutlineBlank as CheckBoxOutlineBlankIcon
} from "react-icons/md";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DMTSelectDamagedParts = props => {
    const { customerId, phoneId, onChange, fullWidth, name, label, options, defaultInput, field, value, required, error, onBlur, helperText, placeholder, ...other} = props;
    const dispatch = useDispatch();
    const handleOnChange = (e, value) => {
        console.log(value);
        onChange(value);
    }
    const { damagedParts } = useSelector(({ claims }) => claims );

    const fetchDamagedParts = async () => {
        const formData = {
            customerId,
            deviceId: phoneId
        }
        await dispatch(getDamagedParts(formData));
    }

    useEffect(() => {
        if (phoneId){
            fetchDamagedParts();
        }

    },[phoneId]);


    return (
        <>
            <FormControl
                component={'div'}
                fullWidth={fullWidth}
                variant="standard"
            >
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12} sm={12} md={3.5}>
                        <InputLabel shrink htmlFor={name} required={required} error={error}>
                            {label}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8.5}>
                        <Autocomplete
                            multiple
                            options={damagedParts}
                            autoHighlight
                            disableCloseOnSelect
                            onChange={handleOnChange}
                            value={getAutocompleteMultipleValues(value, damagedParts, 'id')}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option, { selected }) => {
                                return (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{marginRight: 8}}
                                            checked={selected}
                                        />
                                        {option?.name}
                                    </li>
                                )
                            }
                            }
                            renderInput={(params) => (
                                <BootstrapInput
                                    {...params}
                                    label={""}
                                    required={required}
                                    error={error}
                                    name={name}
                                    onBlur={onBlur}
                                    helperText={helperText}
                                    placeholder={placeholder}
                                    size={'small'}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off', // disable autocomplete and autofill

                                    }}
                                    variant={'outlined'}
                                />
                            )}
                            {...other}
                        />
                    </Grid>
                </Grid>

            </FormControl>

        </>
    )
}

export default DMTSelectDamagedParts;