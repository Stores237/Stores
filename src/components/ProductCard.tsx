import React, { useState } from 'react';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  // Create multiple image views for demonstration (in real app, this would come from product data)
  const productImages = [
    product.image,

  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleBuyNow = () => {
    const message = `Hi! I'm interested in purchasing: ${product.name} - XAF${product.price}`;
    const whatsappUrl = `https://wa.me/237659802679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const itemQuantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative group">
        <img
          src={productImages[currentImageIndex]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Image Navigation */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-primary-500' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {product.isSpecialOffer && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            Limited time deal
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-semibold">
              Currently unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-primary-600 cursor-pointer">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex text-primary-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-blue-600 ml-2 hover:text-primary-600 cursor-pointer">(2,847)</span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-gray-600">XAF</span>
            <span className="text-2xl font-medium text-gray-900">
              {product.price.toLocaleString('fr-CM', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 })}
            </span>
            {product.isSpecialOffer && product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                XAF{product.originalPrice}
              </span>
            )}
          </div>
          {product.isSpecialOffer && (
            <div className="text-xs text-red-600 font-medium">
              Save {((product.originalPrice || 0) - product.price).toLocaleString('fr-CM', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 })}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-600 mb-3">
          FREE delivery <span className="font-bold">On 2 Items Purchase</span>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              product.inStock
                ? 'bg-orange-500 hover:bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Buy Now
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-500">
          {product.category}
        </div>
      </div>
    </div>
  );
}