import { About } from "./views/about.jsx";
import { BloomApp } from "./views/bloom-app.jsx";
import { Cart } from "./views/cart.jsx";
import { Contact } from "./views/contact.jsx";
import { Edit } from "./views/plant-edit.jsx";
import { Match } from "./views/match.jsx";
import { PlantDetails } from "./views/plant-details.jsx";
import { Shop } from "./views/shop.jsx";

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <BloomApp />,
        // label: 'Edit',
    },
    {
        path: '/about',
        component: <About />,
    },
    {
        path: '/shop/',
        component: <Shop />
    },
    {
        path: '/shop:',
        component: <Shop />
    },
    {
        path: '/contact',
        component: <Contact />
    },
    {
        path: '/match',
        component: <Match />
    },
    {
        path: '/plant/:id',
        component: <PlantDetails />
    },
    {
        path: '/cart',
        component: <Cart />
    },
    {
        path: '/plant/edit/:id',
        component: <Edit />
    },
    {
        path: '/plant/edit/',
        component: <Edit />
    },
]

export default routes