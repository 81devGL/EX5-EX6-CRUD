import { FlexboxGrid } from 'rsuite';
import { numberWithCommas } from '../Function/Function';
import { useState } from 'react';
import ProductInfo from '../Order/Orders/OrderInfo/componentInfoOrder/ProductInfo';
function InfoCustomerOrder(props) {
    const { item, index } = props;
    const [showInfo, setShowInfo] = useState(false);
    return (
        <div>
            <FlexboxGrid align="middle" className="wapper--content--topCus">
                <FlexboxGrid.Item colspan={2}>{index + 1}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>{item.idorder}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={5}>{item.createDate}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={5}>{numberWithCommas(item.total)}đ</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={5}>{item.status}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={1}>
                    {' '}
                    {showInfo ? (
                        <i className="fa-solid fa-chevron-up pointer" onClick={() => setShowInfo(false)}>
                            {' '}
                        </i>
                    ) : (
                        <i className="fa-solid fa-chevron-down pointer" onClick={() => setShowInfo(true)}></i>
                    )}
                </FlexboxGrid.Item>
            </FlexboxGrid>
            {showInfo && (
                <div className="info--order--table">
                    <ProductInfo item={item} />
                </div>
            )}
        </div>
    );
}

export default InfoCustomerOrder;
