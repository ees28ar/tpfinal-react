import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY_CATEGORIES, CATEGORY_API_URL } from '../../../constants/constants';
import { CirclesWithBar } from 'react-loader-spinner';
import { useAdminCheck } from '../../../ApiUtils/apiUtils';

function CreateCategories() {
  const isAdmin = useAdminCheck();  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(''); 
  const [success, setSuccess] = useState(false);

  const createCategoryMutation = useMutation(
    async (categoryData: any) => {
      await fetch(CATEGORY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
    },
    {
      onSuccess: () => {
        setSuccess(true);
        queryClient.invalidateQueries(QUERY_KEY_CATEGORIES);
        navigate('/categories');
      },
      onError: () => {
        setError('Error creating categories. Please try again.');
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const categoryData = {
      name: categoryName,
      image: categoryImage,
    };

    if (!categoryName || !categoryImage) {
      setError('Category name and image URL are required.');
      setLoading(false);
      return;
    }

    try {
      await createCategoryMutation.mutateAsync(categoryData);
    } catch (error) {
      setError('Error creating category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div>
        <h2 className="title1">Only administrators can create categories.</h2>
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
          <h1 className="create-products-title">Create Category</h1>
          <form onSubmit={handleSubmit} id="create-products-form">
            <label>
              Name: <input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
            </label>
            <br />
            <label>
              Image URL: <input type="text" id="categoryImage" value={categoryImage} onChange={(e) => setCategoryImage(e.target.value)} required />
            </label>
            <br />
            {loading && (
              <div className="loading-container">
                <CirclesWithBar height={300} width={300} color="#5E1D0B" />
                <h1>Cargando...</h1>
              </div>
            )}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Category created successfully!</p>}
            <button type="submit">Create</button>
          </form>
        </div>
    </div>
  );
}

export default CreateCategories;