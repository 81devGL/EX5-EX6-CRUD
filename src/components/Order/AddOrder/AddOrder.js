import { Modal, Button, Placeholder, ButtonToolbar, Icon, Popover, Whisper, FlexboxGrid } from 'rsuite';
import { Form as FromRsuite } from 'rsuite';
import { useState, useRef } from 'react';

import { Form as FinalForm, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';

import { AddCustomerApi } from '../../../ApiService/apiCustomer';
import { addOrderApi } from '../../../ApiService/ApiOrder';
import { today, handleDay } from '../../../ApiService/Apiservice';

import TextCustomField from '../../FinalFormComponent/TextCustomField';
import InputPickerCustomField from '../../FinalFormComponent/InputPickerCustomField';
import DatePickerCustomField from '../../FinalFormComponent/DatePickerCustomField';
import RadioCustomField from '../../FinalFormComponent/RadioCustomField';
import UploadAvataFrom from '../../Customer/AddCustomer/UploadForm/UploadAvataFrom';
import NumberCustomField from '../../FinalFormComponent/NumberCustomField';
import NumberFormatField from '../../FinalFormComponent/NumberFormatField';

import { handleString, normalizePhone, totalHanlder, totalHanlderBack, totalHanlderMinus } from '../../Function/Function';
import { InfoOrder, MESS_VALIDATE } from '../../SupportUser/Mess';
import { openNotifi } from '../../SupportUser/Notify';
import CustomerInfoMenuSearch from '../../Customer/CustomerTable/CustomerInfo/CustomerInfoMenuSearch';
import { ARRAY_VOUCHER, GEN, REGEX_EMAIL, REGEX_MOBILE } from '../../Function/Const';

const AddOrder = (props) => {
    const { product, customer, orders, prodvice = ['Hà Nội'], onGetdata, user } = props;

    const [open, setOpen] = useState(false);
    const [idAvataCurrent, setIdAvataCurrent] = useState(''); //id avata
    const [idRef, setIdRef] = useState('');
    const [dis, setDis] = useState([]);
    const [statusEdit, setStatusEdit] = useState(false);
    const [isDebit, setIsDebit] = useState(false);
    const [customerSearch, setCustomerSearch] = useState([]);
    const [idDisProduct, setIdDisProduct] = useState([]); //  array id product (duplicate product handler)

    const listProductRef = useRef();
    const refCustomer = useRef();
    const saveData = useRef();
    refCustomer.current = customer;
    listProductRef.current = product;

    const handleOpen = () => {
        setOpen(true);
        setIdDisProduct([]);
    };

    const handleClose = async () => {
        setOpen(false);
        setIdAvataCurrent('');
        setIdDisProduct([]);
    };

    // add item and rendering component parrent with callback

    const onSubmit = async (values) => {
        if (!values.city) {
            values.city = prodvice[0].name;
            if (!values.districst) {
                values.districst = dis[0].name;
            }
        }
        if (values.mobile) {
            values.mobile = values.mobile.replace(/\s/g, '');
        }
        if (isDebit) {
            values.status = 'Còn nợ';
            values.due = 0;
        } else {
            values.status = 'Hoàn thành';
            values.debit = 0;
        }
        //default today
        if (values.createDate && values.createDate !== today) {
            values.createDate = handleDay(values.createDate);
        }
        if (!values.customer) {
            values.customer = customer[customer.length - 1].id + 1;
        }
        //add new customer
        if (!statusEdit) {
            let idavata = 'idavata1661325387567';
            if (idRef) {
                idavata = `idavata${idRef}`;
            }
            let newCustomer = {
                city: values.city,
                address: (values.address ??= '90 Trần duy hưng'),
                distrist: values.districst,
                full_name: values.full_name,
                note: values.note,
                avata: idavata,
                mobile: values.mobile,
                gen: values.gen,
                email: values.email,
                idorder: values.idorder,
            };
            await AddCustomerApi(newCustomer, openNotifi('success', 'customer', 'add', user));
        }
        let newValue = {
            ...values,
            mobile: values.mobile,
            userCreate: user,
            createDate: (values.createDate ??= today),
        };
        await addOrderApi(newValue, openNotifi('success', 'order', 'add', user, values.idorder));
        await onGetdata(newValue);

        setOpen(false);
        setIdAvataCurrent('');
    };
    const data = prodvice.map((item) => ({ label: item.name, value: item.name }));
    const dataMobile = customer.map((item) => {
        return item.mobile;
    });

    function findCustomer(id) {
        const dataCustomer = customer.find((item) => item.id === id || item.mobile === id);
        return dataCustomer;
    }
    function findProduct(id) {
        const dataProduct = product.find((item) => item.id === id);
        return dataProduct;
    }

    function handleCity(city) {
        const dataDis = prodvice.find((item) => item.name === city);
        const data = dataDis.districts.map((item) => ({ label: item.name, value: item.name }));
        setDis(data);
    }

    const getIdRef = (id) => setIdRef(id);

    //validate
    const required = (value) => (value ? undefined : MESS_VALIDATE.required);
    const validateMobile = (mobile) => {
        // check mobile 'vietnam'
        if (!mobile) {
            return MESS_VALIDATE.requiredMobile;
        } else if (!REGEX_MOBILE.test(mobile.replace(/\s/g, ''))) {
            return MESS_VALIDATE.mobile;
        } else return undefined;
    };
    const validateEmail = (email) => {
        if (email && !REGEX_EMAIL.test(email)) {
            return MESS_VALIDATE.email;
        } else return undefined;
    };

    //support user
    const speakerCus = (
        <Popover title="Lưu ý">
            <InfoOrder value="spOrderCreate" />
        </Popover>
    );
    const speakerID = (
        <Popover title="Mã đơn hàng là bắt buộc và duy nhất !">
            <InfoOrder value="spOrderId" />
        </Popover>
    );

    return (
        <>
            <Button color="green" appearance="primary" onClick={() => handleOpen()}>
                Tạo đơn hàng
            </Button>
            <Modal overflow={false} size="lg" show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        Thêm mới đơn hàng
                        <span className="title--addOrder">
                            Người lập: <u>{user}</u>{' '}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="650px" classPrefix="popup--addcustomer">
                        <FinalForm
                            mutators={{
                                ...arrayMutators,
                            }}
                            onSubmit={onSubmit}
                            initialValues={{}}
                            render={({
                                handleSubmit,
                                form,
                                submitting,
                                pristine,
                                values,
                                form: {
                                    mutators: { push, pop, remove },
                                },
                            }) => (
                                <FromRsuite onSubmit={handleSubmit} ref={saveData} className="from--addcustomer">
                                    {' '}
                                    <div className="grid--addOrder--wrapper">
                                        <div className="addorder--wrapper--info flexBetween">
                                            <div>
                                                <Field
                                                    name="createDate"
                                                    component={DatePickerCustomField}
                                                    placeholder="Chọn ngày"
                                                    initialValue={today}
                                                ></Field>
                                            </div>
                                            <div className="grid--addcustomer--order">
                                                <Field
                                                    renderMenuItem={(label, customerSearch) => {
                                                        return <CustomerInfoMenuSearch item={customerSearch} />;
                                                    }}
                                                    name="customer"
                                                    component={InputPickerCustomField}
                                                    inputvalue={!customerSearch === [] ? customerSearch : customer}
                                                    labelKey="full_name"
                                                    valueKey="id"
                                                    placeholder="Họ tên..."
                                                    maxHeight={550}
                                                    className="input--search--addorder"
                                                    onSearch={(value) => {
                                                        const newarray = customer.filter((i) => {
                                                            return (
                                                                handleString(i.full_name)
                                                                    .toLowerCase()
                                                                    .includes(handleString(value).toLowerCase()) ||
                                                                i.mobile.toLowerCase().includes(value.toLowerCase())
                                                            );
                                                        });
                                                        setCustomerSearch(newarray);
                                                    }}
                                                    onSelect={(id) => {
                                                        //Auto fill on select cusotmer
                                                        setDis(findCustomer(id).districts);
                                                        setIdAvataCurrent(findCustomer(id).avata);
                                                        setStatusEdit(true);
                                                        form.batch(() => {
                                                            form.change('full_name', findCustomer(id).full_name);
                                                            form.change('email', findCustomer(id).email);
                                                            form.change('dob', findCustomer(id).dob);
                                                            form.change('city', findCustomer(id).city);
                                                            form.change('districst', findCustomer(id).distrist);
                                                            form.change('address', findCustomer(id).address);
                                                            form.change('mobile', findCustomer(id).mobile);
                                                            form.change('idorder', orders[orders.length - 1].idorder + 1);
                                                            form.change('gen', findCustomer(id).gen);
                                                        });
                                                    }}
                                                    onClean={() => {
                                                        form.batch(() => {
                                                            form.change('full_name', '');
                                                            form.change('email', '');
                                                            form.change('dob');
                                                            form.change('city', '');
                                                            form.change('districst', '');
                                                            form.change('address', '');
                                                            form.change('mobile', '');
                                                        });
                                                        setStatusEdit(false);
                                                        setIdRef('');
                                                        setDis([]);
                                                        setStatusEdit(false);
                                                        setIdAvataCurrent('');
                                                    }}
                                                ></Field>
                                                <span className="addOrder--name--after ">Tìm khách hàng</span>
                                            </div>
                                            <div className="idorder">
                                                <Field name="idorder" component={TextCustomField} validate={required} disabled></Field>
                                                <span className="addOrder--name--after ">
                                                    Mã hoá đơn *{' '}
                                                    <Whisper placement="bottomStart" trigger="hover" speaker={speakerID}>
                                                        <Icon className="active" icon="info-circle"></Icon>
                                                    </Whisper>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="addorder--wrapper--content">
                                            <div className="wrapper--info--addorder">
                                                <div className="info--customer--addorder">
                                                    <span className="active">Thông tin khách hàng </span>
                                                    <Whisper placement="rightStart" trigger="hover" speaker={speakerCus}>
                                                        <Icon className="active" icon="info-circle"></Icon>
                                                    </Whisper>
                                                </div>
                                                <div className="addoder--info--user">
                                                    <div className="grid--addcustomer--item">
                                                        <Field
                                                            name="mobile"
                                                            component={TextCustomField}
                                                            validate={validateMobile}
                                                            parse={normalizePhone}
                                                            disabled={statusEdit}
                                                            placeholder="___ ___ ____"
                                                            onBlur={(e) => {
                                                                //auto create idorder
                                                                form.change('idorder', orders[orders.length - 1].idorder + 1);
                                                                let value = e.target.value;
                                                                if (value) {
                                                                    value = value.replace(/\s/g, '');
                                                                }
                                                                if (dataMobile.find((item) => item === value)) {
                                                                    setDis(findCustomer(value).districts);
                                                                    setIdAvataCurrent(findCustomer(value).avata);

                                                                    if (dis) {
                                                                        form.change('full_name', findCustomer(value).full_name);
                                                                        form.change('email', findCustomer(value).email);
                                                                        form.change('dob', findCustomer(value).dob);
                                                                        form.change('city', findCustomer(value).city);
                                                                        form.change('districst', findCustomer(value).distrist);
                                                                        setIdAvataCurrent(findCustomer(value).avata);
                                                                        setStatusEdit(false);
                                                                    }
                                                                }
                                                            }}
                                                        ></Field>

                                                        <span className="addOrder--name--after ">Số Điện Thoại *</span>
                                                    </div>
                                                    <div className="grid--addcustomer--item">
                                                        <Field
                                                            name="full_name"
                                                            component={TextCustomField}
                                                            className="addorder--name"
                                                            placeholder=""
                                                            disabled={statusEdit}
                                                            validate={required}
                                                            onBlur={() => {
                                                                if (!values.idorder) {
                                                                    form.change('idorder', orders[orders.length - 1].idorder + 1);
                                                                } else if (!values.idorder && orders === []) {
                                                                    openNotifi('warning', 'order', 'add');
                                                                }
                                                            }}
                                                        ></Field>

                                                        <span className="addOrder--name--after">Tên khách hàng *</span>
                                                    </div>
                                                    <div className="grid--addcustomer--item">
                                                        <Field
                                                            name="gen"
                                                            disabled={statusEdit}
                                                            component={RadioCustomField}
                                                            inputvalue={GEN}
                                                            className="addorder--gen"
                                                            placeholder="..."
                                                            initialValue="nữ"
                                                        ></Field>
                                                    </div>
                                                </div>
                                                <div className="addorder--about">
                                                    <div>
                                                        <Field
                                                            name="email"
                                                            disabled={statusEdit}
                                                            component={TextCustomField}
                                                            placeholder="email@example.com"
                                                            validate={validateEmail}
                                                        ></Field>
                                                    </div>
                                                    <div>
                                                        <Field name="note" component={TextCustomField} placeholder="Ghi chú...."></Field>
                                                    </div>
                                                </div>
                                                <div className="addoder--info--address">
                                                    <div>
                                                        <Field
                                                            placeholder="..."
                                                            name="city"
                                                            disabled={statusEdit}
                                                            component={InputPickerCustomField}
                                                            inputvalue={data}
                                                            onSelect={(value) => {
                                                                handleCity(value);
                                                            }}
                                                        ></Field>

                                                        <span className="addOrder--name--after ">Tỉnh/ Thành phố</span>
                                                    </div>
                                                    <div>
                                                        <Field
                                                            name="districst"
                                                            component={InputPickerCustomField}
                                                            inputvalue={dis}
                                                            disabled={statusEdit}
                                                            placeholder="..."
                                                        ></Field>

                                                        <span className="addOrder--name--after ">Quận/huyện</span>
                                                    </div>
                                                    <div>
                                                        <Field name="address" component={TextCustomField} placeholder="..."></Field>

                                                        <span className="addOrder--name--after">Địa chỉ giao hàng</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="addorder--avata">
                                                <div>
                                                    <Field
                                                        disabled={statusEdit}
                                                        IdcusEdit={idAvataCurrent}
                                                        getId={getIdRef}
                                                        name="avata"
                                                        component={UploadAvataFrom}
                                                        {...props}
                                                    ></Field>

                                                    <div className="gen--addorder--avata">Avata</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 
                                        // --------------comment-------------------
                                        TotalProduct = (number * price)
                                        Total = sum(TotalProduct) * 1.08 VAT tofixed(0) 
                                        Due, debit handle when fill money       

                                        funciton(totalHandle): 
                                        @param : array , (idproduct)
                                        return :sum (price * number) - totalproduct curent(number*price)
                                        */}
                                        <FlexboxGrid align="middle" className="addorder--product">
                                            <FlexboxGrid.Item colspan={6}>Sản phẩm</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={6}>Giá bán</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={5}>Số lượng</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={5}>Thành tiền </FlexboxGrid.Item>

                                            <FlexboxGrid.Item colspan={2}>
                                                {' '}
                                                <Icon icon="plus" onClick={() => push('product', undefined)} />{' '}
                                                <Icon
                                                    icon="minus"
                                                    onClick={() => {
                                                        setIdDisProduct(idDisProduct.slice(0, -1));
                                                        if (values.product.length > 0) {
                                                            pop('product', undefined);
                                                            if (values.sale > 100) {
                                                                form.change(
                                                                    'total',
                                                                    ((totalHanlderBack(values.product) - values.sale) * 1.08).toFixed(0),
                                                                );
                                                            } else if (values.sale < 100 && values !== undefined) {
                                                                form.change(
                                                                    'total',
                                                                    (
                                                                        (totalHanlderBack(values.product) -
                                                                            values.sale * 0.01 * totalHanlderBack(values.product)) *
                                                                        1.08
                                                                    ).toFixed(0),
                                                                );
                                                            } else {
                                                                console.log((totalHanlderBack(values.product) - 0) * 1.08);
                                                                form.change('total', (totalHanlderBack(values.product) * 1.08).toFixed(0));
                                                            }
                                                        }
                                                    }}
                                                />{' '}
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>

                                        <div className="addorder--wrapprer--handle">
                                            <div className="addorder--handle--row">
                                                <FieldArray name="product">
                                                    {({ fields }) =>
                                                        fields.map((name, index) => (
                                                            <FlexboxGrid key={name} className="addorder--product--row">
                                                                <FlexboxGrid.Item colspan={6}>
                                                                    <div className="grid--addorder--product">
                                                                        <Field
                                                                            validate={required}
                                                                            name={`${name}.id`}
                                                                            component={InputPickerCustomField}
                                                                            placeholder="Chọn sản phẩm "
                                                                            inputvalue={product}
                                                                            labelKey="name"
                                                                            valueKey="id"
                                                                            disabledItemValues={idDisProduct}
                                                                            onSelect={(id) => {
                                                                                form.change(`${name}.price`, findProduct(id).price);
                                                                                form.change(`${name}.name`, findProduct(id).name);
                                                                                form.change('money', 0);
                                                                                form.change('debit', 0);
                                                                                form.change('due', 0);

                                                                                if (values.product[index]) {
                                                                                    const newArrr = [...idDisProduct].filter(
                                                                                        (item) => item !== values.product[index].id,
                                                                                    );
                                                                                    setIdDisProduct([...newArrr, id]);
                                                                                } else {
                                                                                    setIdDisProduct([...idDisProduct, id]);
                                                                                }

                                                                                if (values.product[index]) {
                                                                                    form.change(
                                                                                        `${name}.totalproduct`,
                                                                                        findProduct(id).price *
                                                                                            values.product[index].number,
                                                                                    );
                                                                                    let valueTotalProduct;
                                                                                    if (values.product) {
                                                                                        valueTotalProduct = totalHanlder(
                                                                                            values.product,
                                                                                            index,
                                                                                        );
                                                                                    }
                                                                                    if (values.sale < 100) {
                                                                                        form.change(
                                                                                            'total',
                                                                                            (
                                                                                                (valueTotalProduct +
                                                                                                    findProduct(id).price *
                                                                                                        values.product[index].number -
                                                                                                    values.sale * valueTotalProduct * 0.01 -
                                                                                                    findProduct(id).price *
                                                                                                        values.product[index].number *
                                                                                                        values.sale *
                                                                                                        0.01) *
                                                                                                1.08
                                                                                            ).toFixed(0),
                                                                                        );
                                                                                    } else if (values.sale > 100) {
                                                                                        form.change(
                                                                                            'total',
                                                                                            (
                                                                                                (valueTotalProduct +
                                                                                                    findProduct(id).price *
                                                                                                        values.product[index].number -
                                                                                                    values.sale) *
                                                                                                1.08
                                                                                            ).toFixed(0),
                                                                                        );
                                                                                    } else if (
                                                                                        values.sale === 0 ||
                                                                                        values.sale === undefined
                                                                                    ) {
                                                                                        form.change(
                                                                                            'total',
                                                                                            (
                                                                                                (valueTotalProduct +
                                                                                                    findProduct(id).price *
                                                                                                        values.product[index].number) *
                                                                                                1.08
                                                                                            ).toFixed(0),
                                                                                        );
                                                                                    }
                                                                                }
                                                                            }}
                                                                            onClean={() => {
                                                                                if (
                                                                                    values.product[index].number ||
                                                                                    values.product[index].price
                                                                                ) {
                                                                                    form.change(`${name}.number`, 0);
                                                                                    form.change(`${name}.price`, 0);
                                                                                    form.change(`${name}.totalproduct`, 0);
                                                                                    setIdDisProduct(
                                                                                        idDisProduct.filter(
                                                                                            (e) => e !== values.product[index].id,
                                                                                        ),
                                                                                    );

                                                                                    form.change(
                                                                                        'total',
                                                                                        values.totalproduct - values.totalproduct,
                                                                                    );
                                                                                    form.change('sale', 0);
                                                                                    if (values.money > 0) {
                                                                                        form.change('due', values.money - 0);
                                                                                    }
                                                                                    form.change('debit', 0);
                                                                                }
                                                                            }}
                                                                        ></Field>
                                                                    </div>
                                                                </FlexboxGrid.Item>
                                                                <FlexboxGrid.Item colspan={6}>
                                                                    <div className="grid--addorder--number">
                                                                        <Field
                                                                            name={`${name}.price`}
                                                                            component={NumberFormatField}
                                                                            disabled
                                                                            className="grid--addOrder--price"
                                                                        ></Field>
                                                                    </div>
                                                                </FlexboxGrid.Item>
                                                                <FlexboxGrid.Item colspan={5}>
                                                                    <div className="grid--addorder--number">
                                                                        <Field
                                                                            name={`${name}.number`}
                                                                            component={NumberCustomField}
                                                                            className="grid--addOrder--number"
                                                                            validate={required}
                                                                            onChange={(e) => {
                                                                                form.change('money', 0);
                                                                                form.change('debit', 0);
                                                                                form.change('due', 0);
                                                                                form.change(
                                                                                    `${name}.totalproduct`,
                                                                                    e * values.product[index].price,
                                                                                );
                                                                                let valueTotalProduct;
                                                                                if (values.product) {
                                                                                    valueTotalProduct = totalHanlder(values.product, index);
                                                                                }
                                                                                if (values.sale < 100) {
                                                                                    const totalVoucher =
                                                                                        e *
                                                                                            values.product[index].price *
                                                                                            0.01 *
                                                                                            values.sale +
                                                                                        values.sale * valueTotalProduct * 0.01;

                                                                                    form.change(
                                                                                        'total',
                                                                                        (
                                                                                            (e * values.product[index].price +
                                                                                                valueTotalProduct -
                                                                                                totalVoucher) *
                                                                                            1.08
                                                                                        ).toFixed(0),
                                                                                    );
                                                                                } else if (e > 100) {
                                                                                    form.change(
                                                                                        'total',
                                                                                        (
                                                                                            (e * values.product[index].price +
                                                                                                valueTotalProduct -
                                                                                                values.sale) *
                                                                                            1.08
                                                                                        ).toFixed(0),
                                                                                    );
                                                                                } else {
                                                                                    form.change(
                                                                                        'total',
                                                                                        (
                                                                                            (e * values.product[index].price +
                                                                                                valueTotalProduct) *
                                                                                            1.08
                                                                                        ).toFixed(0),
                                                                                    );
                                                                                }
                                                                            }}
                                                                        ></Field>
                                                                    </div>
                                                                </FlexboxGrid.Item>
                                                                <FlexboxGrid.Item colspan={5}>
                                                                    <div className="grid--addorder--number">
                                                                        <Field
                                                                            name={`${name}.totalproduct`}
                                                                            component={NumberFormatField}
                                                                            disabled
                                                                            className="grid--addOrder--number"
                                                                        ></Field>
                                                                    </div>
                                                                </FlexboxGrid.Item>
                                                                <FlexboxGrid.Item className="minusproduct" colspan={2}>
                                                                    {' '}
                                                                    <Field
                                                                        name={`${name}.minus`}
                                                                        component={TextCustomField}
                                                                        disabled
                                                                    ></Field>
                                                                    {/* remove product when click to minnus */}
                                                                    {/* bug update listproduct */}
                                                                    <i
                                                                        onClick={() => {
                                                                            setIdDisProduct(
                                                                                idDisProduct.filter((e) => e !== values.product[index].id),
                                                                            );

                                                                            remove('product', index);
                                                                            form.change('money', 0);
                                                                            form.change('debit', 0);
                                                                            form.change('due', 0);

                                                                            if (values.sale > 100) {
                                                                                form.change(
                                                                                    'total',
                                                                                    (
                                                                                        (totalHanlderMinus(values.product, index) -
                                                                                            values.sale) *
                                                                                        1.08
                                                                                    ).toFixed(0),
                                                                                );
                                                                            } else if (values.sale < 100 && values !== undefined) {
                                                                                form.change(
                                                                                    'total',
                                                                                    (
                                                                                        (totalHanlderMinus(values.product, index) -
                                                                                            values.sale *
                                                                                                0.01 *
                                                                                                totalHanlderMinus(values.product, index)) *
                                                                                        1.08
                                                                                    ).toFixed(0),
                                                                                );
                                                                            } else {
                                                                                form.change(
                                                                                    'total',
                                                                                    (
                                                                                        totalHanlderMinus(values.product, index) * 1.08
                                                                                    ).toFixed(0),
                                                                                );
                                                                            }
                                                                        }}
                                                                        className="fa-solid fa-minus"
                                                                    ></i>{' '}
                                                                </FlexboxGrid.Item>
                                                            </FlexboxGrid>
                                                        ))
                                                    }
                                                </FieldArray>
                                            </div>
                                            <div className="addorder--voucher grid--handle">
                                                <div>Voucher Giảm giá</div>
                                                <div>
                                                    <Field
                                                        defaultstyle
                                                        inputvalue={ARRAY_VOUCHER}
                                                        name="sale"
                                                        placeholder="Voucher"
                                                        validate={function (e) {
                                                            if (e > values.total) {
                                                                openNotifi('error', 'order', 'sale');
                                                                return '.';
                                                            } else return undefined;
                                                        }}
                                                        component={InputPickerCustomField}
                                                        onSelect={(e) => {
                                                            form.change('money', 0);
                                                            form.change('debit', 0);
                                                            form.change('due', 0);
                                                            if (!e) {
                                                                form.change('total', (totalHanlder(values.product) * 1.08).toFixed(0));
                                                            }
                                                            if (e > 100) {
                                                                form.change(
                                                                    'total',
                                                                    ((totalHanlder(values.product) - e) * 1.08).toFixed(0),
                                                                );
                                                                if (e > totalHanlder(values.product)) {
                                                                } else {
                                                                    if (values.money) {
                                                                        if (values.money > values.total) {
                                                                            form.change('due', values.money - values.total);
                                                                        } else {
                                                                            form.change('debit', values.total - values.money);
                                                                        }
                                                                    }
                                                                }
                                                            } else if (0 < e && e <= 100) {
                                                                const totalVoucher = (e * totalHanlder(values.product)) / 100;

                                                                form.change(
                                                                    'total',
                                                                    ((totalHanlder(values.product) - totalVoucher) * 1.08).toFixed(0),
                                                                );
                                                                if (e > totalHanlder(values.product)) {
                                                                } else {
                                                                    if (values.money) {
                                                                        if (values.money > values.total) {
                                                                            form.change('due', values.money - values.total);
                                                                        } else {
                                                                            form.change('debit', values.total - values.money);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        onClean={() => {
                                                            form.change('money', 0);
                                                            form.change('debit', 0);
                                                            form.change('due', 0);
                                                            form.change('total', (totalHanlder(values.product) * 1.08).toFixed(0));
                                                        }}
                                                    ></Field>
                                                </div>
                                            </div>
                                            <div className="addorder--total grid--handle">
                                                <div className="wrapper--addorder--total">Tổng tiền đơn hàng (Đã bao gồm 8% VAT)</div>
                                                <div>
                                                    <Field name="total" validate={required} component={NumberFormatField} disabled></Field>
                                                </div>
                                            </div>
                                            <div className="addorder--credit grid--handle">
                                                <div>Tổng tiền thanh toán </div>
                                                <Button
                                                    onClick={() => {
                                                        if (values.total) {
                                                            form.change('money', values.total);
                                                            if (values.debit || values.due) {
                                                                form.change('debit', 0);
                                                                form.change('due', 0);
                                                            }
                                                            setIsDebit(false);
                                                        }
                                                    }}
                                                    className="finsish--money"
                                                    appearance="ghost"
                                                    size="xs"
                                                    color="green"
                                                >
                                                    trả hết
                                                </Button>
                                                <div>
                                                    <Field
                                                        defaultstyle
                                                        name="money"
                                                        validate={required}
                                                        component={NumberFormatField}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            const i = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                                                            if (i >= values.total) {
                                                                setIsDebit(false);
                                                                form.change('due', i - values.total);
                                                            } else if (i < values.total) {
                                                                setIsDebit(true);
                                                                form.change('debit', values.total - i);
                                                            }
                                                        }}
                                                    ></Field>
                                                </div>
                                                {/* paymentamonut > total => handle due */}
                                                {isDebit ? (
                                                    <div className="debit--wrapper">
                                                        <div className="affter--debit--due">Còn nợ </div>
                                                        <div>
                                                            <Field
                                                                disabled
                                                                name="debit"
                                                                component={NumberFormatField}
                                                                placeholder=""
                                                            ></Field>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="due--wrapper">
                                                        <div className="affter--debit--due">Trả lại khách </div>
                                                        <div>
                                                            <Field disabled name="due" component={NumberFormatField} placeholder=""></Field>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <ButtonToolbar className="buttons addcustomer--button--submit">
                                            <Button appearance="primary" type="submit" disabled={submitting || pristine} color="green">
                                                Tạo mới
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    form.reset();
                                                    setStatusEdit(false);
                                                    setIdRef('');
                                                    setDis([]);
                                                    setIdAvataCurrent('');
                                                    setIdDisProduct([]);
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
AddOrder.protoType = {
    deleteCustomer: PropTypes.func.isRequired,
    onGetdata: PropTypes.func.isRequired,
    product: PropTypes.array.isRequired,
    customer: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
    prodvice: PropTypes.array.isRequired,
    user: PropTypes.string,
};
export default AddOrder;
