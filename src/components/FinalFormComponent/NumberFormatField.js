import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
// ==============================================
NumberFormatField.propTypes = {
    isNumber: PropTypes.bool,
    suffix: PropTypes.string,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultstyle: PropTypes.bool,
    allowNegative: PropTypes.bool,
};
// =============================================
export default function NumberFormatField(props) {
    const {
        input,
        onChangeCustom,
        isNumber,
        suffix = isNumber ? undefined : ' VNĐ',
        readOnly,
        label,
        isRequired,
        isAllowed,
        placeholder,
        defaultstyle,
        allowNegative = false,
        meta,
        ...rest
    } = props;
    const { value, onChange } = input;
    return (
        <div className="rs-form-group">
            {label && (
                <div
                    className="rs-control-label text-left"
                    style={{
                        fontWeight: 500,
                    }}
                >
                    {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
                </div>
            )}
            <div className={`rs-form-control-wrapper ${defaultstyle ? '' : 'custom-form-control-wrapper'}`}>
                <NumberFormat
                    {...rest}
                    style={{ width: '100%' }}
                    className="rs-input"
                    suffix={suffix}
                    value={value}
                    decimalSeparator=","
                    allowNegative={allowNegative}
                    thousandSeparator="."
                    onValueChange={(values) => {
                        const { floatValue } = values;
                        onChange(floatValue);
                        if (onChangeCustom) onChangeCustom(floatValue);
                    }}
                    readOnly={readOnly}
                    isAllowed={isAllowed}
                    placeholder={placeholder}
                />
            </div>
            {meta.error && meta.touched && <span className="form-text text-center w-100 text-danger ">{meta.error}</span>}
        </div>
    );
}
