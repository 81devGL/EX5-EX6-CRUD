import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Icon } from 'rsuite';

const CustomerInfoMenuSearch = (props) => {
    
    const { item } = props;
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'djh7lsffd',
        },
    });
    if (!item.avata) {
        item.avata = 'tuanpham/gyhrtfhhlcx8suhsxe1t';
    }
    const myImage = cld.image(`tuanpham/${item.avata}`);
    myImage.resize(fill().width(80).height(80));
    return (
        <div className="info--customer--menu">
            <AdvancedImage className="info--avata--menu " cldImg={myImage} />
            <div className="info--menu--wrapper">
                <div>
                    <span className='frontXs blue'>{item.full_name}</span> - <span className='frontXs red'>{item.id}</span>
                </div>

                <div>
                    <Icon icon="phone"></Icon> &nbsp; 
                    <span className='frontXs blue' >{item.mobile} </span> - <span className='frontXs'>{item.address}</span>
                </div>
            </div>
        </div>
    );
};
CustomerInfoMenuSearch.protoType = {
    item: PropTypes.object.isRequired,
};
export default CustomerInfoMenuSearch;
