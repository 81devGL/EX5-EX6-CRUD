import { FlexboxGrid } from 'rsuite';
import InfoCustomerOrder from './InfoCustomerOrder';

function InfoOrder(props) {
    const { value, item, id } = props;
    if (value === 'spOrderCreate')
        return (
            <>
                <p>Nếu không tìm thấy khách hàng, hãy điền vào "Thông tin khách hàng".</p>
                <p>Điều này sẽ tạo ra 1 khách hàng mới</p>
                <p>Đừng lo lắng! chúng tôi sẽ kiểm tra SĐT để tránh việc trùng lặp </p>
                <i>Tắt chỉ dẫn trong "Cài đặt"</i>
            </>
        );

    if (value === 'spOrderId')
        return (
            <>
                <p>Khuyên dùng mã tự động của hệ thống.</p>
                <p>Liên hệ với chúng tôi nếu bạn muốn thay đổi "Mã hoá đơn"</p>
                <p>Tip: Mã hoá đơn được bắt đầu bởi "năm và tháng" hiện tại và tăng dần để giúp bạn dễ theo dõi ! </p>
                <i>Tắt chỉ dẫn trong "Cài đặt"</i>
            </>
        );
    if (value === 'spEditOrderInfo')
        return (
            <>
                <p>Bạn sẽ không thể chỉnh sửa thông tin khách hàng tại đây, ngoại trừ "Địa chỉ giao hàng và ghi chú " !</p>
                <p>Vui lòng chỉnh sửa trong "DS Khách hàng"</p>
                <p>Rất tiếc! nhưng chúng tôi sẽ nâng cấp trong tương lai ! </p>
                <i>Tắt chỉ dẫn trong "Cài đặt"</i>
            </>
        );
    if (value === 'spEditOrderID')
        return (
            <>
                <p>Mã đơn hàng sẽ không thể chỉnh sửa</p>
                <i>Tắt chỉ dẫn trong "Cài đặt"</i>
            </>
        );
    if (value === 'spOrderTopProduct')
        return (
            <>
                {item.reverse().map((i) => {
                    const number = i.product.reduce((agr, a) => {
                        if (id === a.id) agr = a.number;
                        return agr;
                    }, 0);
                    return (
                        <p>
                            Code: {i.id} - Date: {i.createDate} - Amount: {number}
                        </p>
                    );
                })}
            </>
        );
    if (value === 'spOrderTopCustomer')
        return (
            <div className="wrapper--info--topCus">
                {' '}
                <FlexboxGrid justify="space-between" align="middle">
                    <FlexboxGrid.Item colspan={2}>STT</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6}>MÃ HOÁ ĐƠN</FlexboxGrid.Item>

                    <FlexboxGrid.Item colspan={5}>NGÀY TẠO</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>TỔNG TIỀN</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>TRẠNG THÁI</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={1}></FlexboxGrid.Item>
                </FlexboxGrid>
                {item.reverse().map((i, index) => {
                    return <InfoCustomerOrder item={i} key={i.id} index={index} />;
                })}
            </div>
        );
}

const MESS_VALIDATE = {
    mobile: 'Bạn đã nhập sai định dạng Số điện thoại, Vui lòng kiểm tra lại ! ',
    email: 'Bạn đã nhập sai định dạng Email, Vui lòng kiểm tra lại ! ',
    sale: 'Số tiền giảm giá không được lớn hơn tổng tiền !',
    required: 'Thông tin này là bắt buộc !',
    requiredMobile: 'Vui lòng nhập Số điện thoại  !',
    dublicate: 'Sản phẩm trùng lặp, vui lòng kiểm tra lại',
};

export { InfoOrder, MESS_VALIDATE };
