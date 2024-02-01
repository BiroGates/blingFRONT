

import { useState } from 'react';
import './index.css'



export default function AddOrder() {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');
    
    const handleEnter = (e) => {
        console.log(e);
        if (e.key === 'Enter') {
            pushToOrders();
            console.log("Teste");
        }
    }

    const pushToOrders = (e) => {
        setOrders([...orders, value]);
        setValue('')
    };
    
    return (
        <div className="order-main">
            <div className="upper-order">
                <div className="wraper">
                    <div className='orders-title'>DIGITE OS NUMEROS</div>
                    <div className="orders">
                        {orders.map(x => {
                            return (
                                <span>{x}</span>
                            )
                        })}
                    </div>
                    <div className="order-footer">
                        <input className='order-input' value={value} onKeyDown={handleEnter} onChange={(e) => setValue(e.target.value)} />
                        <div className='order-btn' onClick={() => pushToOrders()}>ADICIONAR</div>
                    </div>
                </div>
            </div>
            <div className="lower-order">

                <div className="lower-wraper">
                        <div className='row'>
                            <div className='orders-title'>Enviar de:</div>
                            <div className='systems'>
                                <div className='system-wraper'>
                                    <span className='system-icon'>SYSA</span>
                                    <input type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='orders-title'>Enviar de:</div>
                            <div className='systems'>
                                <div className='system-wraper'>
                                    <span className='system-icon'>SYSA</span>
                                    <input type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>


                    <div className="order-footer">
                            <div className='order-btn' onClick={() => pushToOrders()}>ENVIAR</div>
                    </div>
                </div>
            </div>

        </div>
    );

}