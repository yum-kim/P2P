import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="justify-start items-center min-h-screen overflow-x-hidden relative">
      <Header />
      <div className={`container bg-red-100`}>
        <section className="flex-grow shrink basis-full h-[calc(100% - 82px - 77px)]">
          <aside className="p2p-lg:h-full p2p-lg:py-[20px] p2p-lg:pt-[20px] p2p-lg:basis-[20%] p2p-lg:mr-[20px] p2p-lg:">
            <Nav />
          </aside>
          <main className="w-full h-full py-[20px] flex-1 rounded-[20px] relative flex-row">{children}</main>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
