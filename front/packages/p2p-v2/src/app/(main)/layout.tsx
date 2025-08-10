import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen overflow-x-hidden relative grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr]">
      {/* 1row - header */}
      <section className="col-span-2">
        <Header />
      </section>

      {/* 2row - nav, main */}
      <div className="col-span-2 flex justify-center p-[20px] bg-p2p-background">
        <div className="w-full max-w-screen-p2p-lg flex">
          {/* nav: lg에서만 노출 */}
          <aside className="hidden p2p-lg:flex w-[200px] px-[10px] py-[20px] justify-center max-w-screen-p2p-lg">
            <Nav />
          </aside>

          <main className="h-full py-[20px] flex-1 relative flex-row px-[12px] p2p-sm:px-[24px] p2p-md:px-[32px] p2p-lg:px-0">
            {children}
          </main>
        </div>
      </div>

      {/* 3row - footer */}
      <section className="col-span-2 bg-p2p-background">
        <Footer />
      </section>
    </div>
  );
};

export default RootLayout;
