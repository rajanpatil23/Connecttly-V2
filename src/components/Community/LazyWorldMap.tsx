import React, { Suspense } from 'react';

// Lazy load the WorldMap component
const WorldMap = React.lazy(() => import('./map').then(module => ({ default: module.WorldMap })));

// Loading skeleton for the WorldMap
const WorldMapSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto">
    <div className="w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2/1] relative bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-lg animate-pulse overflow-hidden">
      {/* Skeleton dots representing map points */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Simulate world map dots with labels */}
          <div className="absolute top-1/4 left-1/4">
            <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/3">
            <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse delay-100"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="h-4 w-20 bg-white/20 rounded animate-pulse delay-100"></div>
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse delay-200"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="h-4 w-14 bg-white/20 rounded animate-pulse delay-200"></div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4">
            <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="h-4 w-12 bg-white/20 rounded animate-pulse delay-300"></div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/3">
            <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse delay-400"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="h-4 w-16 bg-white/20 rounded animate-pulse delay-400"></div>
            </div>
          </div>
          
          {/* Central headquarters point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-red-400/50 rounded-full animate-pulse"></div>
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="h-4 w-20 bg-red-400/20 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Connecting lines skeleton */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <linearGradient id="skeleton-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgb(59 130 246 / 0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M 100 80 Q 200 40 300 120"
              stroke="url(#skeleton-gradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M 300 120 Q 400 60 500 140"
              stroke="url(#skeleton-gradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse delay-100"
            />
          </svg>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-white/60">
          <div className="w-4 h-4 border-2 border-blue-400/50 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm whitespace-nowrap">Loading global network...</span>
        </div>
      </div>
    </div>
  </div>
);

interface LazyWorldMapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  headquarters?: { lat: number; lng: number; label?: string };
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

const LazyWorldMap: React.FC<LazyWorldMapProps> = (props) => {
  return (
    <Suspense fallback={<WorldMapSkeleton />}>
      <WorldMap {...props} />
    </Suspense>
  );
};

export default LazyWorldMap;
