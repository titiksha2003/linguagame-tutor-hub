import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StaticBirdLogo from './logo/StaticBirdLogo';

interface WizenkoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  staticOnly?: boolean;
}

const WizenkoLogo = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  staticOnly = false
}: WizenkoLogoProps) => {
  const birdRef = useRef<HTMLDivElement>(null);
  const animationCompleted = useRef(false);

  const sizes = {
    sm: {
      container: 'h-8 w-8',
      eyes: 'h-1.5 w-1.5',
      beak: 'h-2.5 w-2.5',
      wings: 'h-3 w-2.5',
      book: 'h-2 w-2.5',
      glasses: 'h-1 w-3',
      tail: 'h-2 w-1.5',
      spacing: 'space-x-1.5'
    },
    md: {
      container: 'h-10 w-10',
      eyes: 'h-2 w-2',
      beak: 'h-3 w-3',
      wings: 'h-4 w-3',
      book: 'h-3 w-4',
      glasses: 'h-1.5 w-4',
      tail: 'h-2.5 w-2',
      spacing: 'space-x-2'
    },
    lg: {
      container: 'h-16 w-16',
      eyes: 'h-3 w-3',
      beak: 'h-5 w-5',
      wings: 'h-6 w-4.5',
      book: 'h-5 w-6',
      glasses: 'h-2 w-6',
      tail: 'h-4 w-3',
      spacing: 'space-x-3'
    }
  };

  if (staticOnly) {
    const sizeInPixels = size === 'sm' ? 32 : size === 'md' ? 40 : 64;
    
    return (
      <Link to="/" className={`flex items-center space-x-2 group ${className}`}>
        <StaticBirdLogo variant="favicon" size={sizeInPixels} />
        
        {showText && (
          <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-700">
            Wizenko
          </span>
        )}
      </Link>
    );
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    animationCompleted.current = false;
    
    timeout = setTimeout(() => {
      animationCompleted.current = true;
      
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
          className={`${sizes[size].container} rounded-2xl bg-[#6EC5E9] dark:bg-[#5DAED2] flex items-center justify-center relative shadow-md overflow-visible`}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          style={{ 
            borderTopLeftRadius: '60%', 
            borderTopRightRadius: '60%',
            borderBottomLeftRadius: '50%', 
            borderBottomRightRadius: '50%',
          }}
        >
          <motion.div 
            className={`absolute -left-1.5 top-1/2 transform -translate-y-1/3 ${sizes[size].wings} bg-[#9CDBF3] dark:bg-[#7EC3E9]`}
            style={{ 
              borderRadius: '60% 20% 60% 30%',
              transformOrigin: 'right center'
            }}
            animate={{ 
              rotate: [-5, -20, -5],
              scale: [1, 0.95, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.8,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className={`absolute -right-1.5 top-1/2 transform -translate-y-1/3 ${sizes[size].wings} bg-[#9CDBF3] dark:bg-[#7EC3E9]`}
            style={{ 
              borderRadius: '20% 60% 30% 60%',
              transformOrigin: 'left center'
            }}
            animate={{ 
              rotate: [5, 20, 5],
              scale: [1, 0.95, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.8,
              ease: "easeInOut" 
            }}
          />
          
          <motion.div 
            className={`absolute bg-[#9CDBF3] dark:bg-[#7EC3E9] ${sizes[size].tail}`}
            style={{ 
              bottom: '15%',
              right: '-20%',
              borderRadius: '20% 50% 50% 20%',
              transform: 'rotate(20deg)'
            }}
            animate={{ 
              rotate: [20, 35, 20, 5, 20],
              x: [0, 1, 0, -1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut" 
            }}
          />
          
          <motion.div 
            className="absolute flex flex-col items-center justify-center"
            style={{ top: '30%' }}
            animate={{
              y: [0, -2, 0, -2, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            <motion.div 
              className={`absolute ${sizes[size].glasses} h-[0.15rem] bg-amber-900 rounded-full z-10`}
              style={{ top: '45%' }}
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
            
            <div className={`flex ${sizes[size].spacing} relative z-20`}>
              <motion.div 
                className={`${sizes[size].eyes} rounded-full bg-white flex items-center justify-center relative z-0`}
                animate={{ 
                  scaleY: [1, 0.1, 1],
                  transition: {
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    duration: 0.15
                  }
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
                animate={{ 
                  scaleY: [1, 0.1, 1],
                  transition: {
                    repeat: Infinity,
                    repeatDelay: 2.7,
                    duration: 0.15
                  }
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
            </div>
          </motion.div>
          
          <motion.div 
            className={`absolute bg-[#FDBA74] dark:bg-[#F59E0B]`}
            style={{ 
              width: `${size === 'lg' ? '14px' : size === 'md' ? '11px' : '9px'}`,
              height: `${size === 'lg' ? '10px' : size === 'md' ? '8px' : '6px'}`,
              bottom: '40%',
              borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%'
            }}
            animate={{ 
              scaleY: [1, 0.9, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 1.5
            }}
          />
          
          <motion.div 
            className={`absolute ${sizes[size].book} bg-[#FFF7E5] dark:bg-[#FFF0D9] border border-amber-200 dark:border-amber-300 rounded-sm overflow-hidden z-10`}
            style={{
              bottom: `-${size === 'lg' ? '25%' : size === 'md' ? '30%' : '35%'}`,
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
            <motion.div 
              className="absolute inset-0 flex flex-col justify-center items-center"
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
          
          <motion.div 
            className="absolute transform rotate-15 z-30"
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
