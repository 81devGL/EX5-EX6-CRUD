import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import InputPickerCustomField from '../../components/FinalFormComponent/InputPickerCustomField';
import NumberFormatField from '../../components/FinalFormComponent/NumberFormatField';

import NumberCustomField from '../../components/FinalFormComponent/NumberCustomField';
function AddOrderss() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const gen = [
        { label: 'nam', value: 'nam' },
        { label: 'nữ', value: 'nữ' },
    ];
    const onSubmit = async (values) => {
        console.log(values)
        await sleep(300);
        window.alert(JSON.stringify(values, 0, 2));
    };
    return (
        <div className="wrapper--dasboard" id="wrapper--dasboard">
            <h1>🏁 React Final Form - Array Fields</h1>
            <h1>🏁 React Final Form - Array Fields</h1>
            <a href="https://github.com/erikras/react-final-form#-react-final-form">Read Docs</a>
            <FinalForm
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators,
                }}
                render={({
                    handleSubmit,
                    form: {
                        mutators: { push, pop },
                    }, // injected from final-form-arrays above
                    pristine,
                    form,
                    submitting,
                    values,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="buttons">
                        
                                <button type="button" onClick={() => pop('customers')}>
                                    Remove Customer
                                </button>
                            </div>


                            <FieldArray name="customers">
                                {({ fields }) =>
                                    fields.map((name, index) => (
                                        <div key={name}>
                                            <Field
                                                           name={`${name}.gen`} 
                                                          
                                                            component={InputPickerCustomField}
                                                            inputvalue={gen}
                                                            className="addorder--gen"
                                                            placeholder="..."
                                                            initialValue='nữ'
                                                            onSelect ={()=>{
                                                                form.change(`${name}.price`,10000)
                                                            }}
                                                            
                                                        />
                                            <Field name={`${name}.number`} onChange={(i)=>{
                                       
                                             const total =   values.customers.reduce((agr,item)=>{
                                                   return agr += item.total
                                                },0)
                                                
                                                form.change('tt', total)
                                                form.change('customers.price', total)
                                            }} component={NumberCustomField} placeholder="number" />
                                            <Field
                                                name={`${name}.price`}
                                                component={NumberFormatField}
                                                placeholder="price"
                                                
                                            />
                                         
                                            <span onClick={() => fields.remove(index)} style={{ cursor: 'pointer' }}>
                                                ❌
                                            </span>
                                        </div>
                                    ))
                                }
                            </FieldArray>

                            <Field name={`tt`} component="input" placeholder="tt" />

                            <div className="buttons">
                                <button type="submit" disabled={submitting || pristine}>
                                    Submit
                                </button>
                                <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                                    Reset
                                </button>
                            </div>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                    );
                }}
            />
        </div>
    );
}

export default AddOrderss;
