import { Chartjs } from '../../components/Dashboard/Chartjs/Chartjs';
import NewOrder from '../../components/Dashboard/NewOrder/NewOrder';
import { useEffect, useState } from 'react';
import { getCustomer } from '../../ApiService/apiCustomer';
import { getOrders } from '../../ApiService/ApiOrder';
import { getProducts } from '../../ApiService/apiProduct';
import TopCustomer from '../../components/Dashboard/TopCustomer/TopCustomer';
import BestSaleProduct from '../../components/Dashboard/BestSaleProduct/BestSaleProduct';
import { Loader } from 'rsuite';

function Dashbroad() {
    const [customer, setCustomer] = useState([]);
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const allCustomer = await getCustomer();
                setCustomer(allCustomer);
                const allOrders = await getOrders();
                setOrders(allOrders);
                const allProduct = await getProducts();
                setProduct(allProduct);
                setLoader(false);
            } catch (error) {
                console.log(error);
                setLoader(false);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="wrapper--dasboard" id="wrapper--dasboard">
            <div className="chart">
                <div className="chart--title">
                    <span className="chart--title--content">Doanh Thu</span>
                    <i className="fa-solid fa-circle-exclamation chart--title--icon"></i>
                </div>
                <Chartjs id="myChart" />
            </div>
            <div className="wrapper--table1--table2">
                <div className="table1">
                    <div className="table1--title">Khách hàng thân thiết</div>
                    {customer && orders && <TopCustomer orders={orders} customer={customer} />}
                </div>
                <div className="table2">
                    <div className="table2--title">Sản phẩm bán chạy </div>
                    {product && orders && <BestSaleProduct product={product} orders={orders} />}
                </div>
            </div>
            <div className="table3">
                <div className="table3--title">
                    <span className="table3--title--content">Đơn hàng gần đây</span>
                    <span className="table3--title--des">Danh sách 6 đơn hàng gần nhất</span>
                </div>
                <div className="table3--des">
                    <span className="table3--des--title cusomer">KHÁCH HÀNG</span>
                    <span className="table3--des--title time">THỜI GIAN</span>
                    <span className="table3--des--title total">THÀNH TIỀN</span>
                    <span className="table3--des--title status">TRẠNG THÁI</span>
                </div>
                <NewOrder orders={orders} />
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
            {loader ? (
                <div className="loader---id blue">
                    <Loader speed="slow" vertical content="Hệ thống đang tải dữ liệu" size="lg" />{' '}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default Dashbroad;
