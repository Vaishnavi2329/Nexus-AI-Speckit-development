// Smooth scroll behavior implementation
import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    };

    // Add event listener
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
};

// Section navigation utility
export const scrollToSection = (sectionId: string, offset: number = 0) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Get section offset for fixed navbar
export const getSectionOffset = () => {
  const navbar = document.querySelector('nav');
  if (navbar) {
    return navbar.offsetHeight + 20;
  }
  return 80; // Default offset
};
