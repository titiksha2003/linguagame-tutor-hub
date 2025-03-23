
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface WizenkoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const WizenkoLogo = ({ size = 'md', showText = true }: WizenkoLogoProps) => {
  const sizes = {
    sm: {
      container: 'h-8 w-8',
      eyes: 'h-1.5 w-1.5',
      ears: 'h-2 w-2',
      tail: 'h-3 w-3',
      spacing: 'space-x-1.5'
    },
    md: {
      container: 'h-10 w-10',
      eyes: 'h-2 w-2',
      ears: 'h-2.5 w-2.5',
      tail: 'h-4 w-4',
      spacing: 'space-x-2'
    },
    lg: {
      container: 'h-16 w-16',
      eyes: 'h-3 w-3',
      ears: 'h-4 w-4',
      tail: 'h-6 w-6',
      spacing: 'space-x-3'
    }
  };
  
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <motion.div
          className={`${sizes[size].container} rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center relative shadow-md overflow-visible`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {/* Fox ears */}
          <motion.div 
            className={`absolute -top-2 -left-1 ${sizes[size].ears} rounded-full bg-amber-500`}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className={`absolute -top-2 -right-1 ${sizes[size].ears} rounded-full bg-amber-500`}
            animate={{ rotate: [5, -5, 5] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
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
          
          {/* Nose */}
          <div 
            className="absolute bg-gray-900 rounded-full"
            style={{ 
              width: `${size === 'lg' ? '8px' : size === 'md' ? '6px' : '4px'}`,
              height: `${size === 'lg' ? '6px' : size === 'md' ? '4px' : '3px'}`,
              bottom: `${size === 'lg' ? '30%' : '35%'}` 
            }}
          />
          
          {/* Mouth */}
          <motion.div 
            className="absolute bg-gray-800 rounded-lg"
            style={{ 
              width: `${size === 'lg' ? '10px' : size === 'md' ? '8px' : '6px'}`,
              height: `${size === 'lg' ? '2px' : size === 'md' ? '1.5px' : '1px'}`,
              bottom: '25%' 
            }}
            animate={{ width: ['60%', '40%', '60%'] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2
            }}
          />
          
          {/* Fox tail */}
          <motion.div 
            className={`absolute ${sizes[size].tail} bg-amber-400 rounded-full`}
            style={{ 
              bottom: '-10%',
              right: '-20%'
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
        <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">
          Wizenko
        </span>
      )}
    </Link>
  );
};

export default WizenkoLogo;
