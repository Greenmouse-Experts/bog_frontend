import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import SelectableItem from "../../../../widgets/SelectableItem";
import { productSchema } from "../../../../../services/validation";
import Spinner from "../../../../layouts/Spinner";
import { updateProduct } from "../../../../../redux/actions/ProductAction";

const EditProduct = ({ CloseEditModal, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const [category, setCategory] = useState(product.categoryId);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState(product?.unit);
  const selectedCategory = categories.find(
    (where) => where.id === product.categoryId
  );

  const defaultCategory = {
    label: selectedCategory.name,
    value: selectedCategory.id,
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };
  const stopLoading = () => {
    setLoading(false);
    CloseEditModal();
  };

  const createNewProduct = (value, action) => {
    setLoading(true);
    const fd = new FormData();
    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        fd.append(`photos[]`, photos[i]);
      }
    }
    fd.append("name", value.name);
    fd.append("price", value.price);
    fd.append("quantity", value.quantity);
    fd.append("min_qty", value.min_qty);
    fd.append("max_qty", value.max_qty);
    fd.append("unit", units);
    fd.append("description", value.description);
    fd.append("categoryId", category);
    fd.append("productId", product.id);
    dispatch(updateProduct(fd, product.id, stopLoading));
    // action.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity),
      description: product.description,
      min_qty: Number(product.min_qty),
      max_qty: Number(product.max_qty)
      // unit: product.unit,
    },
    validationSchema: productSchema,
    onSubmit: createNewProduct,
  });
  const { name, price, quantity, description, min_qty, max_qty } = formik.values;
  const changeCategory = (val) => {
    const value = val.value;
    setCategory(value);
    setUnits(val.unit);
  };
  const options =
    categories.length > 0
      ? categories.map((category) => {
          return {
            label: category.name,
            value: category.id,
            unit: category.unit,
          };
        })
      : [];
  return (
    <div
      className="fixed font-primary top-0 left-0 w-full h-screen bg-op center-item z-40"
      onClick={CloseEditModal}
    >
      <div
        className="bg-white px-4 lg:w-5/12 rounded-md h-700 overflow-y-auto overscroll-none  w-11/12 pt-8 pb-8 lg:px-10 shadow fw-500 scale-ani"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={formik.handleSubmit}>
          <p className="lg:fs-700 fw-600">Edit this Product</p>
          <div className="w-48.5 mt-6">
            <label className="block">Product Category</label>
            <SelectableItem
              options={options}
              handleChange={changeCategory}
              placeholder="Select category"
              default={defaultCategory}
            />
          </div>
          <div className="mt-5">
            <label className="block">Product Title</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              required
              id="name"
              name="name"
              value={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="mt-5">
            <label className="block">Product Price</label>
            <input
              type="number"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              required
              id="price"
              name="price"
              value={price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <p className="text-red-500">{formik.errors.price}</p>
            ) : null}
          </div>
          <div className="mt-5">
            <label className="block">Available Quantity</label>
            <input
              type="number"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              required
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <p className="text-red-500">{formik.errors.quantity}</p>
            ) : null}
          </div>
          <div className="mt-5">
          <label className="block">Minimum Purchase</label>
          <input
            type="number"
            className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
            id="min_qty"
            name="min_qty"
            value={min_qty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.min_qty && formik.errors.min_qty ? (
            <p className="text-red-500">{formik.errors.min_qty}</p>
          ) : null}
        </div>
        <div className="mt-5">
          <label className="block">Maximum Purchase</label>
          <input
            type="number"
            className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
            id="max_qty"
            name="max_qty"
            value={max_qty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.max_qty && formik.errors.max_qty ? (
            <p className="text-red-500">{formik.errors.max_qty}</p>
          ) : null}
        </div>
          <div className="mt-5">
            <label className="block">Unit of measurement</label>
            <input
              type="text"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              id="unit"
              name="unit"
              value={units ? units : ""}
              onChange={changeCategory}
              disabled
            />
          </div>
          <div className="mt-5">
            <label className="block">Product Image</label>
            <input
              type="file"
              className="w-full border border-gray-400 rounded mt-2 py-2 px-2"
              name="photos"
              multiple
              onChange={handlePhotoChange}
            />
          </div>
          <div className="mt-5">
            <label className="block">Product Description</label>
            <textarea
              className="w-full h-24 border border-gray-400 rounded mt-2 p-2"
              required
              id="description"
              name="description"
              value={description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <p className="text-red-500">{formik.errors.description}</p>
            ) : null}
          </div>
          <div className="mt-8 flex justify-between">
            <Button color="red" onClick={CloseEditModal}>
              Cancel
            </Button>
            {loading ? (
              <Spinner />
            ) : (
              <Button type="submit" className="bg-primary" onClick={() => createNewProduct(formik.values)}>
                Save Edit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
