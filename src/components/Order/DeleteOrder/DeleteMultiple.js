import { Modal, Button, Placeholder } from 'rsuite';
import { useState } from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { handleDeleteOrder } from '../../../ApiService/ApiOrder';
import { openNotifi } from '../../SupportUser/Notify';
const DeleteMultiple = (props) => {
    const { item, deleteMultiple, user } = props;
    const [open, setOpen] = useState(false);
    const onSubmit = async () => {
        if (item) {
            await item.forEach((id) => {
                handleDeleteOrder(id, openNotifi('success', 'order', 'delete', user, id));
            });
            await deleteMultiple();
        } else {
            openNotifi('warning', 'order', 'delete');
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button onClick={() => handleOpen()} appearance="primary" color="red">
                Xoá{' '}
            </Button>
            <Modal overflow={false} size={'lg'} show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="120px" classPrefix="popup--addcustomer">
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="from--addcustomer">
                                    Cảnh báo, bạn có chắc chắn muốn xoá các Hoá đơn này, sẽ không thể khôi phục ! "
                                    <div className="grid--addcustomer--wrapper">
                                        <div className="buttons addcustomer--button--submit">
                                            <Button onClick={handleClose} appearance="primary" type="submit">
                                                Xoá
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
DeleteMultiple.protoType = {
    item: PropTypes.object.isRequired,
    deleteOrder: PropTypes.func.isRequired,
};
export default DeleteMultiple;
