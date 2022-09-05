import { Notification } from 'rsuite';

function openNotifi(funcName, element, action) {
    if (element === 'order') {
        if (action === 'add') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Tạo đơn hàng thành công !',
                    duration: 2000,
                });
            } else if (funcName === 'error') {
                Notification[funcName]({
                    title: 'Tạo đơn hàng thất bại!',
                    duration: 2000,
                });
            } else if (funcName === 'warning') {
                Notification[funcName]({
                    title: 'Có lỗi vui lòng tải lại trang !',
                    duration: 2000,
                });
            }
        } else if (action === 'delete') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Xoá đơn hàng thành công !',
                    duration: 2000,
                });
            } else if (funcName === 'error') {
                Notification[funcName]({
                    title: 'Xoá đơn hàng thất bại!',
                    duration: 2000,
                });
            }
        } else if (action === 'edit') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Sửa đơn hàng thành công !',
                    duration: 2000,
                });
            } else {
                Notification[funcName]({
                    title: 'Sửa đơn hàng thất bại!',
                    duration: 2000,
                });
            }
        }
        if (action === 'filter') {
            if (funcName === 'error')
                Notification[funcName]({
                    title: 'Không tìm thấy đơn hàng vui lòng kiểm tra lại !',
                    duration: 2000,
                });
        }
        if (action === 'sale') {
            if (funcName === 'error') {
                Notification[funcName]({
                    title: 'Số tiền giảm giá không thể lớn hơn tổng đơn!',
                    duration: 2000,
                });
            }
        }
    } else if (element === 'customer') {
        if (action === 'add') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Tạo khách hàng thành công !',
                    duration: 2000,
                });
            } else {
                Notification[funcName]({
                    title: 'Tạo khách hàng thất bại!',
                    duration: 2000,
                });
            }
        }
        if (action === 'delete') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Xoá khách hàng thành công !',
                    duration: 2000,
                });
            } else {
                Notification[funcName]({
                    title: 'Xoá khách hàng thất bại!',
                    duration: 2000,
                });
            }
        }

        if (action === 'edit') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Sửa khách hàng thành công !',
                    duration: 2000,
                });
            } else {
                Notification[funcName]({
                    title: 'Sửa khách hàng thất bại!',
                    duration: 2000,
                });
            }
        }

        if (action === 'filter') {
            if (funcName === 'error')
                Notification[funcName]({
                    title: 'Không tìm thấy khách hàng vui lòng kiểm tra lại !',
                    duration: 2000,
                });
        }
    }
}
export { openNotifi };
