'use client'
import RefreshButton from '@/app/components/RefreshButton';
import { checkArrNull } from '@/app/utils/helperFunc';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Product = () => {
    const [loading, setLoading] = useState(false)
    const [deleteload, setdeleteload] = useState(false)
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setbrands] = useState([]);
    const [selectedValue, setSelectedValue] = useState(""); // Initial state for the selected value
    const [selectedBrand, setSelectedBrand] = useState(""); // Initial state for the selected value
    const [newProduct, setNewProduct] = useState({
        name: '',
        categoryId: '',
        brandId: '',
        price: '',
        image: '',
        size: '',
        wattage: '',
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        category: "",
        brand: "",
        image: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const validateForm = () => {
        let isValid = true;
        let errors = {};

        // Validate name
        if (!newProduct.name) {
            isValid = false;
            errors.name = "Product name is required";
        }

        // Validate category
        if (!newProduct.categoryId) {
            isValid = false;
            errors.category = "Please select a category";
        }

        // Validate brand
        if (!newProduct.brandId) {
            isValid = false;
            errors.brand = "Please select a brand";
        }

        // Validate image
        if (!newProduct.image) {
            isValid = false;
            errors.image = "Product image is required";
        }

        setFormErrors(errors);
        return isValid;
    };
    useEffect(() => {
        fetchProducts();
        fetchCategories()
        fetchbrands()
    }, []);
    const fetchbrands = async () => {
        setLoading(true)
        try {
            const response = await axios.get("/api/brand");
            setbrands(response.data);
        } catch (error) {
            console.error("Error fetching Brand:", error);
        } finally {
            setLoading(false)
        }
    };
    const fetchCategories = async () => {
        setLoading(true)
        try {
            const response = await axios.get("/api/category");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching category:", error);
        } finally {
            setLoading(false)
        }
    };
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false)
        }
    };
    // const handleAddProduct = async (e) => {
    //     e.preventDefault();
    //     setLoading(true)
    //     try {
    //         await axios.post('/api/products', newProduct);
    //         fetchProducts(); // Refresh the product list
    //     } catch (error) {
    //         console.error('Error adding product:', error);
    //     } finally {
    //         setLoading(false)
    //     }
    // };
    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (editMode) {
            handleUpdateProduct(e)
        } else {
            if (!validateForm()) {
                return;
            }

            setLoading(true);
            try {
                await axios.post("/api/products", newProduct);
                setNewProduct({
                    name: '',
                    categoryId: '',
                    brandId: '',
                    price: '',
                    image: '',
                    size: '',
                    wattage: '',
                });
                setSelectedValue('')
                setSelectedBrand('')
                fetchProducts(); // Refresh the product list
            } catch (error) {
                console.error("Error adding product:", error);
            } finally {
                setLoading(false);
            }
        }

    };
    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await axios.patch(`/api/products/${editId}`, {
                productId: editId,
                updatedFields: newProduct,
            });
            setNewProduct({
                name: '',
                categoryId: '',
                brandId: '',
                price: '',
                image: '',
                size: '',
                wattage: '',
            });
            setSelectedValue('')
            setSelectedBrand('')
            fetchProducts(); // Refresh the product list
            setEditMode(false)
            setEditId(null)
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
            setEditMode(false)
            setEditId(null)
        }
    };

    const handleDeleteProduct = async (id) => {
        setdeleteload(true);
        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts(); // Refresh the product list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setdeleteload(false)
        }
    };


    const handleChange = (event) => {
        setSelectedValue(event.target.value); // Update state when an option is selected
        setNewProduct({ ...newProduct, categoryId: event.target.value })
    };
    const handleChangeBrand = (event) => {
        setSelectedBrand(event.target.value); // Update state when an option is selected
        setNewProduct({ ...newProduct, brandId: event.target.value })
    };
    const [imageURL, setImageURL] = useState(null);

    const handleImageUpload = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        console.log('Image formData:', formData);
        console.log('Image :', e.target.files[0]);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded:', response.data);
            setImageURL(response.data.url); // Save the uploaded image URL
            setNewProduct((prev) => ({ ...prev, image: response.data.url })); // Add URL to product object

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    console.log("newProduct", newProduct)
    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Product Management</h1>
            <form onSubmit={handleAddProduct} className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
                <input
                    type="text"
                    id='name'
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="p-2 w-full rounded-md border border-gray-300"
                />
                {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category for product *</label>
                <select
                    className="p-2 w-full rounded-md border border-gray-300"
                    id="dropdown"
                    value={selectedValue} // Bind the state to the select element
                    onChange={handleChange} // Update state on change
                >
                    <option value="" disabled>
                        -- Select a category for product --
                    </option>
                    {categories?.map((item) => (
                        <option key={item?._id} value={item?._id}>
                            {item?.name}
                        </option>
                    ))}
                </select>
                {formErrors.category && (
                    <p className="text-red-500 text-sm">{formErrors.category}</p>
                )}
                <label htmlFor="dropdown2" className="block text-sm font-medium text-gray-700">Brand of product *</label>
                <select
                    className="p-2 w-full rounded-md border border-gray-300"
                    id="dropdown2"
                    value={selectedBrand} // Bind the state to the select element
                    onChange={handleChangeBrand} // Update state on change
                >
                    <option value="" disabled>
                        -- Select a brand for product --
                    </option>
                    {brands?.map((item) => (
                        <option key={item?._id} value={item?._id}>
                            {item?.name}
                        </option>
                    ))}
                </select>
                {formErrors.brand && (
                    <p className="text-red-500 text-sm">{formErrors.brand}</p>
                )}
                <label htmlFor="Price" className="block text-sm font-medium text-gray-700">Price *</label>
                <input
                    type="number"
                    id='Price'
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="p-2 w-full rounded-md border border-gray-300"
                />
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                <input
                    type="text"
                    id='size'
                    placeholder="Size (optional)"
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                    className="p-2 w-full rounded-md border border-gray-300"
                />
                <label htmlFor="wattage" className="block text-sm font-medium text-gray-700">Wattage</label>
                <input
                    type="text"
                    id='wattage'
                    placeholder="Wattage (optional)"
                    value={newProduct.wattage}
                    onChange={(e) => setNewProduct({ ...newProduct, wattage: e.target.value })}
                    className="p-2 w-full rounded-md border border-gray-300"
                />
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL *</label>
                <input
                    type="text"
                    id='image'
                    placeholder="Image URL (copy URL from google of that product. Remeber copy image address."
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="p-2 w-full rounded-md border border-gray-300"
                />
                {formErrors.image && (
                    <p className="text-red-500 text-sm">{formErrors.image}</p>
                )}
                {/* <input
                    accept="image/*"
                    type="file" onChange={handleImageUpload} />
                {imageURL && <img

                    className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"

                    src={imageURL} alt="Uploaded" />} */}
                <br />
                <br />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    {editMode ? "Edit Product" : 'Add Product'}
                </button>
            </form>
            <div className="flex gap-2 items-center mt-8 mb-4">
                <h3 className="text-xl font-semibold ">Product List</h3>
                <RefreshButton onClick={()=>{
                       fetchProducts();
                       fetchCategories()
                       fetchbrands()
                }} />
            </div>
            <div className="overflow-x-auto">

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left capitalize ">Product Name</th>
                            <th className="p-4 text-left capitalize ">Category</th>
                            <th className="p-4 text-left capitalize ">Brand</th>
                            <th className="p-4 text-left capitalize ">Price</th>
                            <th className="p-4 text-left capitalize ">size</th>
                            <th className="p-4 text-left capitalize ">wattage</th>
                            <th className="p-4 text-left capitalize ">image</th>
                            <th className="p-4 text-left capitalize ">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {

                            loading ?
                                <tr>
                                    <td colSpan={5} className='p-4 text-center size-4'>
                                        Loading ...
                                    </td>
                                </tr>
                                :
                                checkArrNull(products) ? (
                                    <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                        No data found, Please add some.
                                    </li>
                                ) :


                                    products?.map((product, index) => (
                                        <tr key={product?._id} className="border-b border-gray-200">
                                            <td className="p-4 capitalize">{product?.name == '' ? '-' : product?.name}</td>
                                            <td className="p-4 capitalize">{product?.category?.name == '' ? '-' : product?.category?.name}</td>
                                            <td className="p-4 capitalize">{product?.brand?.name == '' ? '-' : product?.brand?.name}</td>
                                            <td className="p-4 capitalize">{product?.price == '' ? '-' : product?.price}</td>
                                            <td className="p-4 capitalize">{product?.size == '' ? '-' : product?.size}</td>
                                            <td className="p-4 capitalize">{product?.wattage == '' ? '-' : product?.wattage}</td>
                                            <td className="p-4 capitalize w-[40px] h-[30px] ">{product?.image == '' ? '-' :
                                                <img src={product?.image} alt={'imageProd' + index} />
                                            }</td>
                                            <td className="p-4 capitalize">
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-1"
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditId(product?._id);
                                                        setNewProduct({
                                                            name: product?.name,
                                                            categoryId: product?.category?._id,
                                                            brandId: product?.brand?._id,
                                                            price: product?.price,
                                                            image: product?.image,
                                                            size: product?.size,
                                                            wattage: product?.wattage,
                                                        });
                                                        setSelectedValue(product?.category?._id)
                                                        setSelectedBrand(product?.brand?._id)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    disabled={deleteload}
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                                                    onClick={() => handleDeleteProduct(product?._id)}
                                                >
                                                    {deleteload ? "Deleting..." : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product