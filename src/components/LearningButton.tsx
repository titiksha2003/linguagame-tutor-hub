
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";

const LearningButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={openModal}
      >
        <BookOpen className="h-4 w-4" />
        <span>
          {user && user.languages.length > 0 
            ? `Learning (${user.languages.length})` 
            : "Start Learning"}
        </span>
      </Button>
      
      <LanguageSelector isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LearningButton;
