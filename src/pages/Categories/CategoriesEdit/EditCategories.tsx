import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CATEGORY_API_URL } from '../../../constants/constants';
import { fetchData } from '../../../ApiUtils/apiUtils';
import './EditCategories.css'

type Category = {
  id: number;
  name: string;
  image: string;
};

function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  useQuery<Category>(['category', id], async () => {
    const data = await fetchData<Category>(`${CATEGORY_API_URL}/${id}`);
    return data;
  });

  const updateCategoryMutation = useMutation(
    async (categoryData: Partial<Category>) => {
      try {
        await fetch(`${CATEGORY_API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
      } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Error updating category. Please try again.');
      } finally {
        queryClient.invalidateQueries(['category', id]);
        navigate('/categories');
      }
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedCategoryData: Partial<Category> = {
      name: categoryName,
      image: categoryImage,
    };

    updateCategoryMutation.mutate(updatedCategoryData);
  };

  return (
    <div id="edit-category-container">
      <div id="edit-category-form-container">
        <h1 className="edit-category-title">Edit Category</h1>

        <form onSubmit={handleSubmit} id="edit-category-form">
          <label>
            Name: <input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
          </label>
          <br />
          <label>
            Image URL: <input type="text" id="categoryImage" value={categoryImage} onChange={(e) => setCategoryImage(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;