// Favourite.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/user/cartSlice';
import { Link } from 'react-router-dom';

const Favourite = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.cart);

  const handleRemoveFromFavourites = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Favourite Items</h2>
      {favourites.map((item) => (
        <div key={item._id} className="flex flex-row gap-4  border p-4 mb-8 items-center justify-center">
          <Link to={`/listing/${item._id}`}>
            {item.imageUrls && item.imageUrls.length > 0 && (
              <img
                src={item.imageUrls[0]} // Display the first image from the array
                alt={item.name}
                className="w-32 h-24 object-cover rounded-lg mb-4" // Adjust size and shape as needed
              />
            )}
          </Link>

          {/* Item details */}
          <div className="text-inline ">
            <Link to={`/listing/${item._id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:underline">{item.name}</h3>
            </Link>
            <p>{item.description}</p>
            <p>Regular Price: {item.regularPrice}</p>
            <p>Discount Price: {item.discountPrice}</p>

            {/* Add more details as needed */}
            <button
              onClick={() => handleRemoveFromFavourites(item._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favourite;
