import { useEffect, useState, useRef } from 'react';
import { FlexboxGrid, Pagination } from 'rsuite';

import { getCustomer } from '../../ApiService/apiCustomer';
import { getAllAdress } from '../../ApiService/provincesApi';

import AddCustomer from '../../components/Customer/AddCustomer/AddCustomer';
import FilterCustomer from '../../components/Customer/FilterCustomer/FilterCustomer';
import CustomerTable from '../../components/Customer/CustomerTable/CustomerTable';
import { handleString } from '../../components/Function/Function';

function Customers() {
    const [wordEntered, setWordEntered] = useState('');
    const [prodvice, setProvince] = useState([]);
    const [activePage, setActivePage] = useState(1);

    // array current
    const dataCus = useRef();
    const [customer, setCustomer] = useState([]);
    //-----delete-----
    function deleteCustomer(id) {
        const newCustomer = customer.filter((item) => {
            return item.id !== id;
        });
        setCustomer(newCustomer);
    }
    //-----edit-------
    function editCustomer(value, id) {
        const newArr = customer.map((item) => {
            if (item.id === id) {
                return (item = value);
            }
            return item;
        });
        setCustomer(newArr);
    }
    //----filter----
    function filterCustomer(data) {
        if (data.full_name || data.product || data.email || data.mobile) {
            //loc tren array current
            const newArr = dataCus.current.filter((item) => {
                if (!item.idproduct) item.idproduct = '.';
                if (!item.email) item.email = '.';
                return (
                    (!data.full_name || handleString(item.full_name).toLowerCase().includes(handleString(data.full_name).toLowerCase())) &&
                    (!data.mobile || item.mobile.toLowerCase().includes(data.mobile.replace(/\s/g, '').toLowerCase())) &&
                    (!data.product || item.idproduct.toLowerCase().includes(data.product.toLowerCase())) &&
                    (!data.email || item.email.toLowerCase().includes(data.email.toLowerCase()))
                );
            });
            setCustomer(newArr);
        } else {
            setCustomer(dataCus.current);
        }
    }

    //-----ADD------
    function getdata(data) {
        //-------------------- handle async await when add customer------------------
        // const itemLast =  customer.length - 1
        // let id =  customer[itemLast].id +1
        // if(!data.id) data ={...data,id:id}

        if (data) return setCustomer([...customer, data]);
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resCityService = await getAllAdress();
                setProvince(resCityService);
                const allCustomer = await getCustomer();
                setCustomer(allCustomer);
                dataCus.current = allCustomer;
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
        const newFilter = customer.filter((item) => {
            return (
                handleString(item.full_name).toLowerCase().includes(handleString(searchWord).toLowerCase()) ||
                item.mobile.toLowerCase().includes(searchWord.replace(/\s/g, '').toLowerCase()) ||
                item.email.toLowerCase().includes(searchWord.toLowerCase())
            );
        });

        if (searchWord === '') {
            setCustomer(dataCus.current);
        } else {
            setCustomer(newFilter);
        }
    };
    //
    const clearInput = () => {
        setCustomer([]);
        setWordEntered('');
    };
    //
    function handleSelect(eventKey) {
        setActivePage(eventKey);
    }
    //
    const data = [...customer].reverse().filter((v, i) => {
        const start = 10 * (activePage - 1);
        const end = start + 10;
        return i >= start && i < end;
    });
    return (
        <>
            <div className="wrapper--dasboard" id="wrapper--dasboard">
                <div className="wrapper--customer">
                    <div className="table--customer--header">
                        <span className="table--customer--title">Danh sách khách hàng</span>
                        <div className="table--customer--action">
                            <div className="customer--search--wrapper">
                                <input
                                    className="customer--search--input"
                                    placeholder="Tìm kiếm... "
                                    onChange={handleFilter}
                                    value={wordEntered}
                                />
                                <div>
                                    {!wordEntered.length === 0 && <i onClick={clearInput} className="fa-solid fa-x"></i>}
                                    <i className="fa-solid fa-magnifying-glass search--icon"></i>
                                </div>
                            </div>
                            <div className="wrapper--action--left">
                                <AddCustomer prodvice={prodvice} customer={customer} onGetdata={getdata} edit={editCustomer}></AddCustomer>
                                <div className="table--customer--filter">
                                    <FilterCustomer filter={filterCustomer}></FilterCustomer>
                                </div>
                            </div>
                        </div>
                        <div className="customer--header--wrapper">
                            <FlexboxGrid align="middle" className="show-grid grid--title--customer">
                                <FlexboxGrid.Item className="item--customer" colspan={4}>
                                    HỌ VÀ TÊN
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={3}>
                                    SDT
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={3}>
                                    NGÀY SINH{' '}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={5}>
                                    ĐỊA CHỈ
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={5}>
                                    EMAIL
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer customer--action" colspan={4}>
                                    CHỨC NĂNG
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </div>
                        <div className="customer--wrapper--item" id="customer__id">
                            {data.map((item, index) => {
                                let focusElement;
                                if (index !== 0 && index % 2 !== 0) {
                                    focusElement = 'table--item--bold';
                                } else {
                                    focusElement = '';
                                }
                                return (
                                    <CustomerTable
                                        editCustomer={editCustomer}
                                        deleteCustomer={deleteCustomer}
                                        key={item.id}
                                        item={item}
                                        forcus={focusElement}
                                        prodvice={prodvice}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* paging */}
                    <div className="wrapper--paging">
                        <Pagination
                            prev
                            last
                            next
                            first
                            layout={['total', '|', 'pager', 'skip']}
                            size="md"
                            pages={Math.ceil(customer.length / 10)}
                            activePage={activePage}
                            onSelect={handleSelect}
                            total={customer.length}
                            ellipsis
                            boundaryLinks
                        />
                    </div>
                </div>
                <div className="wrapper--footer">
                    <div className="footer">
                        <span className="footer--content">© 2022 VnSolution. All rights reserved.</span>
                        <div className="footer--wrapper--icon">
                            <i className="fa-solid fa-f footet--icon"></i>
                            <i className="fa-brands fa-twitter footet--icon "></i>
                            <i className="fa-brands fa-github footet--icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Customers;
