'use client';

import Link from 'next/link';
import { ContainedButton, Icon, InputWithLabel } from 'p2p-ui';

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-[20px]">
      <Icon icon="Logo" size={70} />
      <div className="w-full max-w-[400px] flex flex-col items-center p-[10px]">
        <div className="w-full flex flex-col gap-y-[20px] pb-[30px]">
          <InputWithLabel label="username">Username</InputWithLabel>
          <div>
            <InputWithLabel label="nickname">Nickname</InputWithLabel>
            <span className="text-p2p-red pt-[8px] block">빈 값으로 제출 시 닉네임이 자동 생성됩니다.</span>
          </div>
          <InputWithLabel label="password">Password</InputWithLabel>
          <InputWithLabel label="confirmPassword">Confirm Password</InputWithLabel>
          <ContainedButton className="w-full">Sign up</ContainedButton>
        </div>
        <div className="w-full flex flex-col gap-y-[8px]">
          <span className="w-full text-p2p-secondary">이미 가입된 계정이 있으신가요?</span>
          <Link href="/login" className="block w-full">
            <ContainedButton color="black" className="w-full">
              Login
            </ContainedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
