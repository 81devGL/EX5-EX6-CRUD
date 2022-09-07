import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { numberWithCommas } from '../Function/Function';
import { Icon } from 'rsuite';

const ProductInfoAddOrder = (props) => {
    const { item, getNumber } = props;
    let numberProduct = 0;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'djh7lsffd',
        },
    });
    if (!item.avata) {
        item.avata = 'tuanpham/gyhrtfhhlcx8suhsxe1t';
    }
    const myImage = cld.image(`tuanpham/${item.img}`);
    myImage.resize(fill().width(80).height(80));
    const handleListProduct = () => {
        numberProduct = numberProduct + 1;
        const data = { number: numberProduct, id: item.id };
        getNumber(data);
    };

    return (
        <div onClick={handleListProduct} className="info--listproduct--menu">
            <AdvancedImage className="info--avata--menu " cldImg={myImage} />
            <div className="info--menu--wrapper">
                <div>
                    <span className="frontXs blue">{item.name}</span> - <span className="frontXs">Mã Sp: {item.id}</span>
                </div>
                <div>
                    <span className="frontXs blue">{numberWithCommas(item.price)}đ </span> -{' '}
                    <span className={!item.number ? `frontXs red` : `frontXs blue`}>
                        {' '}
                        Tồn : {numberWithCommas(item.number ? item.number : '0')}
                    </span>
                </div>
            </div>
            {parseFloat(item.salenumber) > 0 && (
                <>
                    <div className="wrapper--insert--product">
                        <Icon icon="cart-plus"></Icon>
                    </div>{' '}
                    <span className="number--productlist">{item.salenumber} </span>
                </>
            )}
        </div>
    );
};
ProductInfoAddOrder.protoType = {
    item: PropTypes.object.isRequired,
};
export default ProductInfoAddOrder;
