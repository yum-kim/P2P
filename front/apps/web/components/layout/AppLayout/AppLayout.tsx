import React from 'react';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './AppLayout.module.scss';


const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.app}>
            <Header />
            <div className={`container ${styles.wrapper}`}>
                <section className={styles.section}>
                    <aside className={`${styles.aside}`}>
                        <Nav />
                    </aside>
                    <main className={styles.main}>
                        {children}
                    </main>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout;