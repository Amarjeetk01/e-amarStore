import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="flex flex-nowrap gap-1">$
          <span className="line-through text-sm opacity-80">
            {product.price}
          </span>
          <span className="font-bold">{product.expense}</span>
        </p>
        <HeartFavorite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
