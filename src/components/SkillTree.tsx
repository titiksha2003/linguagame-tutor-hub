
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skill, getSkillsByLanguage } from '../data/lessons';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { Check, Lock } from 'lucide-react';

interface SkillTreeProps {
  languageId: string;
}

const SkillTree = ({ languageId }: SkillTreeProps) => {
  const { isSkillUnlocked, progress, setCurrentSkill } = useProgress();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // Get skills for this language
    const languageSkills = getSkillsByLanguage(languageId);
    setSkills(languageSkills);
    
    // Set container dimensions
    if (containerRef.current) {
      setContainerDimensions({
        width: containerRef.current.clientWidth,
        height: 600 // Fixed height for skill tree
      });
    }
  }, [languageId]);
  
  const handleSelectSkill = (skill: Skill) => {
    if (!isSkillUnlocked(skill.id)) return;
    
    setCurrentSkill(skill.id);
    navigate(`/course/${languageId}/${skill.id}`);
  };
  
  // Draw connections between skills
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    skills.forEach(skill => {
      // For each skill that this skill unlocks, draw a line
      skill.unlocks.forEach(unlockId => {
        const targetSkill = skills.find(s => s.id === unlockId);
        if (!targetSkill) return;
        
        const start = {
          x: (skill.position.x / 100) * containerDimensions.width,
          y: (skill.position.y / 100) * containerDimensions.height
        };
        
        const end = {
          x: (targetSkill.position.x / 100) * containerDimensions.width,
          y: (targetSkill.position.y / 100) * containerDimensions.height
        };
        
        const isUnlocked = isSkillUnlocked(targetSkill.id);
        const isStartComplete = progress.completedSkills.includes(skill.id);
        
        connections.push(
          <line
            key={`${skill.id}-${targetSkill.id}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={isUnlocked ? (isStartComplete ? "#58CC02" : "#94A3B8") : "#CBD5E1"}
            strokeWidth="4"
            strokeDasharray={isUnlocked ? "none" : "5,5"}
            className="transition-colors duration-500"
          />
        );
      });
    });
    
    return connections;
  };
  
  return (
    <div className="relative w-full overflow-x-hidden" ref={containerRef}>
      <div className="relative w-full h-[600px]">
        <svg className="absolute top-0 left-0 w-full h-full">
          {containerDimensions.width > 0 && renderConnections()}
        </svg>
        
        {skills.map(skill => {
          const isUnlocked = isSkillUnlocked(skill.id);
          const isCompleted = progress.completedSkills.includes(skill.id);
          
          return (
            <motion.div
              key={skill.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${skill.position.x}%`,
                top: `${skill.position.y}%`,
                zIndex: 10
              }}
            >
              <button
                className={`relative flex items-center justify-center w-16 h-16 rounded-full 
                ${isUnlocked 
                  ? isCompleted 
                    ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20 hover:bg-brand-blue/90 shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}
                transition-all duration-200 ${isUnlocked && !isCompleted ? 'hover-scale' : ''}`}
                onClick={() => handleSelectSkill(skill)}
                disabled={!isUnlocked}
              >
                <span className="text-2xl">{skill.icon}</span>
                
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 shadow-md">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80 dark:bg-gray-700/80 rounded-full backdrop-blur-sm">
                    <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </button>
              
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
                <span className={`text-sm font-medium px-2 py-1 rounded-full whitespace-nowrap
                  ${isUnlocked 
                    ? isCompleted 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500'}`}
                >
                  {skill.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillTree;
