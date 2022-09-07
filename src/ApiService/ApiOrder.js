import { openNotifi } from '../components/SupportUser/Notify';
const customerApi = 'http://localhost:3000/ORDER_ITEM';

// GET all item

export function getOrders() {
    return fetch(customerApi).then((data) => data.json());
}

// POST one item
export function addOrderApi(data, callback) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(customerApi, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw openNotifi('error', 'order', 'add');
        })
        .then(callback)
        .catch((error) => console.log(error));
}
//delete item

export function handleDeleteOrder(id, callback) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(customerApi + '/' + id, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw openNotifi('error', 'order', 'add');
        })
        .then(callback);
}
//Edit
export function editOrderApi(data, id) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(customerApi + '/' + id, option).then(function (response) {
        return response;
    });
}
