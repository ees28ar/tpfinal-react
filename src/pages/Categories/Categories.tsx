import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { fetchData, useAdminCheck } from '../../ApiUtils/apiUtils';
import { ERROR_IMAGE_URL, QUERY_KEY_CATEGORIES, CATEGORY_API_URL } from '../../constants/constants';
import LoadingErrorComponent from '../../components/Error/LoadingComponent/LoadingErrorComponent';
import './Categories.css';

type Category = {
  id: number;
  name: string;
  image: string;
};

function Categories() {
  const isAdmin = useAdminCheck();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categories, isLoading, isError, error } = useQuery<Category[]>(QUERY_KEY_CATEGORIES, async () => {
    const data = await fetchData<Category[]>(CATEGORY_API_URL);
    return data;
  });

  const deleteCategoryMutation = useMutation(
    async (categoryId: number) => {
      try {
        await fetch(`${CATEGORY_API_URL}/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error deleting category:', error);
        throw new Error('Error deleting category. Please try again.');
      }
    },
    {
        onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY_CATEGORIES);
      },
    
      onError: (error: Error) => {
        console.error('Error deleting category:', error);
      },
    }
  );

  const handleDeleteCategory = async (categoryId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategoryMutation.mutateAsync(categoryId);
        navigate('/categories');
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleViewCategory = (categoryId: number) => {
    navigate(`/products?categoryId=${categoryId}`);
  };

  return (
    <div className="categories-container">
      <h1>Explore Our Categories</h1>
      <p>Browse through our wide range of product categories and discover the perfect items to meet your needs. From electronics to fashion, home decor, and more, we have a diverse selection to cater to your preferences. Start exploring now</p>
      <LoadingErrorComponent isLoading={isLoading} isError={isError} error={error} />
      <div className="categories-list">
        {categories?.map((category: Category) => (
          <div key={category.id} className="category-item">
            <h1>{category.name}</h1>
            {category.image ? (
              <img
                className="category-image"
                src={category.image}
                alt={category.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = ERROR_IMAGE_URL;
                }}
              />
            ) : (
              <img className="category-image" src={ERROR_IMAGE_URL} alt="Error" />
            )}
            <button type="button" onClick={() => handleViewCategory(category.id)}>
              View Category
            </button>
            {/* Muestra los botones eliminar y editar solo si el perfil del usuario es administrador */}
            {isAdmin && (
              <div>
                <button>
                  <Link to={`/categories/edit/${category.id}`} className="edit-category-link">
                    Editar
                  </Link>
                </button>
                <button type="button" onClick={(e) => handleDeleteCategory(category.id, e)}>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;