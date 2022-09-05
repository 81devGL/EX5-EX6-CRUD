const producApi = 'http://localhost:3000/PRODUCT_ITEM';
export function getProducts() {
    return fetch(producApi).then((data) => data.json());
}
export function editProduct(data, id, callback) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(producApi + '/' + id, option)
        .then(function (response) {
            return response;
        })
        .then(callback);
}
