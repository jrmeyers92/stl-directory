"use client";

import { useImageCache } from '@/hooks/useImageCache';
import { createContext, useContext, ReactNode } from 'react';

interface ImageCacheContextType {
  preloadImage: (url: string) => Promise<void>;
  preloadImages: (urls: string[]) => Promise<void>;
  getStats: () => any;
  clear: () => void;
  getCacheSize: () => number;
  getCacheEntries: () => number;
}

const ImageCacheContext = createContext<ImageCacheContextType | null>(null);

interface ImageCacheProviderProps {
  children: ReactNode;
  preloadImages?: string[];
  enableServiceWorker?: boolean;
}

export function ImageCacheProvider({ 
  children, 
  preloadImages = [],
  enableServiceWorker = true 
}: ImageCacheProviderProps) {
  const cacheUtils = useImageCache({
    preloadImages,
    enableServiceWorker,
    maintenanceInterval: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <ImageCacheContext.Provider value={cacheUtils}>
      {children}
    </ImageCacheContext.Provider>
  );
}

export function useImageCacheContext() {
  const context = useContext(ImageCacheContext);
  if (!context) {
    throw new Error('useImageCacheContext must be used within an ImageCacheProvider');
  }
  return context;
}