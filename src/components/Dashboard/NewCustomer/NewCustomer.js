import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { numberWithCommas } from '../../Function/Function';

function NewCustomer(props) {
    const { customer, orders } = props;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'djh7lsffd',
        },
    });
    let pro = customer.map((e) => {
        let num = orders.filter((element) => element.customer === e.id);
        if (num.length >= 1) {
            const total = num.reduce((agr, item) => {
                agr += item.total;
                return agr;
            }, 0);
            e.totalCard = total;
        }
        return e;
    });
    const newArr = pro.sort(function (a, b) {
        return parseFloat(b.totalCard) - parseFloat(a.totalCard);
    });

    const data = [...newArr].filter((v, i) => {
        const start = 0;
        const end = 10;
        return i >= start && i < end;
    });
    return (
        <div className="table--container--item" id="newCustomer">
            {data.map((item) => {
                if (!item.avata) {
                    item.avata = 'tuanpham/gyhrtfhhlcx8suhsxe1t';
                }
                const myImage = cld.image(`tuanpham/${item.avata}`);
                myImage.resize(fill().width(80).height(80));
                return (
                    <div>
                        <div className="table1--item">
                            {' '}
                            <AdvancedImage className="avata--dashbroad" cldImg={myImage} />
                            <div className="table1--info--name ">
                                {item.full_name}
                                <div className="table1--info--email">
                                    {item.email} - Doanh số: {numberWithCommas(item.totalCard)}đ
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default NewCustomer;
