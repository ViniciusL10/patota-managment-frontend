// Loading.tsx
import React from 'react';

interface Props {
  loading: boolean;
}

function Loading({loading}: Props) {
  if (!loading) return null;

  return (
    <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
    </div>
  );
}

export default Loading;
