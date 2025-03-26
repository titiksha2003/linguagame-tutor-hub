
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Globe, Sparkles } from 'lucide-react';
import { languages } from '../data/languages';
import Header from '../components/Header';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
          
          <div className="absolute w-full h-full -z-10 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400 rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-10 md:mb-0"
              >
                <div className="inline-block mb-3 bg-brand-blue/10 px-3 py-1 rounded-full">
                  <p className="text-sm font-medium text-brand-blue flex items-center">
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    The fun way to learn a language
                  </p>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-gray-900 dark:text-white mb-4">
                  Learn a new language with{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-green-600">
                    Wizenko
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                  Fun, effective, and 100% free language learning through gamified lessons, intelligent feedback, and a supportive community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="font-medium text-base px-6 button-shadow"
                    onClick={() => navigate('/courses')}
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="font-medium text-base"
                    onClick={() => navigate('/login')}
                  >
                    Log in
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:w-1/2 flex justify-center"
              >
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-green-500 rounded-2xl transform rotate-3 scale-105 opacity-20 blur-xl" />
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                      <Globe className="h-8 w-8 text-brand-blue mr-3" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Choose a language
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {languages.slice(0, 5).map((language, i) => (
                        <div 
                          key={language.id}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                          onClick={() => navigate(`/course/${language.id}`)}
                        >
                          <span className="text-2xl mr-3">{language.flag}</span>
                          <div className="mr-auto">
                            <p className="font-medium text-gray-900 dark:text-white">{language.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{language.nativeName}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${i === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                          >
                            {i === 0 ? 'Popular' : language.difficulty}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 text-brand-blue"
                      onClick={() => navigate('/courses')}
                    >
                      See all {languages.length} languages
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
                Why learn with Wizenko?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our proven approach makes language learning engaging and effective for millions of users worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400"><Sparkles className="h-6 w-6" /></div>,
                  title: "Fun, gamified learning",
                  description: "Learn through interactive lessons, earn XP, and track daily streaks to stay motivated."
                },
                {
                  icon: <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400"><Check className="h-6 w-6" /></div>,
                  title: "Science-backed methods",
                  description: "Our approach uses spaced repetition and adaptive learning to maximize your retention."
                },
                {
                  icon: <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600 dark:text-amber-400"><Globe className="h-6 w-6" /></div>,
                  title: "9 languages and growing",
                  description: "From Spanish to Japanese, choose from a diverse range of languages and learning paths."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover-scale"
                >
                  {feature.icon}
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-gradient-to-br from-brand-blue to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  Ready to start your language journey?
                </h2>
                <p className="text-white/80 text-lg max-w-xl">
                  Join over 50 million learners worldwide and start your free language lessons today.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  variant="secondary"
                  className="font-medium bg-white text-brand-blue hover:bg-white/90 button-shadow"
                  onClick={() => navigate('/signup')}
                >
                  Sign up – it's free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-brand-blue mr-2" />
              <span className="font-display font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-green-600">
                Wizenko
              </span>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Wizenko. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
