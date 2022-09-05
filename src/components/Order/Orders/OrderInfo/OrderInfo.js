import { numberWithCommas, totalHanlder } from '../../../Function/Function';
const OrderInfo = (props) => {
    const { item } = props;
    let voucherInfiny = 0;
    if (item.sale > 100) {
        voucherInfiny = item.sale;
    } else if (item.sale <= 100 && item.sale > 0) {
        voucherInfiny = item.sale * 0.01 * totalHanlder(item.product);
    }

    return (
        <div className="info--order--table">
            <div className="infoorder--des--wrapper">
                <div className="infoorder--header--product">
                    <span className="frontF">Sản phẩm</span>
                    <span className="frontF">Giá bán </span>
                    <span className="frontF">Số lượng </span>
                    <span className="frontF">Thành tiền </span>
                </div>
                {item.product !== [] &&
                    item.product.map((item, index) => {
                        return (
                            <div key={item.id} className="infoorder--des--about">
                                <span className="frontXs blue left">{item.name}</span>
                                <span className="frontXs green left">{numberWithCommas(item.price)} đ</span>
                                <span className="frontXs  left">{item.number}</span>
                                <span className="frontXs green left">{numberWithCommas(item.totalproduct)}đ</span>
                            </div>
                        );
                    })}
            </div>
            <div className="infoorder--middle">
                <div>
                    <span className="frontF blue">Tổng tiền sản phẩm: </span>
                    <span className="frontXs blue ">{numberWithCommas(totalHanlder(item.product))}đ</span>
                </div>
                <div>
                    <span className="frontF red">Giảm giá: </span>

                    <span className="frontXs red">
                        {item.sale < 100 ? `${item.sale}%` : ''} ({numberWithCommas(voucherInfiny)}đ){' '}
                    </span>
                </div>
                <div>
                    <span className="frontF blue">Tổng tiền sau giảm: </span>

                    <span className="frontXs blue">{numberWithCommas(totalHanlder(item.product) - voucherInfiny)}đ</span>
                </div>
                <div>
                    <span className="frontF blue">Tổng hoá đơn(+ 8% VAT (nếu có)): </span>
                    <span className="frontXs blue ">{numberWithCommas(item.total)}đ</span>
                </div>
            </div>
            <div className="infoorder--middle">
                <div>
                    <span className="frontF blue">Khách thanh toán: </span>
                    <span className="frontXs blue">{numberWithCommas(item.money)}đ</span>
                </div>
                <div>
                    <span className="frontF blue">Trả lại khách: </span>
                    <span className="frontXs blue">{numberWithCommas(item.due)}đ</span>
                </div>
                <div>
                    <span className="frontF red">Nợ: </span>
                    <span className="frontXs red">{numberWithCommas(item.debit)}đ</span>
                </div>
                <div>
                    <span className="frontF">Người tạo: </span>
                    <span className="frontXs ">{item.userCreate}</span>
                </div>
            </div>
            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Thành phố: </span>
                    <span className="frontXs">{item.city}</span>
                </div>
                <div>
                    <span className="frontF">Quận/Huyện: </span>
                    <span className="frontXs">{item.districst}</span>
                </div>
                <div>
                    <span className="frontF">Địa chỉ: </span>
                    <span className="frontXs">{item.address}</span>
                </div>
            </div>
        </div>
    );
};
export default OrderInfo;
