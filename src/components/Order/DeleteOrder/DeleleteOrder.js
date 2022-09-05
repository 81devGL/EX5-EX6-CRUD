import { Modal, Button, Placeholder } from 'rsuite';
import { useState } from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { handleDeleteOrder } from '../../../ApiService/ApiOrder';
import { openNotifi } from '../../SupportUser/Notify';
const DeleteCustomer = (props) => {
    const { item, deleteOrder } = props;
    const onSubmit = async () => {
        if (item.id) {
            await handleDeleteOrder(item.id, openNotifi('success', 'order', 'delete'));
            await deleteOrder(item.id);
        } else {
            openNotifi('warning', 'order', 'delete');
        }
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <i className="fa-solid fa-trash deletecustomer--buton" onClick={() => handleOpen()}></i>
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
                                    Cảnh báo, bạn có chắc chắn muốn xoá Hoá đơn "{item.idorder}"
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
DeleteCustomer.protoType = {
    item: PropTypes.object.isRequired,
    deleteOrder: PropTypes.func.isRequired,
};
export default DeleteCustomer;
