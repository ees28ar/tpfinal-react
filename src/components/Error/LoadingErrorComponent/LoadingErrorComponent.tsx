import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import ErrorPeticion from '../ErrorPeticion/ErrorPeticion';
import './LoadingErrorComponent.css'

type LoadingErrorComponentProps = {
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const LoadingErrorComponent: React.FC<LoadingErrorComponentProps> = ({ isLoading, isError, error }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <CirclesWithBar height={300} width={300} color="orange" />
        <h1>Cargando...</h1>;
      </div>
    );
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return (
      <>
        <div>
          <ErrorPeticion />
        </div>
        <h1>{errorMessage}</h1>
      </>
    );
  }

  return null;
};

export default LoadingErrorComponent;
