import React from 'react';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from '../ErrorPeticion/ErrorComponent';
import './LoadingErrorComponent.css'

type LoadingErrorComponentProps = {
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const LoadingErrorComponent: React.FC<LoadingErrorComponentProps> = ({ isLoading, isError, error }) => {
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return  <ErrorComponent error={error}/> ;
  }

  return null;
};

export default LoadingErrorComponent;
