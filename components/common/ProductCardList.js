import { ProductCard } from '.';

export const ProductCardList = ({ products }) => {
  return (
    <div className="flex container space-x-3">
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => {
          return (
            <div key={product.image}>
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                slug={product.slug}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
