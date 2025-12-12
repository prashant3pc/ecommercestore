export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        
        {/* Brand Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        
        {/* Description Skeleton */}
        <div className="h-3 bg-gray-200 rounded mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
        
        {/* Price & Category Skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Rating & Stock Skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// Grid skeleton for multiple cards
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}