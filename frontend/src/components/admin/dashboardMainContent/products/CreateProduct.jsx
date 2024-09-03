// import React, { useEffect, useState } from 'react';
// import SideMenu from '../sideMenu/SideMenu';
// import '../products/createProduct.css';
// import { RxCrossCircled } from "react-icons/rx";
// import { RiUploadCloud2Fill } from "react-icons/ri";
// import { TbWorldUpload } from "react-icons/tb";
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const CreateProduct = () => {
//     const [category, setCategory] = useState([]);
//     console.log(category)

//     //get all category
//     const getAllCategory = async ()=>{
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`);
//             if(response.data.success){
//                 setCategory(response.data.allCategory);
//             }
            
//         } catch (error) {
//             if(error.response){
//                 toast.error(error.response.data.message);
//             }
            
//         }
//     }

//     useEffect(()=>{
//         getAllCategory();
//     },[])





//   return (
//     <div className="adminDashboard">
//       <div className="sideMenuContainer">
//         <SideMenu />
//       </div>
//       <div className="adminChartContainer">
//         <h3>Create Product here</h3>
//         <form className='createProductForm'>
//           <div className="productDetails">
//             <label>Product Title</label>
//             <input type="text" name="namae" placeholder='Write a title here...' />
//             <label>Product Description</label>
//             <input type="text" name="description" placeholder='Write a description here...' />
//             <label>Product Images</label>
//             <input type="file" name="images" />
//           </div>

//           <div className="productOrganize">
//             {/* <h3>Product Organize</h3> */}
//            <div>
//              <label>Real Price</label>
//             <input type="number" name="realPrice" placeholder='Enter real price...' />
//             <label>Sale Price</label>
//             <input type="number" name="salePrice" placeholder='Enter sale price...' />
//            </div>
//             <label>Select Category</label>
//             <select>
//               {
//                   category.map((c)=>(
//                      <option key={c._id} value={c._id}>{c.categoryName}</option>                      
//                 ))
//               }
//             </select>
//             <label>Select Brand</label>
//             <select>
//               <option value="nepaltech">Nepal Tech</option>
//               <option value="macbook">MacBook</option>
//               <option value="macbook">Vivo</option>
//               <option value="macbook">CG</option>
//             </select>
//           </div>

//           <div className='createButtonContainer'>
//             <div className="discardBtn">
//               <p className='createIcon'><RxCrossCircled /></p>
//               <p className='createText'>Discard</p>
//             </div>
//             <div className="saveDraftBtn">
//               <p className='createIcon'><RiUploadCloud2Fill /></p>
//               <p className='createText'>Save Draft</p>
//             </div>
//             <div className="publishedtBtn">
//               <p className='createIcon'><TbWorldUpload /></p>
//               <p className='createText'>Published</p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;










import React, { useEffect, useState } from 'react';
import SideMenu from '../sideMenu/SideMenu';
import '../products/createProduct.css';
import { RxCrossCircled } from "react-icons/rx";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TbWorldUpload } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const CreateProduct = () => {
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        realPrice: '',
        salePrice: '',
        brand: '',
        category: '',
        images: []
    });

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/getAllCategory`);
            if (response.data.success) {
                setCategory(response.data.allCategory);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    // Fetch all brands
    const getAllBrand = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/brand/getAllBrand`);
            if (response.data.success) {
                setBrand(response.data.allBrand);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        getAllCategory();
        getAllBrand();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                Array.from(formData.images).forEach(file => {
                    form.append('images', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        });

        // Display "Please wait" toast while uploading images
        const toastId = toast.loading('Please wait, image is uploading...', { duration: 0 });

        try {
            console.log(formData);  // Debug: Check formData before submission

            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/createProduct`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                // Clear form after successful submission
                setFormData({
                    name: '',
                    description: '',
                    realPrice: '',
                    salePrice: '',
                    brand: '',
                    category: '',
                    images: []
                });
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            // Dismiss the "Please wait" toast
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="adminDashboard">
            <Toaster /> 
            <div className="sideMenuContainer">
                <SideMenu />
            </div>
            <div className="adminChartContainer">
                <h3>Create Product here</h3>
                <form className='createProductForm' onSubmit={handleFormSubmit}>
                    <div className="createProductDetails">
                        <label>Product Title</label>
                        <input className='input' type="text" name="name" placeholder='Write a title here...' value={formData.name} onChange={handleInputChange} />
                        <label>Product Description</label>
                        <input className='input' type="text" name="description" placeholder='Write a description here...' value={formData.description} onChange={handleInputChange} />
                        <label>Product Images</label>
                        <input className='input' type="file" name="images" multiple onChange={handleFileChange} />
                    </div>

                    <div className="productOrganize">
                        <div>
                            <label>Real Price</label>
                            <input className='input' type="number" name="realPrice" placeholder='Enter real price...' value={formData.realPrice} onChange={handleInputChange} />
                            <label>Sale Price</label>
                            <input className='input' type="number" name="salePrice" placeholder='Enter sale price...' value={formData.salePrice} onChange={handleInputChange} />
                        </div>
                        <label>Select Category</label>
                        <select className='select' name="category" value={formData.category} onChange={handleInputChange}>
                            <option value="">Select Category</option>
                            {category.map((c) => (
                                <option key={c._id} value={c._id}>{c.categoryName}</option>
                            ))}
                        </select>
                        <label>Select Brand</label>
                        <select className='select' name="brand" value={formData.brand} onChange={handleInputChange}>
                            <option value="">Select Brand</option>
                            {brand.map((b) => (
                                <option key={b._id} value={b._id}>{b.brandName}</option>
                            ))}
                        </select>
                    </div>

                    <div className='createButtonContainer'>
                        <div className="discardBtn">
                            <p className='createIcon'><RxCrossCircled /></p>
                            <p className='createText'>Discard</p>
                        </div>
                        <div className="saveDraftBtn">
                            <p className='createIcon'><RiUploadCloud2Fill /></p>
                            <p className='createText'>Save Draft</p>
                        </div>
                        <button type="submit" className="publishedtBtn">
                            <p className='createIcon'><TbWorldUpload /></p>
                            <p className='createText'>Published</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
