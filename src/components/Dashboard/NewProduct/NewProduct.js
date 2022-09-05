function NewProduct(props) {
    const { orders, product } = props;
    // To sum the products, use the nested reduce technique.
    let pro = product.map((e) => {
        let num = orders.filter((element) => element.product.find((item) => item.id === e.id));
        if (num.length >= 1) {
            const total = num.reduce((ar, item) => {
                ar += item.product.reduce((agr, item) => {
                    if (item.id === e.id) agr += parseFloat(item.number);
                    return agr;
                }, 0);

                return ar;
            }, 0);
            e.sale = total;
        }

        return e;
    });
    const newArr = pro.sort(function (a, b) {
        return parseFloat(b.sale) - parseFloat(a.sale);
    });
    return (
        <div className="table2--wrapper--item">
            {newArr.map((item) => {
                return (
                    <div className="table2--item">
                        {' '}
                        <div className="table2--item--info">
                            <span className="table2--item--name">{item.name}</span>
                            <span className="table2--item--id">Mã SP: {item.id}</span>
                        </div>{' '}
                        <div className="table2--item--sale">
                            <span className="table2--item--number">{item.sale}</span>
                            <span className="table2--item--des">Sales</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default NewProduct;
