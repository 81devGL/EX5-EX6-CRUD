import { Modal, Button, Placeholder, Notification, ButtonToolbar } from 'rsuite';
import { useState, useRef } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';

import { AddCustomerApi, EditCustomerApi } from '../../../ApiService/apiCustomer';
import { normalizePhone } from '../../Function/Function';
import { Form as FromRsuite, FormGroup, ControlLabel } from 'rsuite';

import TextCustomField from '../../FinalFormComponent/TextCustomField';
import DateInputField from '../../FinalFormComponent/DateInputField';
import InputPickerCustomField from '../../FinalFormComponent/InputPickerCustomField';
import RadioCustomField from '../../FinalFormComponent/RadioCustomField';
import UploadAvataFrom from './UploadForm/UploadAvataFrom';

const AddCustomer = (props) => {
    const { customer, prodvice, onGetdata, edit } = props;
    console.log(props);
    const [open, setOpen] = useState(false);
    const [dis, setDis] = useState([]);
    const [idEdit, setIdEdit] = useState('');
    const [cusEdit, setCusEdit] = useState();

    const [idRef, setIdRef] = useState('');

    const handleOpen = () => {
        setOpen(true);
        setCusEdit('');
        setIdEdit('');
    };
    const handleClose = async () => {
        setOpen(false);
        if (idEdit) {
            await openNotifi('info', 'edit');
        }
        setIdEdit('');
    };
    const saveData = useRef();
    function openNotifi(funcName, status) {
        if (status !== 'edit') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Tạo mới thành công !',
                    duration: 2000,
                });
            } else {
                Notification[funcName]({
                    title: 'Tạo mới thất bại!',
                    duration: 2000,
                });
            }
        } else {
            if (funcName === 'warning') {
                Notification[funcName]({
                    title: 'Khách hàng đã tồn tại !',
                    description: (
                        <span>
                            Đã tự động chuyển sang CHẾ ĐỘ SỬA,<br></br> Nếu bạn muốn tiếp tục nhập Khách hàng mới, vui lòng chọn NHẬP LẠI và
                            điền lại thông tin !
                        </span>
                    ),
                    duration: 8000,
                });
            } else if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Sửa khách hàng thành công !',
                    duration: 2000,
                });
            } else if (funcName === 'info') {
                Notification[funcName]({
                    title: 'Đã tắt chế độ sửa !',
                    duration: 2000,
                });
            }
        }
    }

    // add item and rendering component parrent with callback
    const onSubmit = async (values) => {
        if (!values.city) {
            values.city = prodvice[0].name;
        }
        if (!values.districst) {
            values.districst = dis[0].name;
        }
        if (values.mobile) {
            values.mobile = values.mobile.replace(/\s/g, '');
        }

        //hanlde format
        if (!cusEdit) {
            let formattedToday = '1995-10-01';
            if (values.dob) {
                const yyyy = values.dob.getFullYear();
                let mm = values.dob.getMonth() + 1; // Months start at 0!
                let dd = values.dob.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                formattedToday = yyyy + '-' + mm + '-' + dd;
            }
            let newValue = {
                ...values,
                city: values.city,
                distrist: values.districst,
                idproduct: 'Iphone X',
                mobile: values.mobile,
                dob: formattedToday,
                avata: `idavata${idRef}`,
            };
            await AddCustomerApi(newValue, openNotifi('success'));
            await onGetdata(newValue);
            setOpen(false);
        } else {
            let newValue = {
                ...cusEdit,
                city: values.city,
                distrist: values.districst,
                idproduct: 'Iphone X',
                mobile: values.mobile,
                dob: values.dob,
                full_name: values.full_name,
                gen: values.gen,
                email: values.email,
                totalCard: 0,
            };
            await EditCustomerApi(newValue, idEdit, openNotifi('success', 'edit'));
            await edit(newValue, idEdit);
            setOpen(false);
        }
    };
    const data = prodvice.map((item) => ({ label: item.name, value: item.name }));
    const gen = [
        { label: 'nam', value: 'nam' },
        { label: 'nữ', value: 'nữ' },
    ];
    const dataMobile = customer.map((item) => {
        return item.mobile;
    });

    function findCustomer(id) {
        const dataCustomer = customer.find((item) => item.mobile === id);
        return dataCustomer;
    }
    function handleCity(city) {
        const dataDis = prodvice.find((item) => item.name === city);
        const data = dataDis.districts.map((item) => ({ label: item.name, value: item.name }));
        setDis(data);
    }
    function getIdRef(id) {
        setIdRef(id);
    }
    //validate
    const required = (value) => (value ? undefined : 'Vui lòng nhập tên khách hàng');
    const validateMobile = (mobile) => {
        let regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!mobile) {
            return 'Vui lòng nhập Số điện thoại  !';
        } else if (!regex.test(mobile.replace(/\s/g, ''))) {
            return 'Bạn đã nhập sai định dạng Số điện thoại, Vui lòng kiểm tra lại ! ';
        }
    };
    const validateEmail = (email) => {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Vui lòng nhập email !!';
        } else if (!re.test(email)) {
            return 'Bạn đã nhập sai định dạng Email, Vui lòng kiểm tra lại ! ';
        }
    };
    return (
        <>
            <Button color="green" appearance="primary" onClick={() => handleOpen()}>
                Thêm mới
            </Button>
            <Modal overflow={false} size="lg" show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Thêm mới khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="350px" classPrefix="popup--addcustomer">
                        <FinalForm
                            onSubmit={onSubmit}
                            initialValues={{}}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <FromRsuite onSubmit={handleSubmit} ref={saveData} className="from--addcustomer">
                                    {' '}
                                    <div className="grid--addcustomer--wrapper">
                                        <FormGroup classPrefix="grid--addcustomer--item">
                                            <Field
                                                name="full_name"
                                                component={TextCustomField}
                                                className="addcustomer--input--name"
                                                validate={required}
                                            ></Field>
                                            <ControlLabel classPrefix="addcustomer--name--after ">Tên khách hàng *</ControlLabel>
                                        </FormGroup>
                                        <FormGroup classPrefix="grid--addcustomer--item">
                                            <Field
                                                name="mobile"
                                                component={TextCustomField}
                                                className="addcustomer--input--name"
                                                validate={validateMobile}
                                                parse={normalizePhone}
                                                placeholder="___ ___ ____"
                                                onBlur={(e) => {
                                                    let value = e.target.value;
                                                    if (value) {
                                                        value = value.replace(/\s/g, '');
                                                    }
                                                    if (dataMobile.find((item) => item === value)) {
                                                        setDis(findCustomer(value).districts);
                                                        setIdEdit(findCustomer(value).id);
                                                        setCusEdit(findCustomer(value));

                                                        if (dis) {
                                                            form.change('full_name', findCustomer(value).full_name);
                                                            form.change('email', findCustomer(value).email);
                                                            form.change('dob', findCustomer(value).dob);
                                                            form.change('city', findCustomer(value).city);
                                                            form.change('districst', findCustomer(value).distrist);
                                                            openNotifi('warning', 'edit');
                                                        }
                                                    }
                                                }}
                                            ></Field>

                                            <ControlLabel classPrefix="addcustomer--name--after ">Số Điện Thoại *</ControlLabel>
                                        </FormGroup>
                                        <FormGroup classPrefix="grid--addcustomer--address">
                                            <Field
                                                name="districst"
                                                component={InputPickerCustomField}
                                                inputvalue={dis}
                                                placeholder="..."
                                            ></Field>

                                            <ControlLabel classPrefix="addcustomer--name--after ">Quận/huyện</ControlLabel>
                                        </FormGroup>
                                        <FormGroup classPrefix="grid--addcustomer--address">
                                            <Field
                                                placeholder="..."
                                                name="city"
                                                component={InputPickerCustomField}
                                                inputvalue={data}
                                                onSelect={(value) => {
                                                    handleCity(value);
                                                }}
                                            ></Field>

                                            <ControlLabel classPrefix="addcustomer--name--after ">Tỉnh/ Thành phố</ControlLabel>
                                        </FormGroup>

                                        <div className="grid--addcustomer--groupdate">
                                            <FormGroup>
                                                <Field name="dob" component={DateInputField}></Field>

                                                <ControlLabel classPrefix="addcustomer--name--after ">Ngày sinh</ControlLabel>
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                    name="gen"
                                                    component={RadioCustomField}
                                                    inputvalue={gen}
                                                    className="gen"
                                                    initialValue={'nữ'}
                                                ></Field>
                                            </FormGroup>

                                            <FormGroup>
                                                <Field
                                                    IdcusEdit={cusEdit.avata}
                                                    getId={getIdRef}
                                                    name="avata"
                                                    component={UploadAvataFrom}
                                                    {...props}
                                                ></Field>

                                                <ControlLabel className="gen--input--avata">Avata</ControlLabel>
                                            </FormGroup>
                                        </div>
                                        <FormGroup classPrefix="grid--addcustomer--item">
                                            <Field
                                                name="email"
                                                component={TextCustomField}
                                                className="addcustomer--input--name"
                                                validate={validateEmail}
                                                placeholder="___@gmail.com"
                                            ></Field>

                                            <ControlLabel classPrefix="addcustomer--name--after">Email liên hệ *</ControlLabel>
                                        </FormGroup>

                                        <ButtonToolbar className="buttons addcustomer--button--submit">
                                            {!idEdit ? (
                                                <Button appearance="primary" type="submit" disabled={submitting || pristine} color="green">
                                                    Tạo mới
                                                </Button>
                                            ) : (
                                                <Button appearance="primary" type="submit" disabled={submitting || pristine} color="violet">
                                                    Cập nhật
                                                </Button>
                                            )}

                                            <Button
                                                onClick={() => {
                                                    form.reset();
                                                    setIdEdit('');
                                                    setCusEdit('');
                                                }}
                                                color="blue"
                                            >
                                                Nhập lại
                                            </Button>
                                        </ButtonToolbar>
                                    </div>
                                </FromRsuite>
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

export default AddCustomer;
