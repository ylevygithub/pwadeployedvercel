const MovieCardSkeleton = () => {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <div className="animate-pulse">
          {/* Poster Skeleton */}
          <div className="aspect-[2/3] bg-gray-700" />
          
          {/* Content Skeleton */}
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-gray-800 to-transparent">
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-600 rounded-md mb-2 w-3/4" />
            
            {/* Info Row */}
            <div className="flex items-center justify-between">
              {/* Rating Skeleton */}
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
                <div className="w-8 h-4 bg-gray-600 rounded-md" />
              </div>
              
              {/* Actions Skeleton */}
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
                <div className="w-8 h-8 bg-gray-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovieCardSkeleton;