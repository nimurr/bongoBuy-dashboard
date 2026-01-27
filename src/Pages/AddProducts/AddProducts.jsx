import { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit, MdVisibility } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateProductMutation, useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } from "../../redux/features/product/product";
import { useGetCategoriesQuery } from "../../redux/features/category/category";
import Url from "../../redux/baseApi/forImageUrl";

export default function AddProducts() {
  const { data } = useGetProductsQuery();
  const products = data?.data?.attributes || [];

  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // ✅ Categories
  const { data: categoryData } = useGetCategoriesQuery();
  const categories = categoryData?.data?.attributes || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  // ✅ Selected Category
  const [selectedCategory, setSelectedCategory] = useState("");

  /* ================= MODAL HANDLERS ================= */
  const openCreateModal = () => {
    setEditingProduct(null);
    setSelectedCategory("");
    setIsModalOpen(true);
  };

  const openViewModal = (product) => {
    setViewProduct(product);
    setIsViewModalOpen(true);
  };


  const [productForm, setProductForm] = useState({
    name: "",
    image: null,
    price: "",
    discountPrice: "",
    categoryId: "",
    inStockQuantity: "",
    description: "",
    agvRating: "",
    reviews: "",
    promoCode: "",
    promoCodeDiscount: "",
    isActive: true,
  });

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      image: null,
      price: product.price || "",
      discountPrice: product.discountPrice || 0,
      categoryId: product.categoryId || "",
      inStockQuantity: product.inStockQuantity || 0,
      description: product.description || "",
      agvRating: product.agvRating || 0,
      reviews: product.reviews || 0,
      promoCode: product.promoCode || "",
      promoCodeDiscount: product.promoCodeDiscount || 0,
      isActive: product.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setProductForm(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };


  /* ================= CATEGORY HANDLER ================= */


  const handleSubmit = async () => {

    const payload = {
      name: productForm.name,
      image: productForm.image,
      price: productForm.price,
      discountPrice: productForm.discountPrice,
      categoryId: productForm.categoryId,
      inStockQuantity: productForm.inStockQuantity,
      description: productForm.description,
      agvRating: productForm.agvRating,
      reviews: productForm.reviews,
      promoCode: productForm.promoCode,
      promoCodeDiscount: productForm.promoCodeDiscount,
      isActive: productForm.isActive,
    };

    if (!productForm.categoryId) {
      return toast.error("Please Select a Category");
    }


    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("image", payload.image);
    formData.append("price", payload.price);
    formData.append("discountPrice", payload.discountPrice || 0);
    formData.append("categoryId", payload.categoryId);
    formData.append("inStockQuantity", payload.inStockQuantity || 0);
    formData.append("description", payload.description);
    formData.append("agvRating", payload.agvRating || 0);
    formData.append("reviews", payload.reviews || 0);
    formData.append("promoCode", payload.promoCode);
    formData.append("promoCodeDiscount", payload.promoCodeDiscount);
    formData.append("isActive", payload.isActive);

    try {
      if (!editingProduct) {
        const res = await createProduct(formData).unwrap();
        console.log(res)
        if (res?.code == 201) {
          toast.success("Product Added Successfully");
          setIsModalOpen(false);
          setProductForm({
            name: "",
            image: null,
            price: "",
            discountPrice: "",
            categoryId: "",
            inStockQuantity: "",
            description: "",
            agvRating: "",
            reviews: "",
            promoCode: "",
            promoCodeDiscount: "",
            isActive: true,
          })
        }
        else {
          toast.error(res?.data?.message || "Failed to add product.");
        }
      }
      else {
        const res = await updateProduct({
          id: editingProduct._id,
          data: formData,
        })
        console.log(res)
        if (res) {
          toast.info("Product Update Successfully");
          setIsModalOpen(false);
          setProductForm({
            name: "",
            image: null,
            price: "",
            discountPrice: "",
            categoryId: "",
            inStockQuantity: "",
            description: "",
            agvRating: "",
            reviews: "",
            promoCode: "",
            promoCodeDiscount: "",
            isActive: true,
          })
        }
      }

    } catch (error) {
      toast.error(error?.data?.message || "Failed to add product.");
    }

  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id).unwrap();
      if (res?.code === 200) {
        toast.warning("Product Deleted Successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };


  return (
    <div className="p-6">
      <ToastContainer />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Products</h2>
        <button
          onClick={openCreateModal}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-slate-800 rounded">
        <table className="min-w-full text-white">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-b border-slate-700">
                <td className="p-3">
                  <img
                    src={Url + item.image}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">৳{item.price}</td>
                <td className="p-3">{item.inStockQuantity}</td>
                <td className="p-3">
                  <span className={`${item.isActive ? 'text-green-500 bg-green-100 py-1 px-3 rounded-sm' : 'text-red-500 bg-red-100 p-1 px-3 rounded-sm'}`}>{item.isActive ? "Active" : "Inactive"}</span>

                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openViewModal(item)}
                    className="text-blue-400 text-xl"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-yellow-400 text-xl"
                  >
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 text-xl">
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 max-h-screen overflow-y-auto py-20  bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 w-[90%] max-w-2xl p-6 rounded">
            <h3 className="text-xl text-white mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input name="name" value={productForm.name} onChange={handleChange}
                placeholder="Product Name" className="input px-3 py-2 bg-transparent border text-white rounded" />

              <select name="categoryId" value={productForm._id} onChange={handleChange}
                className="input bg-transparent border text-white rounded">
                <option className="bg-black" value="">Select Category</option>
                {categories.map(cat => (
                  <option className="bg-black" key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>

              <input type="number" name="price" value={productForm.price}
                onChange={handleChange} placeholder="Price" className="input bg-transparent border text-white rounded" />

              <input type="number" name="discountPrice" value={productForm.discountPrice}
                onChange={handleChange} placeholder="Discount %" className="input bg-transparent border text-white rounded" />

              <input type="number" name="inStockQuantity" value={productForm.inStockQuantity}
                onChange={handleChange} placeholder="Stock Quantity" className="input bg-transparent border text-white rounded" />

              <input type="number" step="0.1" name="agvRating" value={productForm.agvRating}
                onChange={handleChange} placeholder="Average Rating" className="input bg-transparent border text-white rounded" />

              <input type="number" name="reviews" value={productForm.reviews}
                onChange={handleChange} placeholder="Total Reviews" className="input bg-transparent border text-white rounded" />

              <input name="promoCode" value={productForm.promoCode}
                onChange={handleChange} placeholder="Promo Code" className="input px-3 bg-transparent border text-white rounded py-2" />

              <input type="number" name="promoCodeDiscount"
                value={productForm.promoCodeDiscount}
                onChange={handleChange} placeholder="Promo Discount %" className="input bg-transparent border text-white rounded" />


              <label className="w-full md:col-span-2 border flex flex-col items-center px-4 py-6 border-dashed border-white rounded cursor-pointer mb-3 text-white">
                <span className="flex flex-col justify-center items-center gap-2">
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" > <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" /> </svg>
                  {productForm.image ? "Image Uploaded . You can change it" : "Select Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>


              <textarea name="description" value={productForm.description}
                onChange={handleChange} rows="4"
                placeholder="Product Description"
                className="md:col-span-2 input bg-transparent border text-white rounded" />

              <div className="md:col-span-2 flex gap-6 text-white">
                <label><input type="checkbox" name="isActive"
                  checked={productForm.isActive} onChange={handleChange} /> Active</label>

              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>

                <button type="button" onClick={handleSubmit}
                  className="!bg-primary text-white px-6 py-2 rounded">
                  {editingProduct ? "Update" : "Create"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {isViewModalOpen && viewProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 w-[90%] max-w-xl p-6 rounded text-white">
            <h3 className="text-xl mb-4">Product Details</h3>

            <img
              src={Url + viewProduct.image}
              className="h-60 w-full object-cover rounded mb-4"
            />

            <p className="flex items-center justify-between my-2"><b>Name:</b> {viewProduct.name}</p>
            <p className="flex items-center justify-between my-2"><b>Price:</b>  ৳{viewProduct.price}</p>
            <p className="flex items-center justify-between my-2"><b>Stock:</b> {viewProduct.inStockQuantity}</p>
            <p className="flex items-center justify-between my-2"><b>Avg Rating:</b> {viewProduct.agvRating}</p>
            <p className="flex items-center justify-between my-2"><b>Promo Code:</b> {viewProduct.promoCode}</p>
            <p className="flex items-center justify-between my-2"><b>Promo Code Discount:</b> {viewProduct.promoCodeDiscount}</p>
            <p className="flex items-center justify-between my-2"><b>Total Reviews:</b> {viewProduct.reviews}</p>

            <div className="text-right mt-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-primary px-6 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
