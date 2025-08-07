'use client';

import Link from 'next/link';
import { BsBoxArrowInRight, BsBell } from 'react-icons/bs';
import { FcMenu } from 'react-icons/fc';
import { Icon } from 'p2p-ui';
import { useCallback } from 'react';
import Profile from './common/Profile';

const Header = () => {
  const onClickLogout = useCallback(() => {}, []);

  const onClickHamburger = useCallback(() => {}, []);

  const onCloseSlideBox = useCallback(() => {}, []);

  return (
    <header className="w-full bg-p2p-background shadow-[-4px 2px 7px -1px rgba(176, 176, 176, 0.5)]">
      {/* <Modal /> */}
      <div className="">
        <div className="">
          <div className="">
            <div className="justify-between py-6">
              <h1 className="">
                <Link href="/" className="items-center my-0 mx-auto p2p-lg:m-0">
                  <Icon icon="Logo" width="30" height="30" />
                  <span className="font-p2p-logo text-4xl ml-[10px]">PTOP</span>
                </Link>
              </h1>
              <div className="flex max-p2p-lg:hidden">
                <button className="p-[5px] mr-2">
                  <BsBell />
                </button>
                <button className="p-[5px] mr-2" onClick={onClickLogout}>
                  <BsBoxArrowInRight />
                </button>
                <div className="ml-[10px]">
                  <Profile user={null} />
                </div>
              </div>
              <div className="p2p-lg:hidden">
                <button className="" onClick={onClickHamburger}>
                  <FcMenu />
                </button>

                {/* {isShowSlideBox && <div className="" onClick={onCloseSlideBox}></div>}
                <Slider visible={isShowSlideBox} options={{ direction: 'left', top: '0px', speed: 0.4, width: '80vw' }}>
                  <MobileNav onClose={onCloseSlideBox} onLogout={onClickLogout} />
                </Slider> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
