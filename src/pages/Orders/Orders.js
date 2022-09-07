import { useEffect, useState, useRef } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';

import { FlexboxGrid, Pagination } from 'rsuite';
import { getOrders } from '../../ApiService/ApiOrder';

import { handleString, removeString } from '../../components/Function/Function';
import AddOrder from '../../components/Order/AddOrder/AddOrder';
import Order from '../../components/Order/Orders/OrderTable';
import { getAllAdress } from '../../ApiService/provincesApi';
import { getCustomer } from '../../ApiService/apiCustomer';
import { getProducts } from '../../ApiService/apiProduct';
import FilterOrder from '../../components/Order/FilterOrder/FilterOrder';
import HeaderOrderInfo from '../../components/Order/Orders/OrderInfo/HeaderOrderInfo/HeaderOrderInfo';
import DeleteMultiple from '../../components/Order/DeleteOrder/DeleteMultiple';

function Orders() {
    const cx = classNames.bind(styles);
    const [wordEntered, setWordEntered] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [customer, setCustomer] = useState([]);
    const [product, setProduct] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [selectItem, setSelectItem] = useState([]);
    // array current
    const dataOrder = useRef();
    const [orders, setOrders] = useState([]);
    const [prodvice, setProvince] = useState();
    const [user, setUser] = useState('');

    function deleteOrder(id) {
        const newOrder = orders.filter((item) => {
            return item.id !== id;
        });
        setOrders(newOrder);
    }
    async function deleteMultiple() {
        const newOrder = await orders.filter((item) => {
            return !selectItem.includes(item.id);
        });
        setOrders(newOrder);
        setSelectItem([]);
        setIsDelete(false);
    }
    //-----edit-------
    function editOrder(value, id) {
        const newArr = orders.map((item) => {
            if (item.id === id) {
                return (item = value);
            }
            return item;
        });
        setOrders(newArr);
    }
    //====filter====
    function filterOrder(data) {
        if (data.full_name || data.product) {
            let name = handleString(data.full_name);
            let product = handleString(data.product);

            //loc tren array current
            const newArr = dataOrder.current.filter((item) => {
                const productList = item.product.reduce((list, item) => {
                    return (list += item.name);
                }, '');
                let nameItem = handleString(item.full_name);
                let productItem = handleString(productList);

                return (!name || nameItem === name) && (!product || productItem.toLowerCase().includes(product.toLowerCase()));
            });
            setOrders(newArr);
        } else {
            setOrders(dataOrder.current);
        }
    }
    //getDATA

    function renderReport(data) {
        setOrders(data);
    }
    //-----ADD------
    function getdata(data) {
        if (!data.id) data = { ...data, id: data.idorder };
        if (data) return setOrders([...orders, data]);
    }

    //get data
    useEffect(() => {
        const fetchApi = async () => {
            try {
                // get today and last 7 days
                const orderItem = await getOrders();
                let date = await new Date();
                let last = await new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                if (month < 10) month = '0' + month;
                if (day < 10) day = '0' + day;
                let lastday = last.getDate();
                let lastMo = last.getMonth() + 1;
                let lastY = last.getFullYear();
                if (lastMo < 10) lastMo = '0' + lastMo;
                if (lastday < 10) lastday = '0' + lastday;
                let lastfday = lastY + lastMo + lastday;
                let today = year + month + day;
                const arrayreport = await orderItem.filter((item) => {
                    const dateCreate = parseFloat(removeString(item.createDate));
                    return dateCreate >= parseFloat(lastfday) && dateCreate <= parseFloat(today);
                });
                if (arrayreport) {
                    setOrders(arrayreport);
                } else setOrders(orderItem);

                dataOrder.current = orderItem;
                const prodvice = await getAllAdress();
                setProvince(prodvice);

                const dataCustomer = await getCustomer();
                setCustomer(dataCustomer);

                const products = await getProducts();
                setProduct(products);

                const userLocal = localStorage.getItem('lastName') + localStorage.getItem('firstName');
                const userSession = sessionStorage.getItem('lastName') + sessionStorage.getItem('firstName');

                if (userLocal) {
                    setUser(userLocal);
                } else setUser(userSession);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);
    //-----Search----

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = dataOrder.current.filter((item) => {
            const idorderNew = item.idorder.toString();
            return idorderNew.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === '') {
            setOrders(dataOrder.current);
        } else {
            setOrders(newFilter);
        }
    };

    const clearInput = () => {
        setOrders([]);
        setWordEntered('');
    };
    function handleSelect(eventKey) {
        setActivePage(eventKey);
    }
    //add list districst
    const arrayCustomer = customer.map((item) => {
        if (prodvice) {
            const x = prodvice.find((i) => i.name === item.city);
            let y = ['Select City'];
            if (x) y = x.districts.map((j) => ({ label: j.name, value: j.name }));
            item.districts = y;
            return item;
        } else return item;
    });
    //handle paging
    const data = [...orders].reverse().filter((v, i) => {
        const start = 10 * (activePage - 1);
        const end = start + 10;
        return i >= start && i < end;
    });

    const getSelect = (e) => {
        setSelectItem([...selectItem, e], setIsDelete(true));
    };
    const popSelect = (e) => {
        const newSelect = selectItem.filter((item) => {
            return item !== e;
        });
        setSelectItem(newSelect);
    };

    return (
        <>
            <div className={cx('wrapper--dasboard')} id="wrapper--dasboard">
                <div className={cx('wrapper--customer')}>
                    <div className={cx('table--customer--header')}>
                        <div className={cx('wrapper--order--info')}>
                            <span className={cx('table--customer--title')}>Danh sách đơn hàng </span>
                            <HeaderOrderInfo rootOrder={dataOrder.current} renderReport={renderReport} orders={orders}></HeaderOrderInfo>
                        </div>

                        <div className={cx('table--customer--action')}>
                            <div className={cx('customer--search--wrapper')}>
                                <input
                                    className={cx('customer--search--input')}
                                    placeholder="Tìm kiếm mã đơn hàng... "
                                    onChange={handleFilter}
                                    value={wordEntered}
                                />
                                <div>
                                    {!wordEntered.length === 0 && <i onClick={clearInput} class="fa-solid fa-x"></i>}
                                    <i className={cx('fa-solid fa-magnifying-glass search--icon')}></i>
                                </div>
                            </div>

                            <div className={cx('wrapper--action--left')}>
                                {isDelete && (
                                    <DeleteMultiple
                                        user={user}
                                        item={selectItem}
                                        deleteMultiple={deleteMultiple}
                                        appearance="primary"
                                        color="red"
                                    >
                                        Xoá{' '}
                                    </DeleteMultiple>
                                )}
                                {orders && customer && product && (
                                    <AddOrder
                                        product={product}
                                        orders={orders}
                                        prodvice={prodvice}
                                        onGetdata={getdata}
                                        customer={customer}
                                        user={user}
                                    ></AddOrder>
                                )}

                                <div className={cx('table--customer--filter')}>
                                    <FilterOrder product={product} orders={orders} customer={customer} filter={filterOrder}></FilterOrder>
                                </div>
                            </div>
                        </div>
                        <div className="customer--header--wrapper">
                            <FlexboxGrid align="middle" className="show-grid grid--title--customer">
                                <FlexboxGrid.Item className="item--customer checkbox--listorder " colspan={4}>
                                    MÃ HOÁ ĐƠN
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={4}>
                                    TÊN KHÁCH HÀNG
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={3}>
                                    SỐ ĐIỆN THOẠI
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={4}>
                                    NGÀY TẠO
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={4}>
                                    TỔNG TIỀN
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={2}>
                                    TRẠNG THÁI
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer customer--action" colspan={3}>
                                    CHỨC NĂNG
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </div>
                        {data.map((item, index) => {
                            let focusElement;
                            if (index !== 0 && index % 2 !== 0) {
                                focusElement = 'table--item--bold';
                            } else {
                                focusElement = '';
                            }
                            return (
                                <Order
                                    key={item.id}
                                    item={item}
                                    forcus={focusElement}
                                    deleteOrder={deleteOrder}
                                    customer={arrayCustomer}
                                    editOrder={editOrder}
                                    prodvice={prodvice}
                                    product={product}
                                    orders={orders}
                                    getSelect={getSelect}
                                    popSelect={popSelect}
                                    user={user}
                                />
                            );
                        })}
                    </div>
                    <div className="wrapper--paging">
                        <Pagination
                            prev
                            last
                            next
                            first
                            layout={['total', '|', 'pager', 'skip']}
                            size="lg"
                            pages={Math.ceil(orders.length / 10)}
                            activePage={activePage}
                            onSelect={handleSelect}
                            total={orders.length}
                            ellipsis
                            boundaryLinks
                        />
                    </div>
                </div>

                <div className={cx('wrapper--footer')}>
                    <div className={cx('footer')}>
                        <span className={cx('footer--content')}>© 2022 VnSolution. All rights reserved.</span>
                        <div className={cx('footer--wrapper--icon')}>
                            <i className={cx('fa-solid fa-f footet--icon')}></i>
                            <i className={cx('fa-brands fa-twitter footet--icon ')}></i>
                            <i className={cx('fa-brands fa-github footet--icon')}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
