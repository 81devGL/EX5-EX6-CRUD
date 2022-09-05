import { FlexboxGrid, Checkbox } from 'rsuite';
import { useState } from 'react';
import PropTypes from 'prop-types';

import DeleteOrder from '../DeleteOrder/DeleleteOrder';
import OrderInfo from './OrderInfo/OrderInfo';
import { numberWithCommas } from '../../Function/Function';
import EditOrder from '../EditOrder/EditOrder';
function Order(props) {
    const { forcus: handleFocus, item: i, deleteOrder, getSelect, popSelect, customer } = props;
    const [showInfo, setShowInfo] = useState(false);
    // SELECT
    const handleSelect = (value, checked) => {
        if (checked) {
            getSelect(i.id);
        } else {
            popSelect(i.id);
        }
    };
    return (
        <>
            <div className={`grid--item--customer ${handleFocus}`}>
                <FlexboxGrid align="middle" className="show-grid frontBold item--customer--grid">
                    <FlexboxGrid.Item colspan={4} className="checkbox--listorder">
                        <Checkbox onChange={handleSelect}> </Checkbox>
                        {i.idorder}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{i.full_name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item className="frontS" colspan={3}>
                        {i.mobile}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{i.createDate}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{numberWithCommas(i.total)} VNĐ</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={2} className={!i.debit ? 'green--status' : 'red--status'}>
                        {i.status}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item classPrefix="action--customer" colspan={3}>
                        {customer && (
                            <EditOrder {...props} item={i}>
                                {' '}
                            </EditOrder>
                        )}
                        <DeleteOrder {...props} deleteOrder={deleteOrder} item={i} />
                        {showInfo ? (
                            <i class="fa-solid fa-chevron-up" onClick={() => setShowInfo(false)}>
                                {' '}
                            </i>
                        ) : (
                            <i class="fa-solid fa-chevron-down" onClick={() => setShowInfo(true)}></i>
                        )}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
            {showInfo && <OrderInfo item={i}></OrderInfo>}
        </>
    );
}
Order.protoType = {
    deleteOrder: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    i: PropTypes.object.isRequired,
};
export default Order;
