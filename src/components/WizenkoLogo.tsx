
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
      spacing: 'space-x-1.5'
    },
    md: {
      container: 'h-10 w-10',
      eyes: 'h-2 w-2',
      spacing: 'space-x-2'
    },
    lg: {
      container: 'h-16 w-16',
      eyes: 'h-3 w-3',
      spacing: 'space-x-3'
    }
  };
  
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <motion.div
          className={`${sizes[size].container} rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center relative shadow-md`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {/* Face */}
          <div className={`flex ${sizes[size].spacing} items-center justify-center`}>
            {/* Eyes */}
            <motion.div 
              className={`${sizes[size].eyes} rounded-full bg-white`}
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2,
                delay: 1
              }}
            />
            <motion.div 
              className={`${sizes[size].eyes} rounded-full bg-white`}
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2,
                delay: 1
              }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className={`absolute w-3/5 h-0.5 bg-white rounded-lg`}
            style={{ bottom: '30%' }}
            initial={{ width: '30%' }}
            animate={{ width: ['30%', '60%', '30%'] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2,
              delay: 1
            }}
          />
          
          {/* Graduation cap */}
          <div className="absolute -top-1 -right-1 transform rotate-15">
            <div className="w-4 h-2 bg-gray-800 dark:bg-gray-900 rounded-sm relative">
              <div className="absolute -top-1 left-1 w-2 h-2 bg-gray-800 dark:bg-gray-900 rounded-sm"></div>
              <div className="absolute top-1 right-0 w-0 h-0 border-l-2 border-l-transparent border-t-4 border-t-gray-800 dark:border-t-gray-900"></div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {showText && (
        <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Wizenko
        </span>
      )}
    </Link>
  );
};

export default WizenkoLogo;
