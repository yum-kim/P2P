'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContainedButton, Icon, InputWithLabel } from 'p2p-ui';

export default function Login() {
  const router = useRouter();

  const onClickLogin = () => {
    /**
     * 개발 시 로그인 인증 로직 추가
     */

    router.push('/'); //app>(main)>page.tsx
  };

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
          <ContainedButton className="w-full" color="purple" onClick={onClickLogin}>
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
