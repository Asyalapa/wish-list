"use client";
import { useState } from 'react';
import AuthButton from './AuthButton';
import Image from 'next/image';
import logoImg from '@/public/images/gift.webp';


export default function Header({ 
  isWelcomePage = false, 
  isLists = false, 
  showFullHeader = true 
  }) {

  const [isChecked, setIsChecked] = useState(false);

  return (
    <header className="header">
      <div className="header__content">
        <Image
          src={ logoImg }
          alt="Логотип приложения 'Список пожеланий'"
          className="header__logo"
          width={50}
        />

        {showFullHeader && !isWelcomePage && (
          <>
            <h1 className="header__title">Список пожеланий</h1>
            {isLists && (
              <div className="header__toggle">
                <label className="toggle">
                  <input 
                    className="toggle__input" 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)} 
                  />
                  <span className="toggle__slider"></span>
                </label>
              </div>
            )}
          </>
        )}
        
        <nav className="header__nav">
          <AuthButton variant="login" />
        </nav>
      </div>
    </header>
  );
}