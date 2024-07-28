import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import {FormControl, Icon, InputLabel, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {fileToBase64} from "@/utils/file-to-base-64";


const DMTCatureImage = props => {
    const {
        label,
        fullWidth,
        name,
        placeholder,
        value,
        onChange,
        error,
        onBlur,
        helperText,
        required,
        acceptedFormats,
        ...other
    } = props;

    const [photoURL, setPhotoURL] = useState(null);
    const inputRef = useRef(null);

    const handleFileChange = async e => {
        const file = e.target.files[0];
        if (file !== undefined){
            const fileExtension = '.' + file.name.split('.').pop();
            await fileToBase64(file)
                .then(data => {
                    setPhotoURL(data);
                    onChange(data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else{
            onChange(null)
        }
    }




    const triggerCamera = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        setPhotoURL(value ?? null);
    },[value]);


    return (
        <FormControl
            component={'div'}
            fullWidth={fullWidth}
            variant="standard"
            required={required}
        >
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs={12} sm={12} md={12}>
                    <InputLabel id={name} shrink htmlFor={name} name={name} required={required} error={error} >
                        {label}
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <input
                        id={name}
                        type="file"
                        accept={'image/*'}
                        capture="environment"
                        //name={name}
                        ref={inputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        onBlur={onBlur}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border:1,
                            borderStyle: 'dashed',
                            borderColor:'neutral.300',
                            borderRadius: 2,
                            width: '100%',
                            p:1,
                    }}>
                        <Box sx={{ display: 'flex', gap: 1, mb:2}}>
                            <Button size={'small'} startIcon={<Icon>camera</Icon>} variant={'outlined'} color={'primary'} onClick={triggerCamera}>{placeholder}</Button>
                        </Box>
                        {(photoURL) && <Image src={photoURL} width={200} height={250} alt="Captured" />}
                        {helperText && (
                            <Typography color={error ? 'error' : 'text.primary'} variant={'caption'}>
                                {helperText}
                            </Typography>
                        )}
                    </Box>

                </Grid>
            </Grid>
        </FormControl>
    );
};

export default DMTCatureImage;
