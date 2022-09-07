import ProductInfo from './componentInfoOrder/ProductInfo';

const OrderInfo = (props) => {
    const { item } = props;

    return (
        <div className="info--order--table">
            <ProductInfo item={item} />

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
