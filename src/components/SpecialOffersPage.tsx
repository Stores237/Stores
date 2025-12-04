import React, { useState, useEffect } from 'react';
import { Clock, Zap, Tag, Star } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface SpecialOffersPageProps {
  products: Product[];
}

export function SpecialOffersPage({ products }: SpecialOffersPageProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
    endDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const specialOffers = products.filter(product => product.isSpecialOffer);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
       <div style={{ backgroundImage: 'url("/Banner Special.png")', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-yellow-300" />
              <h1 className="text-3xl md:text-4xl font-bold"></h1>
              <Zap className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="text-xl mb-6"></p>
            
            {/* Countdown Timer */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-1 mb-4">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Deal ends in:</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="text-sm opacity-80">Days</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-sm opacity-80">Hours</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-sm opacity-80">Minutes</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-sm opacity-80">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers Grid */}
      <div className="container mx-auto px-4 py-8">
        {specialOffers.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No Special Offers Available</h2>
            <p className="text-gray-500">Check back soon for amazing deals!</p>
          </div>
        ) : (
          <>

          {/* Deals Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {(specialOffers.reduce((total, product) => 
                  total + ((product.originalPrice || 0) - product.price), 0
                  ).toLocaleString('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }))}
                </div>
                <div className="text-sm text-red-700">Total Savings Available</div>
              </div>
              <div className="bg-orange-50 border border-primary-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {Math.round(specialOffers.reduce((total, product) => 
                    total + (((product.originalPrice || 0) - product.price) / (product.originalPrice || 1) * 100), 0
                  ) / specialOffers.length)}%
                </div>
                <div className="text-sm text-orange-700">Average Discount</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{specialOffers.length}</div>
                <div className="text-sm text-green-700">Items on Sale</div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {specialOffers.map(product => (
                <div key={product.id} className="relative">
                  <div className="absolute -top-2 -right-2 z-10 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                    DEAL
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}