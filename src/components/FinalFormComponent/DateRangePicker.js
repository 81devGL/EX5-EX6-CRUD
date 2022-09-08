import { DateInput as KendoDateInput, DateRangePicker as KendoDateRangePicker } from '@progress/kendo-react-dateinputs';
import classnames from 'classnames/bind';
import CustomField from './CustomField';
import styles from './DateRangePicker.module.scss';

const cx = classnames.bind(styles);

function CustomDateFromInput(props) {
    return <KendoDateInput {...props} width={160} placeholder="Từ ngày" formatPlaceholder="formatPattern" label={null} />;
}
function CustomDateToInput(props) {
    return <KendoDateInput {...props} width={160} placeholder="Đến ngày" formatPlaceholder="formatPattern" label={null} />;
}
function CustomDateRangePicker(props) {
    // props
    const { input, ...rest } = props;

    const popupSettings = {
        style: { zIndex: 1060 },
    };

    return (
        <KendoDateRangePicker
            {...props}
            {...input}
            startDateInput={CustomDateFromInput}
            endDateInput={CustomDateToInput}
            popupSettings={popupSettings}
            format="dd/MM/yyyy"
            {...rest}
        />
    );
}

export default function DateRangePicker(props) {
    // props
    const { input, inputstyle, inputclassname, ...rest } = props;
    console.log(props);
    return (
        <CustomField
            {...input}
            {...rest}
            style={inputstyle}
            className={cx('kendo-date-range-picker', inputclassname)}
            accepter={CustomDateRangePicker}
            defaultstyle={true}
        />
    );
}
