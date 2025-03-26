
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface WizenkoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const WizenkoLogo = ({ size = 'md', showText = true, className = '' }: WizenkoLogoProps) => {
  const sizes = {
    sm: {
      container: 'h-8 w-8',
      eyes: 'h-1.5 w-1.5',
      beak: 'h-2.5 w-2.5',
      wings: 'h-3 w-3',
      spacing: 'space-x-1.5'
    },
    md: {
      container: 'h-10 w-10',
      eyes: 'h-2 w-2',
      beak: 'h-3 w-3',
      wings: 'h-4 w-4',
      spacing: 'space-x-2'
    },
    lg: {
      container: 'h-16 w-16',
      eyes: 'h-3 w-3',
      beak: 'h-5 w-5',
      wings: 'h-6 w-6',
      spacing: 'space-x-3'
    }
  };
  
  return (
    <Link to="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className="relative">
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
          <div className={`flex ${sizes[size].spacing} items-center justify-center`}>
            {/* Eyes */}
            <motion.div 
              className={`${sizes[size].eyes} rounded-full bg-white flex items-center justify-center`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3
              }}
            >
              <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
            </motion.div>
            <motion.div 
              className={`${sizes[size].eyes} rounded-full bg-white flex items-center justify-center`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3
              }}
            >
              <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
            </motion.div>
          </div>
          
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
          <div className="absolute -top-1 -right-1 transform rotate-15 z-10">
            <div className="w-4 h-2 bg-gray-800 dark:bg-gray-900 rounded-sm relative">
              <div className="absolute -top-1 left-1 w-2 h-2 bg-gray-800 dark:bg-gray-900 rounded-sm"></div>
              <div className="absolute top-1 right-0 w-0 h-0 border-l-2 border-l-transparent border-t-4 border-t-gray-800 dark:border-t-gray-900"></div>
            </div>
          </div>
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
