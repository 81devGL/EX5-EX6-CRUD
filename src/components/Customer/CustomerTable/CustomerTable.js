import { useState } from 'react';
import { FlexboxGrid } from 'rsuite';

import EditCustomer from '../EditCustomer/EditCustomer';
import DeleteCustomer from '../DeleteCustomer/DeleteCustomer';
import CustomerInfo from './CustomerInfo/CustomerInfo';

import PropTypes from 'prop-types';
const CustomerTable = (props) => {
    const { deleteCustomer, editCustomer, item, forcus, prodvice } = props;
    const [showInfo, setShowInfo] = useState(false);
    const x = prodvice.find((i) => i.name === item.city);
    let y = ['Select City'];
    if (x) y = x.districts.map((j) => ({ label: j.name, value: j.name }));
    item.districts = y;

    return (
        <>
            <div className={`grid--item--customer ${forcus}`}>
                <FlexboxGrid align="middle" className="show-grid frontBold item--customer--grid">
                    <FlexboxGrid.Item colspan={4}>{item.full_name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={3}>{item.mobile}</FlexboxGrid.Item>
                    <FlexboxGrid.Item className="frontS" colspan={3}>
                        {item.dob}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                        {item.distrist ? item.distrist : 'Quận Ba Đình'}, {item.city ? item.city : 'Hà Nội'}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>{item.email}</FlexboxGrid.Item>
                    <FlexboxGrid.Item classPrefix="action--customer" colspan={4}>
                        <EditCustomer prodvice={prodvice} item={item} editCustomer={editCustomer} className="editcustomer--buton" />
                        <DeleteCustomer deleteCustomer={deleteCustomer} item={item} />
                        {/* <i class="fa-solid fa-cart-plus flexCenter"></i> */}
                        {showInfo ? (
                            <i className="fa-solid fa-chevron-up" onClick={() => setShowInfo(false)}>
                                {' '}
                            </i>
                        ) : (
                            <i className="fa-solid fa-chevron-down" onClick={() => setShowInfo(true)}></i>
                        )}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
            {showInfo && <CustomerInfo item={item}></CustomerInfo>}
        </>
    );
};
CustomerTable.protoType = {
    deleteCustomer: PropTypes.func.isRequired,
    editCustomer: PropTypes.func.isRequired,
    item: PropTypes.array.isRequired,
    focus: PropTypes.string,
    prodvice: PropTypes.array.isRequired,
    showInfo: PropTypes.bool,
};
export default CustomerTable;
