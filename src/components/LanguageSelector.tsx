
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { languages } from "@/data/languages";
import { toast } from "sonner";

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageSelector = ({ isOpen, onClose }: LanguageSelectorProps) => {
  const { user, addLanguage, removeLanguage } = useAuth();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initialize selected languages based on user's current learning languages
  useEffect(() => {
    if (user) {
      const currentlyLearning = user.languages.map(lang => lang.id);
      setSelectedLanguages(currentlyLearning);
    }
  }, [user, isOpen]);
  
  // Filter languages based on search query
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(languageId)) {
        return prev.filter(id => id !== languageId);
      } else {
        return [...prev, languageId];
      }
    });
  };
  
  const handleSave = () => {
    if (!user) return;
    
    // Get current learning languages
    const currentLanguages = user.languages.map(lang => lang.id);
    
    // Find languages to add (in selected but not in current)
    const languagesToAdd = selectedLanguages.filter(id => !currentLanguages.includes(id));
    
    // Find languages to remove (in current but not in selected)
    const languagesToRemove = currentLanguages.filter(id => !selectedLanguages.includes(id));
    
    // Add new languages
    languagesToAdd.forEach(langId => {
      addLanguage(langId, 1, 0);
    });
    
    // Remove languages that were deselected
    languagesToRemove.forEach(langId => {
      removeLanguage(langId);
    });
    
    if (languagesToAdd.length > 0 || languagesToRemove.length > 0) {
      toast.success(`Your learning languages have been updated!`);
    }
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Languages You Want to Learn</DialogTitle>
        </DialogHeader>
        
        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search languages..."
            className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          {filteredLanguages.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {filteredLanguages.map((language) => (
                <div
                  key={language.id}
                  onClick={() => toggleLanguage(language.id)}
                  className={`p-3 flex items-center justify-between rounded-lg cursor-pointer transition-colors ${
                    selectedLanguages.includes(language.id)
                      ? 'bg-primary/10 border border-primary/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{language.flag}</span>
                    <div>
                      <p className="font-medium">{language.name}</p>
                      <p className="text-xs text-gray-500">{language.nativeName}</p>
                    </div>
                  </div>
                  
                  {selectedLanguages.includes(language.id) ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <PlusCircle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No languages found matching "{searchQuery}"
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <div className="text-sm">
            {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector;
