function NewOrder(props) {
    const { orders } = props;
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    const data = [...orders].reverse().filter((v, i) => {
        const start = 0;
        const end = 6;
        return i >= start && i < end;
    });
    return (
        <div className="table3--wrapper--item">
            {data.map((item, index) => {
                let focusElement;
                if (index !== 0 && index % 2 !== 0) {
                    focusElement = 'table--item--bold';
                } else {
                    focusElement = '';
                }
                let total = numberWithCommas(item.total);
                let color = 'green--status';
                if (item.status === 'Còn nợ') {
                    color = 'red--status';
                }
                return (
                    <div key={item.id} className={`table3--item ${focusElement} `}>
                        <span className="table3--item--name">{item.full_name}</span>
                        <span className="table3--item--date">{item.createDate}</span>
                        <span className="table3--item--number">{total} VND</span>
                        <div className="table3--item--status ">
                            {' '}
                            <span className={`table3--item--des ${color}`}>{item.status}</span>{' '}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default NewOrder;
