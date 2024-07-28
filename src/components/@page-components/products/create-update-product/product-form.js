import {useFormik} from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DMTCatureImage from "@/components/@shared-components/forms/camera";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import DMTCurrencyInput from "@/components/@shared-components/forms/currency-input";
import {productsApis} from "@/services/products";
import {toast} from "react-toastify";
import CategoriesSelect from "@/components/@shared-components/forms/select-categories";
import Button from "@mui/material/Button";


const ALLOWED_DOCUMENTS = {
    error: 'File format is unsupported.',
    formats: ['.png', '.jpg', '.jpeg'],
    accept: ".png, .jpg, .jpeg"
}
const checkIfValid = (file) => {
    // if (file){
    //     return ALLOWED_DOCUMENTS.formats.includes(file.extension);
    // }
    return true
}
const ALLOWED_FILE_SIZES = {
    error: 'Selected File exceeds 1MB',
    size: 1024 * 5
}
const checkIfExceedsSize = (file) => {
    if (!file)
    {
        return true;
    }
    const base64String = file.split(',')[1];
    const fileSizeInBytes = (base64String.length * 3) / 4 - 2;
    const maxSizeInBytes = 1024 * ALLOWED_FILE_SIZES.size;
    return fileSizeInBytes <= maxSizeInBytes;
}


const ProductForm = ({ product, onRefresh, onClose }) => {
    const formik = useFormik({
        initialValues: {
            name: product?.prod_name ?? '',
            description: product?.description ?? '',
            qty: product?.qty ??  '',
            categoryId: product?.category_id ?? null,
            price: product?.price,
            discount: product?.discount ?? '',
            image: product?.image ?? '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required!'),
            categoryId: Yup.string().required('Category is required!').nullable(),
            qty: Yup.number().required('Qty is required!')
                .min(1, 'Minimum quantity is accepted is 1'),
            price: Yup.number().required('Price is required!')
                .min(1, 'Minimum price is accepted is 1'),
            discount: Yup.number(),
            image: Yup.string().required('Image is required!')
                //.test('type',ALLOWED_DOCUMENTS.error, checkIfValid)
                //.test('size',ALLOWED_FILE_SIZES.error, checkIfExceedsSize)
        }),
        onSubmit: async values => {
            try{
                let res;
                const formData = {
                    id: product?.prod_id ?? null,
                    prod_name: values.name,
                    description: values.description,
                    category_id: values.categoryId,
                    qty: values.qty,
                    price: values.price,
                    image: values.image,
                    discount: 0
                }
                if (!product){
                    res = await productsApis.createProduct(formData);
                }
                else{
                    res = await productsApis.updateProduct(formData);
                }
                if (res.success){
                    toast.success(res?.message);
                     onClose?.();
                     await onRefresh?.();
                }
            }
            catch (e) {
                console.log(e.message);
            }
        }
    })
   return (
       <>
           <Box component={'form'} onSubmit={formik.handleSubmit}>
               <Grid container spacing={2}>
                   <Grid item xs={12} md={12} sm={12}>
                       <DMTTextInput
                           label={'Product Name'}
                           name={'name'}
                           value={formik.values.name}
                           placeholder={'Enter the product name'}
                           error={Boolean(formik.touched.name && formik.errors.name)}
                           onBlur={formik.handleBlur}
                           helperText={formik.touched.name && formik.errors.name}
                           onChange={formik.handleChange}
                           defaultInput={false}
                           fullWidth={true}
                           required={true}
                       />
                   </Grid>
                   <Grid item xs={12} md={12} sm={12}>
                       <DMTTextInput
                           label={'Description'}
                           name={'description'}
                           multiline={true}
                           minRows={3}
                           value={formik.values.description}
                           placeholder={'Enter the product description'}
                           error={Boolean(formik.touched.description && formik.errors.description)}
                           onBlur={formik.handleBlur}
                           helperText={formik.touched.description && formik.errors.description}
                           onChange={formik.handleChange}
                           fullWidth={true}
                           required={true}
                       />
                   </Grid>
                   <Grid item xs={12} md={12} sm={12}>
                       <CategoriesSelect
                           label={'Category'}
                           name={'categoryId'}
                           onBlur={formik.handleBlur}
                           value={formik.values.categoryId}
                           placeholder={"Select Category"}
                           error={Boolean(formik.touched.categoryId && formik.errors.categoryId)}
                           helperText={formik.touched.categoryId && formik.errors.categoryId}
                           onChange={value => formik.setFieldValue('categoryId', value?.id)}
                           fullWidth={true}
                           required={true}
                       />
                   </Grid>
                   <Grid item xs={12} md={6} sm={12}>
                       <DMTCurrencyInput
                           label={'Unit Price'}
                           name={'price'}
                           onBlur={formik.handleBlur}
                           value={formik.values.price}
                           error={Boolean(formik.touched.price && formik.errors.price)}
                           helperText={formik.touched.price && formik.errors.price}
                           onChange={(values) => formik.setFieldValue('price', values?.value)}
                           defaultInput={false}
                           fullWidth={true}
                           required={true}
                       />
                   </Grid>
                   <Grid item xs={12} md={6} sm={12}>
                       <DMTCurrencyInput
                           label={'Quantity'}
                           prefix={''}
                           name={'qty'}
                           onBlur={formik.handleBlur}
                           value={formik.values.qty}
                           error={Boolean(formik.touched.qty && formik.errors.qty)}
                           helperText={formik.touched.qty && formik.errors.qty}
                           onChange={(values) => formik.setFieldValue('qty', values?.value)}
                           defaultInput={false}
                           fullWidth={true}
                           required={true}
                       />
                   </Grid>
                   <Grid item xs={12} md={12} sm={12}>
                       <DMTCatureImage
                           label={'Image'}
                           name={'image'}
                           onBlur={formik.handleBlur}
                           format={ALLOWED_DOCUMENTS.accept}
                           value={formik.values.image}
                           placeholder={"Take / Upload Photo"}
                           error={Boolean(formik.touched.image && formik.errors.image)}
                           helperText={formik.touched.image && formik.errors.image}
                           onChange={value => formik.setFieldValue('image', value)}
                           fullWidth={true}
                           required={true}
                       />
                   </Grid>
               </Grid>
               <Box sx={{ display: 'flex', gap:2, mt:2, justifyContent: 'flex-end'}}>
                   <Button onClick={onClose} variant={'text'} color={'primary'}>
                       {"Cancel"}
                   </Button>
                   <Button disabled={formik.isSubmitting} type={'submit'}  variant={'contained'} color={'primary'}>
                       {formik.isSubmitting ? "Saving..." : "Save"}
                   </Button>
               </Box>
           </Box>
       </>
   )
}

export default ProductForm;