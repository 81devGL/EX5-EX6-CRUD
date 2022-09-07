import { useState, useRef } from 'react';
import { handleString } from '../../Function/Function';
import { FlexboxGrid } from 'rsuite';
import ProductInfoAddOrder from '../ProductInfoAddOrder';

function ProductTableAddorder(props) {
    const { product, number } = props;

    const [wordEntered, setWordEntered] = useState('');
    const [productList, setProductList] = useState(product);
    const listProductRef = useRef();
    listProductRef.current = product;
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = product.filter((item) => {
            return (
                handleString(item.name).toLowerCase().includes(handleString(searchWord).toLowerCase()) || item.id === parseFloat(searchWord)
            );
        });

        if (searchWord === '') {
            setProductList(listProductRef.current);
        } else {
            setProductList(newFilter);
        }
    };

    let pro = productList.map((e) => {
        let num = number.find((element) => element.id === e.id);
        if (num) {
            e.salenumber = num.number;
        }
        return e;
    });

    return (
        <div className="addorder--wrapper--listproduct">
            <div className="info--customer--addorder">
                <span className="active">Danh sách sản phẩm </span>
                <div className="customer--search--listproduct">
                    <input className="customer--search--input" placeholder="Tìm tên, mã... " onChange={handleFilter} value={wordEntered} />
                    <div>
                        {/* {!wordEntered.length === 0 && <i onClick={clearInput} class="fa-solid fa-x"></i>} */}
                        <i className="fa-solid fa-magnifying-glass search--icon--listproduct "></i>
                    </div>
                </div>
            </div>
            <FlexboxGrid className="show-grid--listproduct" fluid>
                {pro.map((item) => {
                    return (
                        <FlexboxGrid.Item colspan={6}>
                            {' '}
                            <ProductInfoAddOrder item={item} />{' '}
                        </FlexboxGrid.Item>
                    );
                })}
            </FlexboxGrid>
        </div>
    );
}

export default ProductTableAddorder;
