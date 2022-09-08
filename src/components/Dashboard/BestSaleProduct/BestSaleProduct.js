import { Popover, Whisper } from 'rsuite';
import { InfoOrder } from '../../SupportUser/Mess';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { handleArrayCut } from '../../Function/Function';

function BestSaleProduct(props) {
    const { orders, product } = props;

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'djh7lsffd',
        },
    });

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
        e.numberOrder = num.length;
        e.orders = num;

        return e;
    });
    const newArr = pro.sort(function (a, b) {
        return parseFloat(a.sale) - parseFloat(b.sale);
    });

    return (
        <div className="table2--wrapper--item">
            {handleArrayCut(newArr, 10).map((item) => {
                const ordersArray = handleArrayCut(item.orders.reverse(), 10);
                if (!product.img) {
                    product.img = 'tuanpham/gyhrtfhhlcx8suhsxe1t';
                }
                const myImage = cld.image(`tuanpham/${item.img}`);
                myImage.resize(fill().width(80).height(80));

                const speakerOD = (
                    <Popover key={item.id} title={`Recent 10 orders of ${item.name}`}>
                        <InfoOrder id={item.id} item={ordersArray} value="spOrderTopProduct" />
                    </Popover>
                );
                return (
                    <div key={item.id} className="table2--item">
                        {' '}
                        <div className="wrapper--topproduct">
                            <AdvancedImage className="info--avata--menu " cldImg={myImage} />
                            <div className="table2--item--info">
                                <span className="table2--item--name">{item.name}</span>
                                <span className="table2--item--id">
                                    code: <span className="frontF"> {item.id}</span>
                                </span>
                            </div>
                        </div>
                        <div className="bestsale--wrapper">
                            <span className="table2--item--number">
                                {item.sale}
                                <span className="table2--item--des"> Sales</span>
                            </span>
                            <Whisper placement="leftStart" trigger="click" speaker={speakerOD}>
                                <span className="blue frontXs pointer">({item.numberOrder} orders) - Detail</span>
                            </Whisper>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BestSaleProduct;
