import React from 'react';
import ErrorPeticion from '../ErrorPeticion/ErrorPeticion';
import '../LoadingComponent/LoadingErrorComponent.css'

type ErrorComponentProps = {
  error: any;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

  return (
    <>
      <div>
        <ErrorPeticion />
      </div>
      <h1>{errorMessage}</h1>
    </>
  );
};

export default ErrorComponent;