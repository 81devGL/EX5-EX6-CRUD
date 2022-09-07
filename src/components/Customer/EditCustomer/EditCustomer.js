import { Modal, Button, Placeholder, InputPicker, Notification } from 'rsuite';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

import { EditCustomerApi } from '../../../ApiService/apiCustomer';
import { normalizePhone } from '../../Function/Function';

const EditCustomer = (props) => {
    const { item: i, editCustomer: edit, prodvice: pro } = props;
    const [open, setOpen] = useState(false);
    const [dis, setDis] = useState([]);
    const handleOpen = () => {
        setDis(i.districts);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const onSubmit = async (values) => {
        if (!values.city) {
            values.city = 'Thành phố Hà Nội';
            values.distrist = '';
        }
        if (!values.distrist) values.distrist = '';
        if (values.mobile) {
            values.mobile = values.mobile.replace(/\s/g, '');
        }

        let newValue = {
            ...i,
            city: values.city,
            distrist: values.distrist,
            idproduct: 'Iphone X',
            mobile: values.mobile,
            dob: values.dob,
            full_name: values.full_name,
            gen: i.gen,
            email: values.email,
            avata: i.avata,
            id: i.id,
        };

        if (i.id) {
            await EditCustomerApi(newValue, i.id, editStatus('success'));
            await edit(newValue, i.id);
            setOpen(false);
        } else {
            editStatus('warning');
            setOpen(false);
        }
    };

    function handleCity(city) {
        const dataDis = pro.find((item) => item.name === city);
        const data = dataDis.districts.map((item) => ({ label: item.name, value: item.name }));
        setDis(data);
    }
    const data = pro.map((item) => ({ label: item.name, value: item.name }));
    function editStatus(funcName) {
        if (funcName === 'success') {
            Notification[funcName]({
                title: 'Sửa khách hàng thành công !',
                duration: 2000,
            });
        } else {
            Notification[funcName]({
                title: 'Có lỗi, vui lòng Refesh trang và thử lại !!',
                duration: 4000,
            });
        }
    }
    return (
        <>
            <i className="fa-solid fa-pen-to-square editcustomer--buton" onClick={() => handleOpen()}></i>
            <Modal onHide={handleClose} overflow={false} size={'lg'} show={open}>
                <Modal.Header>
                    <Modal.Title>
                        Cập nhật khách hàng "{i.full_name} - {i.id}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="300px" classPrefix="popup--addcustomer">
                        <Form
                            validate={(values) => {
                                //validate email + mobile using regex
                                let regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
                                let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                const errors = {};
                                if (!values.full_name) {
                                    errors.full_name = 'Vui lòng nhập tên khách hàng !';
                                }
                                if (!values.mobile) {
                                    errors.mobile = 'Vui lòng nhập SDT !';
                                } else if (!regex.test(values.mobile.replace(/\s/g, ''))) {
                                    errors.mobile = 'Bạn đã nhập sai định dạng SDT, Vui lòng kiểm tra lại ! ';
                                }

                                if (values.email && !re.test(values.email)) {
                                    errors.email = 'Bạn đã nhập sai định dạng Email, Vui lòng kiểm tra lại ! ';
                                }
                                return errors;
                            }}
                            onSubmit={onSubmit}
                            initialValues={{
                                full_name: i.full_name,
                                mobile: i.mobile,
                                dob: i.dob,
                                email: i.email,
                                city: i.city,
                                distrist: i.distrist,
                            }}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} className="from--addcustomer">
                                    <div className="grid--addcustomer--wrapper">
                                        <div className="grid--addcustomer--item">
                                            <Field name="full_name">
                                                {({ input, meta }) => (
                                                    <div className="wrapper--filed">
                                                        <input
                                                            className="addcustomer--input--name"
                                                            {...input}
                                                            type="text"
                                                            placeholder="Họ và tên *"
                                                        />
                                                        {meta.error && meta.touched && <span className="warning">{meta.error}</span>}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field name="mobile" parse={normalizePhone}>
                                                {({ input, meta }) => (
                                                    <div className="wrapper--filed">
                                                        <input
                                                            className="addcustomer--input--name"
                                                            {...input}
                                                            type="text"
                                                            placeholder="___ ___ ____"
                                                        />
                                                        {meta.error && meta.touched && <span className="warning">{meta.error}</span>}
                                                    </div>
                                                )}
                                            </Field>
                                            <span className="addcustomer--name--after">SDT</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field name="distrist">
                                                {() => (
                                                    <div className="wrapper--filed">
                                                        <InputPicker
                                                            defaultValue={i.distrist}
                                                            data={dis}
                                                            className="addcustomer--input--name"
                                                            onChange={(e) => {
                                                                values.distrist = e;
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field name="city">
                                                {() => (
                                                    <div className="wrapper--filed">
                                                        <InputPicker
                                                            className="addcustomer--input--name"
                                                            data={data}
                                                            defaultValue={i.city}
                                                            onChange={(value) => {
                                                                values.city = value;
                                                                handleCity(value);
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field className="addcustomer--input--name" name="dob" component="input" type="date" />
                                            <span className="addcustomer--name--after">Ngày sinh</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field name="email">
                                                {({ input, meta }) => (
                                                    <div className="wrapper--filed">
                                                        <input
                                                            className="addcustomer--input--name"
                                                            {...input}
                                                            type="text"
                                                            placeholder="email@example.vn"
                                                        />
                                                        {meta.error && meta.touched && <span className="warning">{meta.error}</span>}
                                                    </div>
                                                )}
                                            </Field>
                                            <span className="addcustomer--name--after">Email</span>
                                        </div>
                                        <div className="buttons addcustomer--button--submit">
                                            <Button appearance="primary" type="submit" disabled={submitting || pristine} color="blue">
                                                Cập nhật
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        />
                    </Placeholder.Graph>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="addcustomer--button--back" onClick={handleClose} appearance="subtle">
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
EditCustomer.protoType = {
    i: PropTypes.object.isRequired,
    edit: PropTypes.func.isRequired,
    pro: PropTypes.array.isRequired,
};
export default EditCustomer;
