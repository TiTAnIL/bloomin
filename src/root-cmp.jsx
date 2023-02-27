import React from 'react'
import { Route, Routes } from 'react-router-dom';
import routes from './routes'

import { AppFooter } from './cmps/app-footer';
import { AppHeader } from './cmps/app-header';
import { BloomApp } from './views/bloom-app';
import { About } from './views/about';
import { Shop } from './views/shop';

// import './assets/css/global.css'


function App() {
  return (
    <div className="main-app">
      <AppHeader />
      <main className='container'>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
          {/* <Route exact={true} element={<UserDetails />} path="/user/:id" /> */}
        </Routes>
        <AppFooter />
      </main>
    </div>
  )
}



// function App() {


//     return (
//         <div className="main-app">
//             <AppHeader />
//             <main className='container'>
//                 <Routes>
//                     {/* <Route path='robot/edit/:id' element={<RobotEdit />} /> */}
//                     {/* <Route path='robot/edit' element={<RobotEdit />} /> */}
//                     {/* <Route path='robot/:id' element={<RobotDetails />} /> */}
//                     <Route path='/' element={<BloomApp />} />
//                     <Route path='about' element={<About />} />
//                     <Route path='shop' element={<Shop />} />
//                 </Routes>
//             </main>
//             <footer>
//                 {/* <AppFooter /> */}
//             </footer>
//         </div>
//     );
// }

export default App;
