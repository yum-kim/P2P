'use client';

import Link from 'next/link';
import { ContainedButton, Icon, InputWithLabel } from 'p2p-ui';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-[20px]">
      <div className="w-full max-w-[400px] flex flex-col items-center p-[10px] gap-y-[20px]">
        <Icon icon="Logo" size={70} />
        <div className="w-full flex flex-col gap-y-[20px]">
          <InputWithLabel label="username">Username</InputWithLabel>
          <InputWithLabel label="password" type="password">
            Password
          </InputWithLabel>
        </div>
        <div className="w-full flex flex-col gap-y-[10px]">
          <ContainedButton className="w-full" color="purple">
            Login
          </ContainedButton>
          <Link href="/signup">
            <ContainedButton className="w-full" color="black">
              Sign Up
            </ContainedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
