import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchData, useAdminCheck } from '../../../ApiUtils/apiUtils';
import { QUERY_KEY_CATEGORIES, CATEGORY_API_URL, PRODUCT_API_URL } from '../../../constants/constants';
import './CreateProducts.css';
import { CirclesWithBar } from 'react-loader-spinner';

type Category = {
  id: number;
  name: string;
};

function CreateProducts() {
  const isAdmin = useAdminCheck();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const { data: categories } = useQuery<Category[]>(QUERY_KEY_CATEGORIES, async () => {
    const data = await fetchData<Category[]>(CATEGORY_API_URL);
    return data;
  });

  const createProductMutation = useMutation(
    async (productData: any) => {
      await fetch(PRODUCT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(productData),
      });
    },
    {
      
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY_CATEGORIES);
        navigate('/products');
      },
          onError: (error: Error) => {
        console.error('Error creating product:', error);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData = {
      title,
      price,
      description,
      categoryId,
      images,
    };

    try {
      await createProductMutation.mutateAsync(productData);
      setTitle('');
      setPrice(0);
      setDescription('');
      setCategoryId(0);
      setImages([]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  if (!isAdmin) {
    return (
      <div>
        <h2 className="title1">Only administrators can create products.</h2>
        <p className="Subtitle2">You will be redirected to the homepage.</p>
        {setTimeout(() => {
          navigate('/');
        }, 3000)}
      </div>
    );
  }

  return (
    <div id="create-products-container">
      <div id="create-products-form-container">
        <h1 className="create-products-title">Create Product</h1>
        <form onSubmit={handleSubmit} id="create-products-form">
          <label>
            Title: <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <br />
          <label>
            Price: <input type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </label>
          <br />
          <label>
            Description: <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <br />
          <label>
            Category:
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} required>
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Images: <input type="text" id="images" value={images.join(',')} onChange={(e) => setImages(e.target.value.split(','))} required />
          </label>
          <br />
          {createProductMutation.isLoading && (
            <div className="loading-container">
              <CirclesWithBar height={300} width={300} color="#5E1D0B" />
              <h1>Cargando...</h1>
            </div>
          )}
          {createProductMutation.isError && <p className="error">Error creating product. Please try again.</p>}
          {createProductMutation.isSuccess && <p className="success">Product created successfully!</p>}
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;