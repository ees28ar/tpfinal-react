import { Outlet } from 'react-router-dom';
import Nav from '../NavBar/Nav';

function Layout() {
  return (
    <>
      <Nav />
      <div style={{ marginTop: '70px' }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;