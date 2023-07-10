import React from 'react';
import { ERROR_IMAGE_URL } from '../../constants/constants';

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

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-container">
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
        <p>
          <strong>Category: {product.category.name}</strong>
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
