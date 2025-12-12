import Image from "next/image";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.thumbnail || product.images?.[0] || "/placeholder.jpg";

  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div
      className="bg-background rounded-lg shadow-md overflow-hidden 
      hover:shadow-purple-400 hover:border-purple-500 border border-purple-200 
      transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] min-h-[200px] bg-accent overflow-hidden group">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          unoptimized={process.env.NODE_ENV === "development"}
        />

        {/* Discount */}
        {product.discountPercentage && (
          <div className="absolute top-2 right-2 bg-highlight text-background 
            px-2 py-1 rounded-md text-sm font-bold shadow-lg">
            -{product.discountPercentage.toFixed(0)}%
          </div>
        )}

        {/* Stock */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-accent text-foreground 
            px-2 py-1 rounded-md text-xs font-medium">
            Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 left-2 bg-gray-400 text-white 
            px-2 py-1 rounded-md text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground truncate flex-1 mr-2">
            {product.title}
          </h3>

          {product.brand && (
            <span className="text-xs font-medium text-foreground bg-accent 
              px-2 py-1 rounded whitespace-nowrap">
              {product.brand}
            </span>
          )}
        </div>

        <p className="text-foreground text-sm mt-1 line-clamp-2 min-h-10">
          {product.description}
        </p>

        <span className="text-xs font-medium text-foreground bg-accent 
          px-2 py-1 rounded mt-2 inline-block">
          {product.category}
        </span>

        <div className="mt-4 flex items-center">
          <span className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="ml-2 text-sm text-accent line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center text-sm text-foreground">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{product.rating.toFixed(1)}</span>
          <span className="mx-1">•</span>
          <span>{product.stock} in stock</span>
        </div>

        <button
          className={`w-full mt-4 px-4 py-2 rounded-md transition-colors ${
            product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-accent text-background hover:bg-highlight"
          }`}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
