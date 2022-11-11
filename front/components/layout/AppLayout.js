import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import styles from './AppLayout.module.scss';

const AppLayout = ({ children }) => {
    return (
        <div className={styles.app}>
            <Header />
            <div className={`container ${styles.wrapper}`}>
                <section className={styles.section}>
                    <aside className={`lg-only ${styles.aside}`}>
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