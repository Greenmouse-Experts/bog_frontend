import * as ActionType from '../type';
import axios from '../../config/config';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
// import Axios from '../../config/config';


export const loading = () => {
    return {
        type: ActionType.LOADING
    }
}

export const fetchProducts = (payload) => {
    return {
        type: ActionType.FETCH_PRODUCTS,
        payload
    }
}

export const fetchCategory = (payload) => {
    return {
        type: ActionType.FETCH_CATEGORIES,
        payload
    }
}

export const fetchSimilarProduct = (payload) => {
    return {
        type: ActionType.FETCH_CATEGORY_PRODUCT,
        payload
    }
}

export const fetchUserProduct = (payload) => {
    return {
        type: ActionType.FETCH_USER_PRODUCTS,
        payload
    }
}

export const fetchAdminProduct = (payload) => {
    return {
        type: ActionType.FETCH_ADMIN_PRODUCTS,
        payload
    }
}

export const DeleteProduct = (payload) => {
    return {
        type: ActionType.DELETE_PRODUCT,
        payload
    }
}

export const DeleteProductAdmin = (payload) => {
    return {
        type: ActionType.ADMIN_DELETE_PRODUCT,
        payload
    }
}

export const addProduct = (payload) => {
    return {
        type: ActionType.CREATE_PRODUCT,
        payload
    }
}

export const DeleteCategory = (payload) => {
    return {
        type: ActionType.DELETE_CATEGORY,
        payload
    }
}

export const addCategory = (payload) => {
    return {
        type: ActionType.ADD_CATEGORY,
        payload
    }
}
export const editCategory = (payload, id) => {
    return {
        type: ActionType.EDIT_CATEGORY,
        payload,
        id
    }
}

export const editProduct = (payload) => {
    return {
        type: ActionType.UPDATE_PRODUCT,
        payload
    }
}

export const UpdateProductStatus = (payload) => {
    return {
        type: ActionType.UPDATE_PRODUCT_STATUS,
        payload
    }
}

export const UpdateAdminProductStatus = (payload) => {
    return {
        type: ActionType.UPDATE_ADMIN_PRODUCT_STATUS,
        payload
    }
}

export const setError = (payload) => {
    return {
        type: ActionType.PRODUCT_ERROR,
        payload
    }
}

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            dispatch(loading());
            const response = await axios.get('/products/all', config);
            console.log(response);
            dispatch(fetchProducts(response.data))
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const getCategories = (stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            dispatch(loading());
            const response = await axios.get('/product/category', config);
            console.log(response);
            dispatch(fetchCategory(response.data))
            stopLoading();
        } catch (error) {
            stopLoading();
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const getSimilarProduct = (category) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            dispatch(loading());
            const url = `/products/similar-products?categoryId=${category}`
            const response = await axios.get(url, config);
            console.log(response);
            dispatch(fetchSimilarProduct(response.data))
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const getUserProducts = (stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            dispatch(loading());
            console.log({ authToken });
            const response = await axios.get('/products', config);
            console.log(response);
            dispatch(fetchUserProduct(response.data));
            stopLoading();
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                stopLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const getAdminProducts = (stopLoading) => {
    return async (dispatch) => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            dispatch(loading());
            const response = await axios.get('/product/admin/get-products', config);
            console.log(response);
            stopLoading();
            dispatch(fetchAdminProduct(response.data))
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                stopLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}


export const removeProduct = (productId, saveLoading, isAdmin) => {
    return async (dispatch) => {
        try {
                const authToken = localStorage.getItem("auth_token");
                const config = {
                    headers:
                    {
                        "Content-Type": "application/json",
                        'Authorization': authToken
                    }
                };
            const url = `/product/${productId}`
            const response = await axios.delete(url, config);
            console.log(response);
            if (isAdmin) {
                dispatch(DeleteProductAdmin(productId));
            } else {
                dispatch(DeleteProduct(productId));
            }

            saveLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Product deleted successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            })
        } catch (error) {
            console.log(error?.response?.data?.message);
            if (error.message === 'Request failed with status code 401') {
                // window.location.href = '/';
                toast.error("Unauthorized Request")
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const createProduct = (payload, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const url = `/products`;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.post(url, payload, config);
            dispatch(addProduct(response.data));
            saveLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Product created successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            })
        } catch (error) {
            saveLoading();
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const removeCategory = (categoryId, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const url = `/product/category/${categoryId}`
            await axios.delete(url);
            dispatch(DeleteCategory(categoryId));
            saveLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Category deleted successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            })
        } catch (error) {
            console.log(error?.response?.data?.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }
    }
}

export const updateCategory = (payload, saveLoading, categoryId) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const url = `/product/category/${categoryId}`;
            const sentPayload = {
                name: payload.name,
                description: payload.description,
                unit: payload.unit
            };
            const response = await axios.patch(url, sentPayload);
            console.log(response);
            dispatch(editCategory(payload, categoryId));
            saveLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Category updated successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            })
        } catch (error) {
            console.log(error?.response?.data?.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }
    }
}

export const createCategory = (payload, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const url = `/product/category`;

            const response = await axios.post(url, payload);
            console.log(response);
            dispatch(addCategory(response.data));
            saveLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Category created successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            })
        } catch (error) {
            console.log(error?.response?.data?.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }
    }
}

export const updateProduct = (payload, productId, saveLoading) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const url = `/product/${productId}`;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.patch(url, payload, config);
            dispatch(editProduct(response.data));
            saveLoading();
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Product updated successfully",
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            })
        } catch (error) {
            console.log(error?.response?.data?.message);
            if (error.message === 'Request failed with status code 401') {
                window.location.href = '/';
            }
            else {
                dispatch(setError(error.message));
                saveLoading();
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }

    }
}

export const addProductToStore = (productId, saveLoading, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const authToken = localStorage.getItem("auth_token");
                const config = {
                    method:"patch",
                    url:`/product/add-to-shop/${productId}`,
                    headers:
                    {
                        "Content-Type": "application/json",
                        'Authorization': authToken
                    }
                };
            const response = await axios(config);
            const payload = {
                productId,
                status: "in_review"
            }
            saveLoading();
            dispatch(UpdateProductStatus(payload));
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: response.message,
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            }).then((result) => {
                if (result.value) {
                    navigate('/dashboard/products');
                }
            });
        } catch (error) {
            saveLoading();
            if (error.message === 'Request failed with status code 401') {
                toast.error('Please try again')
                // window.location.reload();
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }
    }
}

export const ApproveProduct = (payload, stopLoading, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const authToken = localStorage.getItem("auth_token");
            
            const config = {
                method: 'post',
                url: `product/admin/approve-product`,
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                },
                data: {...payload}
            }
            const response = await axios(config);
            stopLoading();
            dispatch(UpdateAdminProductStatus(payload));
            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: response.message,
                buttonsStyling: "false",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3F79AD",
            }).then((result) => {
                if (result.value) {
                    navigate('/dashboard/productsadmin');
                }
            });
        } catch (error) {
            stopLoading();
            if (error.message === 'Request failed with status code 401') {
                toast.error('Please try again')
                // window.location.reload();
            }
            else {
                dispatch(setError(error.message));
                toast.error(
                    error?.response?.data?.message || error.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
            }
        }
    }
}