import React from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import Launches from './components/Launches';

const StyledApp = styled.section`
  padding: 4em;
  background: papayawhip;
`;

function App() {

  return (
    <StyledApp>
      <Header />
      <main>
        <Launches/>
      </main>
      <Footer />
    </StyledApp>
  );
}

export default App;
