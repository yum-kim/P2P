'use client';

import Link from 'next/link';
import { BsBoxArrowInRight, BsBell } from 'react-icons/bs';
import { FcMenu } from 'react-icons/fc';
import { Icon } from 'p2p-ui';
import { Profile } from './common/Profile';

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-center shadow shadow-[-4px 2px 7px -1px rgba(176, 176, 176, 0.5)]">
      <div className="w-full max-w-screen-p2p-lg px-[12px] p2p-sm:px-[24px] p2p-md:px-[32px] p2p-lg:px-0">
        <div className="flex items-center justify-between py-6">
          <h1>
            <Link href="/" className="items-center my-0 mx-auto p2p-lg:m-0">
              <Icon icon="Logo" size={40} />
            </Link>
          </h1>

          {/* lg에서만 노출 */}
          <div className="hidden p2p-lg:flex items-center gap-x-[4px] text-p2p-secondary text-p2p-18">
            <button className="p-[5px]">
              <BsBell />
            </button>
            <button className="p-[5px]">
              <BsBoxArrowInRight />
            </button>
            <div className="ml-[10px]">
              <Profile />
            </div>
          </div>

          {/* sm,md 에서만 노출 */}
          <div className="p2p-lg:hidden">
            <button className="text-p2p-18">
              <FcMenu />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
