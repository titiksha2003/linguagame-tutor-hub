
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface WizenkoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const WizenkoLogo = ({ size = 'md', showText = true, className = '' }: WizenkoLogoProps) => {
  const birdRef = useRef<HTMLDivElement>(null);
  const animationCompleted = useRef(false);

  const sizes = {
    sm: {
      container: 'h-8 w-8',
      eyes: 'h-1.5 w-1.5',
      beak: 'h-2.5 w-2.5',
      wings: 'h-3 w-3',
      book: 'h-2 w-2.5',
      glasses: 'h-1 w-3',
      spacing: 'space-x-1.5'
    },
    md: {
      container: 'h-10 w-10',
      eyes: 'h-2 w-2',
      beak: 'h-3 w-3',
      wings: 'h-4 w-4',
      book: 'h-3 w-4',
      glasses: 'h-1.5 w-4',
      spacing: 'space-x-2'
    },
    lg: {
      container: 'h-16 w-16',
      eyes: 'h-3 w-3',
      beak: 'h-5 w-5',
      wings: 'h-6 w-6',
      book: 'h-5 w-6',
      glasses: 'h-2 w-6',
      spacing: 'space-x-3'
    }
  };

  // Pause animation after one loop for better performance
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Reset animation state on component mount
    animationCompleted.current = false;
    
    // We'll pause animation after ~5 seconds (one loop)
    timeout = setTimeout(() => {
      animationCompleted.current = true;
      
      // If we have access to the element, we can add a class to indicate animation completed
      if (birdRef.current) {
        birdRef.current.classList.add('animation-paused');
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <Link to="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className="relative" ref={birdRef}>
        <motion.div
          className={`${sizes[size].container} rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center relative shadow-md overflow-visible`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {/* Bird wings */}
          <motion.div 
            className={`absolute -left-2 top-1/2 transform -translate-y-1/2 ${sizes[size].wings} rounded-full bg-sky-300`}
            animate={{ 
              rotate: [-5, -25, -5],
              scale: [1, 0.95, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className={`absolute -right-2 top-1/2 transform -translate-y-1/2 ${sizes[size].wings} rounded-full bg-sky-300`}
            animate={{ 
              rotate: [5, 25, 5],
              scale: [1, 0.95, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          />
          
          {/* Face */}
          <motion.div 
            className={`flex ${sizes[size].spacing} items-center justify-center`}
            animate={{
              y: [0, -2, 0, -2, 0] // Nodding motion
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            {/* Glasses */}
            <motion.div 
              className={`absolute ${size === 'sm' ? 'top-[35%]' : 'top-[36%]'} ${sizes[size].glasses} h-[0.15rem] bg-amber-900 rounded-full z-10`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ 
                opacity: 1,
                y: 0
              }}
              transition={{ 
                delay: 0.5,
                duration: 0.5
              }}
            />
            
            {/* Eyes with glasses */}
            <motion.div 
              className={`${sizes[size].eyes} rounded-full bg-white flex items-center justify-center relative z-0`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3
              }}
            >
              <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              <motion.div 
                className="absolute inset-0 border-2 border-amber-900 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
            
            <motion.div 
              className={`${sizes[size].eyes} rounded-full bg-white flex items-center justify-center relative z-0`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3
              }}
            >
              <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              <motion.div 
                className="absolute inset-0 border-2 border-amber-900 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Beak */}
          <motion.div 
            className={`absolute bg-amber-500 rotate-45`}
            style={{ 
              width: `${size === 'lg' ? '12px' : size === 'md' ? '10px' : '8px'}`,
              height: `${size === 'lg' ? '10px' : size === 'md' ? '8px' : '6px'}`,
              bottom: '30%',
              borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%'
            }}
            animate={{ 
              scaleY: [1, 0.9, 1],
              rotate: [45, 45, 45]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 1.5
            }}
          />
          
          {/* Book */}
          <motion.div 
            className={`absolute ${sizes[size].book} bg-blue-100 border border-blue-300 rounded-sm overflow-hidden`}
            style={{
              bottom: `-${size === 'lg' ? '20%' : size === 'md' ? '25%' : '30%'}`,
              zIndex: -1,
              transformOrigin: 'center top'
            }}
            initial={{ rotateX: 70, y: 10, opacity: 0 }}
            animate={{ 
              rotateX: [70, 0, 10, 0],
              y: [10, 0],
              opacity: [0, 1]
            }}
            transition={{ 
              duration: 1.5,
              delay: 0.7,
              times: [0, 0.5, 0.75, 1]
            }}
          >
            {/* Book pages */}
            <motion.div 
              className="absolute inset-0 flex justify-center items-center"
              animate={{
                background: ['linear-gradient(180deg, #E5E7EB 0%, #F3F4F6 100%)', 'linear-gradient(180deg, #DBEAFE 0%, #EFF6FF 100%)']
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse"
              }}
            >
              <div className={`w-[70%] h-[1px] bg-gray-400 ${size === 'sm' ? 'mb-0.5' : 'mb-1'}`}></div>
              <div className={`w-[70%] h-[1px] bg-gray-400 ${size === 'sm' ? 'mt-0.5' : 'mt-1'}`}></div>
            </motion.div>
          </motion.div>
          
          {/* Bird tail */}
          <motion.div 
            className={`absolute bg-sky-200`}
            style={{ 
              width: `${size === 'lg' ? '10px' : size === 'md' ? '8px' : '6px'}`,
              height: `${size === 'lg' ? '6px' : size === 'md' ? '5px' : '4px'}`,
              bottom: '10%',
              right: '-15%',
              borderRadius: '0 50% 50% 0'
            }}
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
              x: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
          />
          
          {/* Graduation cap */}
          <motion.div 
            className="absolute transform rotate-15 z-10"
            style={{
              top: `-${size === 'lg' ? '20%' : size === 'md' ? '25%' : '30%'}`,
              right: `-${size === 'lg' ? '10%' : size === 'md' ? '15%' : '20%'}`
            }}
          >
            <motion.div 
              className={`${size === 'lg' ? 'w-4 h-2' : size === 'md' ? 'w-3 h-1.5' : 'w-2.5 h-1'} bg-gray-800 dark:bg-gray-900 rounded-sm relative`}
              initial={{ rotate: -20, y: -5, opacity: 0 }}
              animate={{
                rotate: [0, 5, 0, 5, 0],
                y: 0,
                opacity: 1
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                opacity: { duration: 0.2 },
                rotate: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  repeatType: "mirror"
                }
              }}
            >
              <div className={`absolute -top-1 left-1 ${size === 'lg' ? 'w-2 h-2' : size === 'md' ? 'w-1.5 h-1.5' : 'w-1 h-1'} bg-gray-800 dark:bg-gray-900 rounded-sm`}></div>
              <div className={`absolute top-1 right-0 w-0 h-0 border-l-2 border-l-transparent border-t-4 border-t-gray-800 dark:border-t-gray-900`}></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {showText && (
        <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-700">
          Wizenko
        </span>
      )}
    </Link>
  );
};

export default WizenkoLogo;
