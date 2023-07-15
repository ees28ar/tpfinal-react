import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import './LoadingErrorComponent.css'

const LoadingComponent: React.FC = () => {
  return (
    <div className="loading-container">
      <CirclesWithBar height={300} width={300} color="#5E1D0B" />
      <h1>Cargando...</h1>;
    </div>
  );
};

export default LoadingComponent;