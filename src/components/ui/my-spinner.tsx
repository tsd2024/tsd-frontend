import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useTheme } from 'next-themes';

const MySpinner = () => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? 'var(--foreground)' : 'var(--primary-foreground)';

  return (
    <div className="flex justify-center items-center">
      <ClipLoader color={color} size={50} />
    </div>
  );
};

export default MySpinner;
