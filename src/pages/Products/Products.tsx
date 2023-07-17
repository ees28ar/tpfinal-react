import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchData } from '../../ApiUtils/apiUtils';
import { QUERY_KEY_CATEGORIES, QUERY_KEY_PRODUCT, CATEGORY_API_URL, PRODUCT_API_URL } from '../../constants/constants';
import LoadingErrorComponent from '../../components/Error/LoadingComponent/LoadingErrorComponent';
import ProductItem from './ProductItem';
import { useLocation } from 'react-router-dom';
import './idProducts.css';
import { Product } from './Types';


type Category = {
  id: number;
  name: string;
};

function Products() {
  const location = useLocation();
  const categoryId = location.state?.categoryId || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });

  const { data: categories } = useQuery<Category[]>(QUERY_KEY_CATEGORIES, async () => {
    const data = await fetchData<Category[]>(CATEGORY_API_URL);
    return data;
  });

  const { data: products, isLoading, isError, error } = useQuery<Product[]>([QUERY_KEY_PRODUCT, selectedCategory, selectedPrice, selectedTitle, priceRange], async () => {
    let url = PRODUCT_API_URL;
    const queryParams: string[] = [];
    if (selectedCategory) {
      queryParams.push(`categoryId=${selectedCategory}`);
    }
    if (selectedPrice) {
      queryParams.push(`price=${selectedPrice}`);
    }
    if (selectedTitle) {
      queryParams.push(`title=${selectedTitle}`);
    }
    if (priceRange.min) {
      queryParams.push(`price_min=${priceRange.min}`);
    }
    if (priceRange.max) {
      queryParams.push(`price_max=${priceRange.max}`);
    }
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    const data = await fetchData<Product[]>(url);
    return data;
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="products-container">
      <h1 className="title-container">Explore Our Products</h1>
      <p className="categories-description">
        Discover a variety of high-quality products. We offer a diverse selection of items to suit your style and
        preferences. Browse through our collection and find the perfect product for you.
      </p>
      <LoadingErrorComponent isLoading={isLoading} isError={isError} error={error} />
      <div className="filter-form">
        <h2>Filter Options</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={selectedTitle} onChange={handleTitleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={selectedPrice} onChange={handlePriceChange} />
          </div>
          <div className="form-group">
            <p className="Price-Range">Price Range</p>
            <label htmlFor="price_min">Min Price</label>
            <input type="number" id="price_min" name="min" value={priceRange.min} onChange={handlePriceRangeChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price_max">Max Price</label>
            <input type="number" id="price_max" name="max" value={priceRange.max} onChange={handlePriceRangeChange} />
          </div>
          <p></p>
        </form>
      </div>
      <div className="products-list">
        {products?.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
