import { useEffect } from 'react';
const DisableNumInputScroll = () => {
   const handleWheel = (event) => {
     const { type } = event.target;
     if(type === 'number'){
       event.preventDefault();
     }
   }
   useEffect(() => {
      document.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        document.removeEventListener('wheel', handleWheel);
      };
    }, []);

   return null;
};

export default DisableNumInputScroll;