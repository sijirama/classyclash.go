import { useEffect, useState } from 'react';

function useScreenType() {
  const [screenType, setScreenType] = useState('');

  useEffect(() => {
    const checkScreenType = () => {
      const isMobile = window.innerWidth < 1025; // Maximum width for mobile screens
      setScreenType(isMobile ? 'mobile' : 'laptop');
    };

    checkScreenType(); // Check initial screen type

    const handleResize = () => {
      checkScreenType(); // Check screen type on resize event
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run effect only once on mount

  return screenType;
}

export default useScreenType;
