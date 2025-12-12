// interface LoadingSpinnerProps {
//   size?: 'small' | 'medium' | 'large';
//   color?: 'blue' | 'gray' | 'white';
//   fullScreen?: boolean;
//   text?: string;
// }

// export default function LoadingSpinner({ 
//   size = 'medium', 
//   color = 'blue',
//   fullScreen = false,
//   text = 'Loading...'
// }: LoadingSpinnerProps) {
//   const sizeClasses = {
//     small: 'w-6 h-6',
//     medium: 'w-12 h-12',
//     large: 'w-16 h-16'
//   };

//   const colorClasses = {
//     blue: 'text-blue-600',
//     gray: 'text-gray-600',
//     white: 'text-white'
//   };

//   const spinner = (
//     <div className="flex flex-col items-center justify-center">
//       <div className="relative">
//         {/* Outer ring */}
//         <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
//         {/* Spinning ring */}
//         <div className={`${sizeClasses[size]} absolute top-0 left-0 border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
//       </div>
//       {text && (
//         <p className={`mt-4 font-medium ${colorClasses[color]}`}>
//           {text}
//         </p>
//       )}
//     </div>
//   );

//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         {spinner}
//       </div>
//     );
//   }

//   return spinner;
// }

// // Alternative: Simple inline spinner
// export function SimpleSpinner() {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//     </div>
//   );
// }

// // Alternative: Product card skeleton loader
// export function ProductCardSkeleton() {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
//       <div className="h-48 w-full bg-gray-200"></div>
//       <div className="p-4">
//         <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//         <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
//         <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
//         <div className="flex justify-between items-center">
//           <div className="h-8 bg-gray-200 rounded w-20"></div>
//           <div className="h-6 bg-gray-200 rounded w-16"></div>
//         </div>
//         <div className="h-10 bg-gray-200 rounded mt-4"></div>
//       </div>
//     </div>
//   );
// }

// // Alternative: Grid skeleton loader
// export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {Array.from({ length: count }).map((_, index) => (
//         <ProductCardSkeleton key={index} />
//       ))}
//     </div>
//   );
// }