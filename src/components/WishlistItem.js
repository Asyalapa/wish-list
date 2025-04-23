"use client";
import { useState } from "react";
import { Pencil, Gift } from "lucide-react";
import Image from "next/image";
import GiftItemEditable from "@/src/components/GiftItemEditable";
import { useDraft } from "@/src/context/DraftContext";
import { getAgeWord } from "@/src/utils/helpers";

const WishlistItem = ({ wishlistId, celebrant, age, avatar, openModal }) => {
  const { draft, addGiftToList } = useDraft();
  const [isEditing, setIsEditing] = useState(true);
  const [priceFilter, setPriceFilter] = useState("");
  const [sortDirection, setSortDirection] = useState(null);

  const wishlist = draft?.wishlists?.find((w) => w.id === wishlistId) || {
    gifts: []
  };

  const handleAddGift = () => {
    const newGift = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      link: "",
      price: 0,
      photo: ""
    };
    addGiftToList(wishlistId, newGift);
  };

  const filteredGifts = wishlist.gifts.filter(gift => {
    if (!priceFilter) return true;
    switch(priceFilter) {
      case "below500": return gift.price < 500;
      case "500to2000": return gift.price >= 500 && gift.price <= 2000;
      case "2000to3000": return gift.price > 2000 && gift.price <= 3000;
      case "above3000": return gift.price > 3000;
      default: return true;
    }
  });

  const sortedGifts = [...filteredGifts].sort((a, b) => {
    if (!sortDirection) return 0;
    return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
  });

  // if (!wishlistId || !draft) {
  //   return <div className="wishlist-item">Загрузка данных...</div>;
  // }

  return (
    <section className="celebrant wishlist-item">
      <div className="celebrant__info wishlist-item__info">
        <button
          className="button wishlist-item__edit-btn"
          onClick={() => setIsEditing(!isEditing)}
          aria-label="Редактировать список поздравляемого"
          >
          <Pencil size={20} />
        </button>
        <h3 className='celebrant__name wishlist-item__title'>{celebrant}</h3>
        {avatar? (
          <Image
            src={avatar}
            alt={`Аватар ${celebrant}`}
            width={48}
            height={48}
            className="celebrant__avatar wishlist-item__avatar"
          />
        ) : (
          <div className="wishlist-item__avatar-placeholder">
            {celebrant.charAt(0).toUpperCase()}
          </div>
        )}
        {age && (
          <p className="celebrant__age wishlist-item__age">
            {age} {getAgeWord(age)}
          </p>
        )}
      </div>
      <div className='gifts'>
        <div className="controls">
          <select 
            className="filter-select"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Все</option>
            <option value="below500">До ₽500</option>
            <option value="500to2000">₽500 - ₽2000</option>
            <option value="2000to3000">₽2000 - ₽3000</option>
            <option value="above3000">₽3000+</option>
          </select>
          <button 
            className={`sort-button ${sortDirection === "asc" ? "active" : ""}`}
            onClick={() => setSortDirection(sortDirection === "asc" ? null : "asc")}
          >
            ↑
          </button>
          <button 
            className={`sort-button ${sortDirection === "desc" ? "active" : ""}`}
            onClick={() => setSortDirection(sortDirection === "desc" ? null : "desc")}
          >
            ↓
          </button>
        </div>

      <ul className="wishlist-item__gifts">
        {sortedGifts.map((gift) => (
            <li key={gift.id} className="wishlist-item__gift">
              <GiftItemEditable
                gift={gift}
                wishlistId={wishlistId}
                isEditable={isEditing}
                openModal={openModal}
              />
            </li>
        ))}
      </ul>
      {isEditing && (
        <button
          className="button wishlist-item__add-btn"
          onClick={handleAddGift}
          aria-label="Добавить подарок"
        >
          <Gift size={16} />
          <span>Добавить подарок</span>
        </button>
      )}
</div>
    </section>
  );
};

export default WishlistItem;
