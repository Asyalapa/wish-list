"use client";
import React from 'react';
import Image from 'next/image';

export default function GiftItemEditable({ gift, wishlistId, isEditable, openModal }) {
  return (
    <article 
      className="gift" 
      data-price={gift.price}
    >
      {gift.photo && (
        <Image 
          className="gift__photo" 
          src={gift.photo} 
          alt={gift.title}
          width={200}
          height={200}
        />
      )}
      
      <div className="gift__info">
        <div className="gift__info-text">
          <h4 className="gift__title">{gift.title}</h4>
          <p className="gift__description">{gift.description}</p>
          {gift.link && (
            <a 
              className="gift__link" 
              href={gift.link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Похожий товар
            </a>
          )}
        </div>

        {isEditable && (
          <div className="gift__buttons">
            <button
              onClick={() => openModal(gift, wishlistId, false)}
              disabled={gift.isFullyPaid || gift.isSelected}
            >
              Подарить подарок
            </button>
            
            <button
              onClick={() => openModal(gift, wishlistId, true)}
              disabled={gift.isFullyPaid || gift.isSelected}
            >
              Вложиться в подарок
            </button>
          </div>
        )}
      </div>
    </article>
  )
}