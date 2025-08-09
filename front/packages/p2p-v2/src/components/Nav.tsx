'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { BsHouseDoor, BsChatText, BsPersonGear } from 'react-icons/bs';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <div className="lg-only grid grid-flow-row auto-rows-[50px]">
        <NavItem href="/feed" active={pathname === '/feed'}>
          <BsHouseDoor className="text-p2p-18" />
          Feed
        </NavItem>
        <NavItem href="/messenger" active={pathname === '/messenger'}>
          <BsChatText className="text-p2p-18" />
          Message
        </NavItem>
        <NavItem href="/mypage" active={pathname === '/mypage'}>
          <BsPersonGear className="text-p2p-18" />
          My Page
        </NavItem>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  children: ReactNode;
  active: boolean;
}

const NavItem = ({ href, children, active }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center text-p2p-16 rounded-[12px] gap-x-[10px] pl-[16px]',
        active && 'bg-p2p-purple-light text-p2p-white',
      )}
    >
      {children}
    </Link>
  );
};
