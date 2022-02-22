import React from 'react';
import { Card } from '../base';
import Link from 'next/link';

export const ProductCard = ({ image, name, price, slug }) => {
  return (
    <Card>
      <div className="w-[300px]">
        {/* Image Part */}
        <Link href={`/product/${slug}`} passHref>
          <img
            className="w-full cursor-pointer"
            src={image}
            alt="Sunset in the mountains"
          />
        </Link>

        {/* Content Part */}

        <div className="px-6 py-4">
          <Link href={`/product/${slug}`} passHref>
            <div className="font-bold text-l mb-2 cursor-pointer">{name}</div>
          </Link>
          <div className="flex justify-between">
            <div className="text-xl">{price}$</div>
            <button
              style={{
                color: 'black',
                backgroundColor: '#fbbf24',
                borderRadius: '15px',
                padding: '7px',
              }}
            >
              Add to card
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
