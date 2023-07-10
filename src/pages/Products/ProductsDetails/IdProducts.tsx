import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchData } from '../../../ApiUtils/apiUtils';
import { ERROR_IMAGE_URL, QUERY_KEY_PRODUCTS } from '../../../constants/constants';
import LoadingErrorComponent from '../../../components/Error/LoadingErrorComponent/LoadingErrorComponent';
import './idProducts.css';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};

function IdProducts() {
  const { id } = useParams<{ id: string }>();

  const { data: products, isLoading, isError, error } = useQuery<Product[]>(QUERY_KEY_PRODUCTS, async () => {
    const data = await fetchData<Product[]>(`https://api.escuelajs.co/api/v1/categories/${id}/products`);
    return data;
  });

  const category = products?.[0]?.category;

  return (
    <div className="products-container">
      <h1 className="categories-titles" >Category: {category?.name}</h1>
      <p className="categories-description">Discover a variety of high-quality products in the {category?.name} category. We offer a diverse selection of items to suit your style and preferences. Browse through our collection and find the perfect product for you.</p>
      <LoadingErrorComponent isLoading={isLoading} isError={isError} error={error} />
      <div className="products-list">
        {products?.map((product: Product) => (
          <div key={product.id} className="product-container">
            <div className="product-image-container">
              {product.images?.map((image: string, index: number) => (
                <img
                  key={index}
                  className="product-image"
                  src={image}
                  alt={`Product ${product.id} Image ${index}`}
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = ERROR_IMAGE_URL;
                  }}
                />
              ))}
            </div>
            <div className="product-details-container">
              <h1 className="product-title">{product.title}</h1>
              <h2 className="product-price">Price: {product.price}</h2>
              <p className="product-description">{product.description}</p>
              <p>Category: {product.category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdProducts;