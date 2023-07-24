import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, useAdminCheck } from '../../../../ApiUtils/apiUtils';
import { PRODUCT_API_URL } from '../../../../constants/constants';
import './EditProduct.css';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
};

function EditProduct() {
  const isAdmin = useAdminCheck();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  const { data: product } = useQuery<Product>(['product', id], async () => {
    const data = await fetchData<Product>(`${PRODUCT_API_URL}/${id}`);
    return data;
  });

  

  const updateProductMutation = useMutation(
    async (productData: Partial<Product>) => {
      try {
        await fetch(`${PRODUCT_API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Error updating product. Please try again.');
      } finally {
        queryClient.invalidateQueries(['product', id]);
        navigate('/products');
      }
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedProductData: Partial<Product> = {
      title,
      price,
      description,
      images,
    };

    updateProductMutation.mutate(updatedProductData);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        <h2 className="title1">Only administrators can update products.</h2>
        <p className="Subtitle2">You will be redirected to the homepage.</p>
        {setTimeout(() => {
          navigate('/');
        }, 3000)}
      </div>
    );
  }

  return (
    <div id="edit-product-container">
      <div id="edit-product-form-container">
        <h1 className="edit-product-title">Edit Product</h1>

        <form onSubmit={handleSubmit} id="edit-product-form">
          <label>
            Title: <input type="text" className="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <br />
          <label>
            Price: <input type="number" className="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </label>
          <br />
          <label>
            Description: <textarea className="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <br />
          <label>
            Images: <input type="text" className="images" value={images.join(',')} onChange={(e) => setImages(e.target.value.split(','))} required />
          </label>
          <br />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;