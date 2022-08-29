import Dashbroad from "../pages/Dashbroad/Dashbroad";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers/Customers";
import Login from "../pages/Login/Login"; 

import AddOrderss from "../pages/ArrayFinal/AddOrderss";
const elementRouter =[
    { path: '/', component: Dashbroad },
    { path: '/product', component: Products },
    { path: '/customer', component: Customers },
    { path: '/order', component: Orders },
    { path: '/add', component:AddOrderss  },
    { path: '/login', component: Login },
]

export default elementRouter