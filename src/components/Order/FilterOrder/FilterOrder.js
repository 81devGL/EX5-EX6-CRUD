import { useState } from 'react';
import { Button, Placeholder, Drawer, ButtonToolbar } from 'rsuite';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form as FromRsuite, FormGroup } from 'rsuite';
import PropTypes from 'prop-types';

import InputPickerCustomField from '../../FinalFormComponent/InputPickerCustomField';
import TextCustomField from '../../FinalFormComponent/TextCustomField';
import { normalizePhone } from '../../Function/Function';

function FilterOrder(props) {
    const { filter, product,orders } = props;
    const [open, setOpen] = useState(false);
    const [filterData, setDataFilter] = useState({ name: '', mobile: '', product: '', email: '' });

    const handleOpen = () => setOpen(true);
    const onSubmit = async (values) => {
        if (values.mobile) {
            values.mobile = values.mobile.replace(/\s/g, '');
        }
        setDataFilter({ name: values.full_name, mobile: values.mobile, product: values.product, email: values.email });
        filter(values);
        setOpen(false);
    };

    const data = product.map((item) => ({ label: item.name, value: item.name }));
    const customer = orders.map((item)=> ({ label: item.full_name, value: item.full_name }) )

    return (
        <>
            <Button onClick={() => handleOpen('top')}>Bộ lọc</Button>
            <Drawer overflow={false} placement="right" size={'xs'} show={open} onHide={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>Tìm kiếm khách hàng</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body overflow={false}>
                    <Placeholder.Graph className="body--filterorder" height="600px" overflow={false}>
                        <FinalForm
                            onSubmit={onSubmit}
                            initialValues={{
                                full_name: filterData.name,
                                idorder: filterData.idorder,
                                mobile: filterData.mobile,
                                product: filterData.product,
                            }}
                            render={({ handleSubmit, form }) => (
                                <FromRsuite onSubmit={handleSubmit}>
                                    <div className="grid--orderfil--wrapper">
                                        <div className="input--wrapper--filterorder">
                                            <FormGroup>
                                                <Field name="idorder" component={TextCustomField} placeholder="Mã đơn hàng " type="text" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                    name="full_name"
                                                    component={InputPickerCustomField}
                                                    type="text"
                                                    placeholder="Họ và Tên"
                                                    inputvalue={customer}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                    name="mobile"
                                                    component={TextCustomField}
                                                    type="text"
                                                    placeholder="Số điện thoại"
                                                    parse={normalizePhone}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                {' '}
                                                <Field
                                                    component={InputPickerCustomField}
                                                    className="addcustomer--input--name"
                                                    name="product"
                                                    placeholder ="Chọn sản phẩm"
                                                    inputvalue={data}
                                                ></Field>
                                            </FormGroup>
                                        </div>
                                        <ButtonToolbar className="toolbar--filterorder">
                                            <Button className="button--filter--Customer" appearance="primary" type="submit" color="green">
                                                Lọc
                                            </Button>
                                            <Button
                                                className="button--filter--Customer"
                                                color="blue"
                                                onClick={(values) => {
                                                    setDataFilter({ ...filterData, name: '', mobile: '', product: '', email: '' });
                                                    form.reset();
                                                    filter(values);
                                                }}
                                                appearance="primary"
                                            >
                                                Lọc lại
                                            </Button>
                                            <Button
                                                color="red"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                                appearance="primary"
                                            >
                                                Thu gọn
                                            </Button>
                                        </ButtonToolbar>
                                    </div>
                                </FromRsuite>
                            )}
                        />
                    </Placeholder.Graph>
                </Drawer.Body>
            </Drawer>
        </>
    );
}
FilterOrder.protoType = {
    product: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
    filter: PropTypes.func.isRequired,

};
export default FilterOrder;
