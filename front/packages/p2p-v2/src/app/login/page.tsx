'use client';

import { ContainedButton, Icon, OutlinedButton } from 'p2p-ui';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-[20px]">
      <div className="w-full max-w-[400px] flex flex-col items-center p-[10px] gap-y-[20px]">
        <Icon icon="Logo" size={70} />
        <div className="w-full flex flex-col gap-y-[20px]">
          <div className="flex flex-col gap-y-[4px]">
            <label htmlFor="username" className="text-gray-900 text-p2p-16">
              Username
            </label>
            <div className="outline outline-1 -outline-offset-1 outline-p2p-tertiary has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-p2p-purple rounded-md h-[35px] flex items-center pl-3">
              <input id="username" type="text" className="pr-3 block grow" />
            </div>
          </div>
          <div className="flex flex-col gap-y-[4px]">
            <label htmlFor="password" className="text-gray-900 text-p2p-16">
              Password
            </label>
            <div className="outline outline-1 -outline-offset-1 outline-p2p-tertiary has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-p2p-purple rounded-md h-[35px] flex items-center pl-3">
              <input id="password" type="password" className="pr-3 block grow" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-[10px]">
          <ContainedButton className="w-full" color="purple">
            Login
          </ContainedButton>
          <OutlinedButton className="w-full" color="black">
            Sign Up
          </OutlinedButton>
        </div>
      </div>
    </div>
  );
}
