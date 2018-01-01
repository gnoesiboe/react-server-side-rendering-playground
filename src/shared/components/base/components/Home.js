import React from 'react';
import { Helmet } from 'react-helmet';

function Home() {
    return (
        <div className="center-align" style={{ marginTop: '200px' }}>
            <Helmet>
                <title>React SSR</title>
                <meta property="og:title" content="React SSR" />
            </Helmet>
            <h3>Welcome!</h3>
            <p>Parturient Consectetur Vehicula Ultricies</p>
        </div>
    );
}

export default Home;
