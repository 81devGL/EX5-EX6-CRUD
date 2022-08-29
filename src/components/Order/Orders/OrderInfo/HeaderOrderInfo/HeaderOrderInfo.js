import { Form as FromRsuite, FormGroup } from 'rsuite';
import { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';

import { handleDay } from '../../../../../ApiService/Apiservice';

import RSDateRangePicker from '../../../../FinalFormComponent/RSDateRangePicker';
import { numberWithCommas, totalOrderCartReport } from '../../../../Function/Function';
import { removeString } from '../../../../Function/Function';
function HeaderOrderInfo(props) {
    const { orders, renderReport, rootOrder} = props;
    const totalReport = totalOrderCartReport(orders, 'total');
    const totalDebit = totalOrderCartReport(orders, 'debit');
    const totalOrder = orders.length;
    const [tottal, setTotal] = useState();
    const [debit, setDebit] = useState();
    const [arrayDay, setArrayDay] = useState([]);

    let hanle
    useEffect(() => {
        let date = new Date();
        let last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        let lastday = last.getDate();
        let lastMo = last.getMonth() + 1;
        let lastY = last.getFullYear();
        let lastfday = lastY + '-' + lastMo + '-' + lastday;
        let today = year + '-' + month + '-' + day;
        setArrayDay([today,lastfday]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hanle]);
    const onSubmit = () => {};

    return (
        <>
            <div className="grid--header--infoorder">
                <div>
                    <span className="active frontXs">{totalOrder}</span>
                    <span className="active frontXs"> đơn hàng </span>
                </div>
                <div>
                    {' '}
                    <span className="active">- Tổng : </span>
                    <span className="green frontXs">{numberWithCommas(!tottal === undefined ? tottal : totalReport)}đ </span>
                </div>
                <div>
                    {' '}
                    <span className="red frontXs">- Nợ: </span>
                    <span className="red frontXs">{numberWithCommas(!debit === undefined ? debit : totalDebit)}đ</span>
                </div>
            </div>
            <FinalForm
                onSubmit={onSubmit}
                initialValues={{}}
                render={({ handleSubmit, values }) => (
                    <FromRsuite onSubmit={handleSubmit}>
                        <FormGroup>
                            <Field
                                initialValue={arrayDay}
                                defaultstyle
                                name="full_name"
                                component={RSDateRangePicker}
                                placeholder="Từ ngày - Đến ngày"
                                onOk={(e) => {
                                    if (e) {
                                        const array = e.map((item) => {
                                            return parseFloat(removeString(handleDay(item)));
                                        });
                                        if (array) {
                                            const reportOrder = rootOrder.filter((item) => {
                                                const dateCreate = parseFloat(removeString(item.createDate));
                                                return dateCreate >= array[0] && dateCreate <= array[1];
                                            });
                                            if (reportOrder === undefined) {
                                                renderReport(reportOrder);
                                                setTotal(0);
                                                setDebit(0);
                                            } else {
                                                renderReport(reportOrder);
                                                setTotal(totalOrderCartReport(reportOrder, 'total'));
                                                setDebit(totalOrderCartReport(reportOrder, 'debit'));
                                            }
                                        }
                                    }
                                }}
                                onClean={() => {
                                    renderReport(rootOrder);
                                    setTotal(totalReport);
                                    setTotal(totalDebit);
                                }}
                            ></Field>
                        </FormGroup>
                    </FromRsuite>
                )}
            />
        </>
    );
}

export default HeaderOrderInfo;
