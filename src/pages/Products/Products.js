import { useState, useEffect } from 'react';
import { getProducts } from '../../ApiService/apiProduct';
function Products() {
    // const hidePopupDeleteProduct = () => {};
    // const handleDeleteProduct = () => {};
    // const hidePopupEditProduct = () => {};
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    const showPopupEdit = () => {};
    const showPopupDelete = () => {};
    const [array, setArray] = useState([]);
    useEffect(() => {
        let mounted = true;
        getProducts().then((items) => {
            if (mounted) {
                setArray(items);
            }
        });
        return () => (mounted = false);
    }, []);

    return (
        <div className="wrapper--dasboard" id="wrapper--dasboard">
            <div className="wrapper--product">
                <div className="table--product--header">
                    <span className="table--product--title">Danh sách sản phẩm</span>
                    <div className="table--product--action">
                        <div className="product--search--wrapper">
                            <input className="product--search--input" placeholder="Tìm kiếm... " />
                            <div>
                                <i className="fa-solid fa-magnifying-glass search--icon"></i>
                            </div>
                        </div>
                        <div className="wrapper--action--left">
                            <div to="" className="product--button--add">
                                Thêm mới
                            </div>
                            <div className="table--product--filter">
                                {' '}
                                <div to="" className="product--button--filter">
                                    Bộ lọc
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table--product" id="table--product">
                    <div className="product--header--wrapper">
                        <div className="product--header--content">
                            <span className="product--header--title">SẢN PHẨM</span>
                            <span className="product--header--title">LOẠI</span>
                            <span className="product--header--title">NGÀY TẠO</span>
                            <span className="product--header--title">SỐ LƯỢNG</span>
                            <span className="product--header--title">GIÁ BÁN</span>
                            <span className="product--header--title">TRẠNG THÁI</span>
                            <span className="product--header--title">CHỨC NĂNG</span>
                        </div>
                    </div>
                    <div className="product--wrapper--item" id="product__id">
                        {array.map((item, index) => {
                            let focusElement;
                            let colorStatusProduct;
                            let statusProduct;
                            if (index !== 0 && index % 2 !== 0) {
                                focusElement = 'table--item--bold';
                            } else {
                                focusElement = '';
                            }
                            if (item.number > 0) {
                                statusProduct = 'Còn hàng';
                                colorStatusProduct = 'green--status';
                            } else {
                                statusProduct = 'Hết hàng';
                                colorStatusProduct = 'red--status';
                            }
                            let total = numberWithCommas(item.price);
                            return (
                                <div key={item.id} className={`product--item ${focusElement} `}>
                                    <span className="product--item--content">{item.name}</span>
                                    <span className="product--item--content">{item.group}</span>
                                    <span className="product--item--time">{item.createDate}</span>
                                    <span className="product--item--content">{item.number} cái</span>
                                    <span className="product--item--content">{total} VND</span>
                                    <div className="product--item--content ">
                                        <span className={`product--item--status ${colorStatusProduct}`}> {statusProduct}</span>
                                    </div>
                                    <div className="product--item--content">
                                        <div className="container--icon--product">
                                            <div onClick={showPopupEdit} className="product--icon" id="edit__product__icon">
                                                {' '}
                                                <i className={`fa-solid fa-pen`}></i>
                                            </div>
                                            <div onClick={showPopupDelete} className="product--icon" id="delete__product__icon">
                                                <i className="fa-solid fa-trash-arrow-up"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="wrapper--paging">
                        <span className="paging--text">Số bản ghi</span>
                        <div className="paging--short">
                            <select aria-label="State" className="paging--short--number">
                                <option defaultValue={'10'}>10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="paging--count" id="countpage">
                            1-10 of 20
                        </div>
                        <div className="paging--action">
                            <i className="fa-solid fa-chevron-left paging--action--icon product--prePage"></i>
                            <i className="fa-solid fa-chevron-right paging--action--icon product--nextPage"></i>
                        </div>
                    </div>
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
    );
}

export default Products;
