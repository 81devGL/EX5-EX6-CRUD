import PropTypes from "prop-types"
import { memo } from "react"
import { InputPicker } from "rsuite"
import CustomField from "./CustomField"

InputPickerCustomField.propTypes = {
  inputvalue: PropTypes.array.isRequired,
}

function InputPickerCustomField(props) {
  const { inputstyle, inputvalue = [], inputclassname, input,renderMenuItem,onSearch} = props
  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      data={inputvalue}
      accepter={InputPicker}
      onChange={(value) => {
        if (value === "new") return
        input.onChange(value)
      }}
      onSearch = {onSearch}
      virtualized={true}
      preventOverflow={true}
      renderMenuItem = {renderMenuItem}
      // renderMenuItem={(label, item) => {
      //   console.log(label,item)
      //   return (
      //     <div
      //       style={{
      //         color: label === "Khác" ? "#2665CA" : "#374151",
      //         fontStyle: label === "Khác" ? "italic" : "normal",
      //       }}
      //     >
      //       {label}
      //     </div>
      //   )
      // }}
    />
  )
}

export default memo(InputPickerCustomField)
