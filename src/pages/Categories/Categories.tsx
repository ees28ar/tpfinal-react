import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchData } from '../../ApiUtils/apiUtils';
import { ERROR_IMAGE_URL, QUERY_KEY_CATEGORIES } from '../../constants/constants';
import LoadingErrorComponent from '../../components/Error/LoadingErrorComponent/LoadingErrorComponent';
import './Categories.css';

type Category = {
  id: number;
  name: string;
  image: string;
};

function Categories() {
  const { data: categories, isLoading, isError, error } = useQuery<Category[]>(QUERY_KEY_CATEGORIES, async () => {
    const data = await fetchData<Category[]>('https://api.escuelajs.co/api/v1/categories');
    return data;
  });

  return (
    <div className="categories-container">
      <h1>Explore Our Categories</h1>
      <p>Browse through our wide range of product categories and discover the perfect items to meet your needs. From electronics to fashion, home decor, and more, we have a diverse selection to cater to your preferences. Start exploring now</p>
      <LoadingErrorComponent isLoading={isLoading} isError={isError} error={error} />
      <div className="categories-list">
        {categories?.map((category: Category) => (
          <Link key={category.id} to={`/products/${category.id}`} className="category-link">
            <div className="category-item">
              <h1>{category.name}</h1>
              {category.image ? (
                <img className="category-image" src={category.image} alt={category.name} onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = ERROR_IMAGE_URL;
                }} />
              ) : (
                <img className="category-image" src={ERROR_IMAGE_URL} alt="Error" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;