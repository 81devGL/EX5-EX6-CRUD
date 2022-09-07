import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Popover, Whisper } from 'rsuite';
import { numberWithCommas } from '../../Function/Function';
import { InfoOrder } from '../../SupportUser/Mess';

function TopCustomer(props) {
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
        e.numberOrder = num.length;
        e.orders = num;

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
                const speakerOD = (
                    <Popover key={item.id} title={`Lịch sử mua hàng: ${item.full_name} - SĐT: ${item.mobile} - Địa chỉ: ${item.address}`}>
                        <InfoOrder item={item.orders} value="spOrderTopCustomer" />
                    </Popover>
                );
                if (!item.avata) {
                    item.avata = 'tuanpham/gyhrtfhhlcx8suhsxe1t';
                }
                const myImage = cld.image(`tuanpham/${item.avata}`);
                myImage.resize(fill().width(80).height(80));
                return (
                    <div key={item.id} className="table1--wrapper--item">
                        <div className="table1--item">
                            {' '}
                            <AdvancedImage className="avata--dashbroad" cldImg={myImage} />
                            <div className="table1--info--name ">
                                {item.full_name}
                                <div className="table1--info--email">{item.email}</div>
                            </div>
                        </div>
                        <div className="table1--wrapper--info">
                            <span className="frontXs">
                                Doanh số ({' '}
                                <Whisper placement="bottomStart" trigger="click" speaker={speakerOD}>
                                    <span className="green frontXs pointer">{item.numberOrder} ĐH ...</span>
                                </Whisper>
                                )
                            </span>{' '}
                            <span className="blue frontF "> {numberWithCommas(item.totalCard)}đ</span>{' '}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TopCustomer;
