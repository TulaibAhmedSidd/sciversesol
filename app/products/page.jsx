// pages/products.js
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@styles/ProductPage.module.css'
import ProductCard from '@components/ProductCard'
import Button from '@components/Button'
import Alert from '@components/Alert'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { checkArrNull } from "../utils/helperFunc"
import Loading from '../components/Loading';
import RefreshButton from '../components/RefreshButton';

``
// const products = [
//   {
//     category: "Inverters",
//     items: [
//       {
//         id: 1, name: "Inverter A", brand: "Brand 1", wattage: "1000W", size: "Compact", price: 500, image: 'https://i0.wp.com/www.prostarsolar.net/wp-content/uploads/2024/03/PHS10K-48L-PRO-pure-sine-wave-10kw-hybrid-inverter-single-phase-48v.jpg?fit=800%2C800&ssl=1',
//       },
//       {
//         id: 2, name: "Inverter B", brand: "Brand 2", wattage: "2000W", size: "Medium", price: 750, image: 'https://powerhouseexpress.com.pk/cdn/shop/files/solis-8kw-hybrid-solar-inverter-1_352ba362-717d-41f5-b36e-a9abab202e89.jpg?v=1720872885',
//       },
//       {
//         id: 3, name: "Inverter C", brand: "Brand 3", wattage: "3000W", size: "Large", price: 1000, image: 'https://www.zamzamstore.com.pk/cdn/shop/files/rn-image_picker_lib_temp_c3c10c39-12db-483c-94a7-e7abf2ba6996.jpg?v=1723988152',
//       },
//     ]
//   },
//   {
//     category: "Solar Panels",
//     items: [
//       {
//         id: 4, name: "Solar Panel A", brand: "Brand 1", wattage: "300W", size: "Small", price: 250, image: 'https://solarfield.pk/wp-content/uploads/2024/05/jinko-580-watt-n-type-mono-perc-solar-panel-1200x900.jpg',
//       },
//       {
//         id: 5, name: "Solar Panel B", brand: "Brand 2", wattage: "500W", size: "Medium", price: 400, image: 'https://soherwardiasolar.com/wp-content/uploads/2024/04/jinko-solar.jpg',
//       },
//       {
//         id: 6, name: "Solar Panel C", brand: "Brand 3", wattage: "1000W", size: "Large", price: 600, image: 'https://brightsolar.pk/wp-content/uploads/2024/04/jinko-545-watt-solar-panel-price-in-pakistan.webp',
//       },
//     ]
//   },
//   {
//     category: "Batteries",
//     items: [
//       {
//         id: 7, name: "Battery A", brand: "Brand 1", size: "12V", wattage: "100Ah", price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkuLHUqcRFR9OZgzueq97hRhDBirlZYoiBpA&s',
//       },
//       {
//         id: 8, name: "Battery B", brand: "Brand 2", size: "24V", wattage: "150Ah", price: 350, image: 'https://cdn-enhoh.nitrocdn.com/PdbItfiYBBwTfYkgHIiOHKWlqZWDhqoj/assets/images/optimized/rev-fccc78f/www.gcrelectricalsystems.com.au/wp-content/uploads/2022/01/What-Happens-Solar-Power-When-Batteries-Full-scaled.jpg',
//       },
//       {
//         id: 9, name: "Battery C", brand: "Brand 3", size: "48V", wattage: "200Ah", price: 500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFNYdqHyRjlqomlpspfIWEmDETiKgFEYhEvA&s',
//       },
//     ]
//   }
// ];

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.get('/api/products/by-category');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false)
//     }
//   };
//   const [cart, setCart] = useState([]);
//   const router = useRouter()
//   const addToCart = (product) => {
//     setCart([...cart, product]);
//     localStorage.setItem('cart', JSON.stringify([...cart, product]));
//   };
//   const handleClick = () => {
//     router.push('/cart')
//   }

//   return (
//     <div className={styles.productCategories + " min-h-[70vh] "} >
//       <div className='bg_space_for_title'>
//         <h1 className={styles.title + " lightcolor"} >Product Categories</h1>
//       </div>
//       <div className=' p-3'>
//         {/*
//        <Alert
//           message="These are sample products for testing purposes. We’re actively working on adding real products soon. Stay tuned!"
//           type="info"
//         />
//        */}
//       </div>
//       {
//         loading ?
//           <Loading text='Loading Products' />

//           :
//           checkArrNull(products) ? (
//             <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//               No product available, please come later.
//             </li>
//           ) :
//             products?.map((category) => (
//               <div key={category?.category} className={styles.categorySection}>
//                 <h2 className={styles.categoryTitle}>{category?.category}</h2>
//                 <div className={styles.productList}>
//                   {
//                     checkArrNull(category?.items) ?
//                       <li className="bg-white p-4 rounded-lg flex justify-between items-center">
//                         No product for this Category.
//                       </li>
//                       :

//                       category?.items?.map((product) => (
//                         <ProductCard
//                           key={product?.id}
//                           product={product}
//                           addToCart={addToCart}
//                         />
//                       ))}
//                 </div>
//               </div>
//             ))}
//       <div className='my-4 w-full text-center'>
//         <Button variant="filled" size="large" onClick={handleClick} className={
//           'bg-color-primary'
//         } >
//           Go to cart
//         </Button>
//       </div>
//     </div>

//   );
// }

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ categoryId: "", brand: "", minPrice: 0, maxPrice: 100000 });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setloading(false);
    }
  };
  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/products/by-category", {
        params: { page, limit: 10, ...filters },
      });
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.totalProducts / 10) || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setloading(false);
    }
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  return (
    <div className="min-h-[70vh] w-full gap-6">
      <div className="bg_space_for_title w-full mb-6">
        <h1 className={styles.title + " lightcolor mt-6"}>Product Categories</h1>
      </div>
      <div className='flex w-full gap-6 p-4 flex-wrap md:flex-nowrap min-h-[80vh]' >
        {/* Left Panel - Filters */}
        <div className="w-full  md:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md">

          <div className="mb-6 flex gap-2 items-center">
            <p className="text-xl font-semibold text-gray-800 ">Filters</p>
            <RefreshButton
              onClick={() => {
                fetchCategories()
                fetchProducts();
              }}
            />
          </div>
          {/* Category Filter */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              id="category"
              className="border p-2 rounded w-full"
              value={filters.category}
              onChange={(e) => handleFilterChange("categoryId", e.target.value)}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price Filter */}
          <div className="mb-4">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              id="minPrice"
              type="number"
              placeholder="Min Price"
              className="border p-2 rounded w-full"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
          </div>

          {/* Max Price Filter */}
          <div className="mb-4">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              id="maxPrice"
              type="number"
              placeholder="Max Price"
              className="border p-2 rounded w-full"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        {/* Right Panel - Product List */}
        <div className="w-full md:w-3/4 flex flex-col">


          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : checkArrNull(products) ? (
              <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center w-full">
                No products available, please come later.
              </div>
            ) : (
              products?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-[#ffc107] text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{page}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-[#ffc107] text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>

  );
}