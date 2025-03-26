
import React from 'react';
import { cn } from '@/lib/utils';

interface StaticBirdLogoProps {
  variant: 'favicon' | 'loading' | 'social';
  size?: number;
  className?: string;
}

/**
 * Static bird logo for various use cases like favicon, loading screens, and social media
 */
const StaticBirdLogo = ({ variant, size = 64, className }: StaticBirdLogoProps) => {
  // Base styles that all variants share
  const baseStyles = {
    width: `${size}px`,
    height: `${size}px`,
  };
  
  // Favicon variant - simplified bird only
  if (variant === 'favicon') {
    return (
      <div 
        className={cn("relative flex items-center justify-center", className)} 
        style={baseStyles}
      >
        {/* Bird body - more oval shaped than circular */}
        <div 
          className="w-full h-full bg-[#6EC5E9] dark:bg-[#5DAED2] rounded-2xl relative shadow-sm"
          style={{ 
            borderTopLeftRadius: '60%', 
            borderTopRightRadius: '60%',
            borderBottomLeftRadius: '50%', 
            borderBottomRightRadius: '50%',
          }}
        >
          {/* Bird wings */}
          <div 
            className="absolute -left-1 top-1/2 transform -translate-y-1/3 h-1/3 w-1/4 bg-[#9CDBF3] dark:bg-[#7EC3E9]"
            style={{ borderRadius: '60% 20% 60% 30%' }}
          />
          <div 
            className="absolute -right-1 top-1/2 transform -translate-y-1/3 h-1/3 w-1/4 bg-[#9CDBF3] dark:bg-[#7EC3E9]"
            style={{ borderRadius: '20% 60% 30% 60%' }}
          />
          
          {/* Bird tail */}
          <div 
            className="absolute bg-[#9CDBF3] dark:bg-[#7EC3E9] h-1/4 w-1/5"
            style={{ 
              bottom: '15%',
              right: '-15%',
              borderRadius: '20% 50% 50% 20%',
              transform: 'rotate(20deg)'
            }}
          />
          
          {/* Bird face - static position */}
          <div 
            className="absolute top-[40%] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            {/* Eyes */}
            <div className="flex space-x-1.5 mb-1">
              <div className="h-[15%] w-[15%] min-h-1 min-w-1 rounded-full bg-white flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              </div>
              <div className="h-[15%] w-[15%] min-h-1 min-w-1 rounded-full bg-white flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              </div>
            </div>
            
            {/* Beak */}
            <div 
              className="bg-[#FDBA74] dark:bg-[#F59E0B] h-[10%] w-[20%] min-h-1"
              style={{ 
                borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%'
              }}
            />
          </div>
          
          {/* Graduation cap - simplified for favicon */}
          <div className="absolute top-[-10%] right-[-5%] w-[20%] h-[10%] bg-gray-800 dark:bg-gray-900 rounded-sm" />
        </div>
      </div>
    );
  }
  
  // Loading screen variant - bird with book
  if (variant === 'loading') {
    return (
      <div 
        className={cn("relative flex items-center justify-center", className)} 
        style={baseStyles}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#6EC5E9] to-[#FEEBCB] opacity-20" />
        
        {/* Bird body */}
        <div 
          className="w-[70%] h-[70%] bg-[#6EC5E9] dark:bg-[#5DAED2] rounded-2xl relative shadow-md"
          style={{ 
            borderTopLeftRadius: '60%', 
            borderTopRightRadius: '60%',
            borderBottomLeftRadius: '50%', 
            borderBottomRightRadius: '50%',
          }}
        >
          {/* Bird wings */}
          <div 
            className="absolute -left-2 top-1/2 transform -translate-y-1/3 h-1/3 w-1/4 bg-[#9CDBF3] dark:bg-[#7EC3E9]"
            style={{ borderRadius: '60% 20% 60% 30%' }}
          />
          <div 
            className="absolute -right-2 top-1/2 transform -translate-y-1/3 h-1/3 w-1/4 bg-[#9CDBF3] dark:bg-[#7EC3E9]"
            style={{ borderRadius: '20% 60% 30% 60%' }}
          />
          
          {/* Bird tail */}
          <div 
            className="absolute bg-[#9CDBF3] dark:bg-[#7EC3E9] h-1/4 w-1/5"
            style={{ 
              bottom: '15%',
              right: '-15%',
              borderRadius: '20% 50% 50% 20%',
              transform: 'rotate(20deg)'
            }}
          />
          
          {/* Bird face */}
          <div 
            className="absolute top-[40%] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            {/* Eyes */}
            <div className="flex space-x-2 mb-1">
              <div className="h-[15%] w-[15%] min-h-2 min-w-2 rounded-full bg-white flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              </div>
              <div className="h-[15%] w-[15%] min-h-2 min-w-2 rounded-full bg-white flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              </div>
            </div>
            
            {/* Beak */}
            <div 
              className="bg-[#FDBA74] dark:bg-[#F59E0B] h-[10%] w-[25%] min-h-2"
              style={{ 
                borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%'
              }}
            />
          </div>
          
          {/* Graduation cap */}
          <div className="absolute top-[-10%] right-[-5%]">
            <div className="w-[20%] h-[10%] min-w-3 min-h-1.5 bg-gray-800 dark:bg-gray-900 rounded-sm relative">
              <div className="absolute -top-1 left-1 w-[50%] h-[100%] bg-gray-800 dark:bg-gray-900 rounded-sm" />
            </div>
          </div>
        </div>
        
        {/* Book under the bird */}
        <div 
          className="absolute bottom-[10%] w-[50%] h-[20%] bg-[#FFF7E5] dark:bg-[#FFF0D9] border border-amber-200 dark:border-amber-300 rounded-sm overflow-hidden shadow-md"
        >
          {/* Book pages */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-50">
            <div className="w-[70%] h-[1px] bg-gray-400 mb-1" />
            <div className="w-[70%] h-[1px] bg-gray-400 mt-1" />
          </div>
        </div>
        
        {/* Optional text */}
        <div className="absolute bottom-[-15%] text-center text-xs font-medium text-gray-600 dark:text-gray-300">
          Learning with Joy!
        </div>
      </div>
    );
  }
  
  // Social media variant - full scene with bird on book
  if (variant === 'social') {
    return (
      <div 
        className={cn("relative flex items-center justify-center overflow-hidden rounded-lg bg-[#F7FAFC]", className)} 
        style={{
          width: size > 0 ? `${size}px` : '100%',
          height: size > 0 ? `${size * 0.525}px` : 'auto', // 1200x630 aspect ratio
          aspectRatio: '1200/630'
        }}
      >
        {/* Sky background with clouds */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-blue-50" />
        
        {/* Sun */}
        <div className="absolute top-[15%] right-[25%] w-[15%] h-[15%] rounded-full bg-yellow-200 opacity-80" />
        
        {/* Clouds */}
        <div className="absolute top-[10%] left-[10%] w-[20%] h-[10%] rounded-full bg-white opacity-70" />
        <div className="absolute top-[15%] left-[20%] w-[15%] h-[7%] rounded-full bg-white opacity-70" />
        <div className="absolute top-[12%] left-[30%] w-[10%] h-[5%] rounded-full bg-white opacity-70" />
        
        <div className="absolute top-[20%] right-[15%] w-[25%] h-[12%] rounded-full bg-white opacity-70" />
        <div className="absolute top-[25%] right-[30%] w-[15%] h-[7%] rounded-full bg-white opacity-70" />
        
        {/* Branch */}
        <div className="absolute top-[50%] left-[10%] w-[80%] h-[3%] rounded-full bg-amber-800" />
        
        {/* Open book */}
        <div className="absolute top-[42%] left-[50%] transform -translate-x-1/2 w-[30%] h-[16%] flex">
          {/* Left page */}
          <div className="w-1/2 h-full bg-[#FFF7E5] border border-amber-200 shadow-md transform rotate-[-10deg] origin-right rounded-l-md" />
          {/* Right page */}
          <div className="w-1/2 h-full bg-[#FFF7E5] border border-amber-200 shadow-md transform rotate-[10deg] origin-left rounded-r-md" />
        </div>
        
        {/* Bird sitting on book */}
        <div 
          className="absolute top-[32%] left-[50%] transform -translate-x-1/2 w-[20%] h-[20%] bg-[#6EC5E9] rounded-2xl"
          style={{ 
            borderTopLeftRadius: '60%', 
            borderTopRightRadius: '60%',
            borderBottomLeftRadius: '50%', 
            borderBottomRightRadius: '50%',
          }}
        >
          {/* Bird wings */}
          <div 
            className="absolute -left-2 top-1/2 transform -translate-y-1/3 h-1/3 w-1/4 bg-[#9CDBF3]"
            style={{ borderRadius: '60% 20% 60% 30%' }}
          />
          <div 
            className="absolute -right-2 top-1/2 transform -translate-y-1/3 h-1/3 w-1/4 bg-[#9CDBF3]"
            style={{ borderRadius: '20% 60% 30% 60%' }}
          />
          
          {/* Bird tail */}
          <div 
            className="absolute bg-[#9CDBF3] h-1/4 w-1/5"
            style={{ 
              bottom: '15%',
              right: '-15%',
              borderRadius: '20% 50% 50% 20%',
              transform: 'rotate(20deg)'
            }}
          />
          
          {/* Bird face */}
          <div 
            className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -rotate-12 flex flex-col items-center"
          >
            {/* Eyes */}
            <div className="flex space-x-2 mb-1">
              <div className="h-[15%] w-[15%] min-h-2 min-w-2 rounded-full bg-white flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              </div>
              <div className="h-[15%] w-[15%] min-h-2 min-w-2 rounded-full bg-white flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full bg-gray-900" />
              </div>
            </div>
            
            {/* Beak */}
            <div 
              className="bg-[#FDBA74] h-[10%] w-[25%] min-h-2"
              style={{ 
                borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%'
              }}
            />
          </div>
          
          {/* Graduation cap */}
          <div className="absolute top-[-10%] right-[-5%]">
            <div className="w-[20%] h-[10%] min-w-3 min-h-1.5 bg-gray-800 rounded-sm relative">
              <div className="absolute -top-1 left-1 w-[50%] h-[100%] bg-gray-800 rounded-sm" />
            </div>
          </div>
        </div>
        
        {/* Floating letters */}
        <div className="absolute top-[35%] left-[38%] text-lg font-bold text-blue-600 rotate-[-15deg]">A</div>
        <div className="absolute top-[30%] left-[58%] text-lg font-bold text-green-600 rotate-[10deg]">B</div>
        <div className="absolute top-[38%] left-[62%] text-lg font-bold text-amber-600 rotate-[15deg]">C</div>
        
        {/* Text */}
        <div className="absolute bottom-[15%] left-0 w-full text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-display mb-2">
            Language Learning Made Fun!
          </h2>
        </div>
      </div>
    );
  }
  
  return null;
};

export default StaticBirdLogo;
