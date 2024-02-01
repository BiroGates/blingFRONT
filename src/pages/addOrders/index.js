
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import './index.css'



export default function AddOrder() {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');

    const [systemAToken, setSystemAToken] = useState();
    const [systemBToken, setSystemBToken] = useState();
    const [systemCToken, setSystemCToken] = useState();

    const[de, setDe] = useState();
    const[para, setPara] = useState();

    const pushToOrders = (e) => {
        setOrders([...orders, value]);
        setValue('')
    };
    
    const getSystemTokens = () => {
        setSystemAToken(Cookies.get('SYSA'));
        setSystemBToken(Cookies.get('SYSB'));
        setSystemCToken(Cookies.get());
    }

    const handleDe = (sys, e) => {

        if(sys === "SYSA" && e.target.checked) {
            console.log(de, 'aaaaaaaaa');
            setDe(systemAToken);
        }else {
            setDe('');
        }
        
        if(sys === "SYSB" && e.target.checked) {
            setDe(systemBToken);
        }else {
            setDe('');
        }
        
        
        // if(sys === "SYSA") {
        //     setDe(systemAToken);
        // }
    }
    
    const handlePara = (sys, e) => {
        if(sys === "SYSA" && e.target.checked) {
            console.log(para);
            setPara(systemAToken);
        }else {
            console.log('gone throuy');
            setPara('');
        }
        
        if(sys === "SYSB" && e.target.checked) {
            setPara(systemBToken);
        }else {
            setPara('');
        }
        
        // if(sys === "SYSA") {
        //     setDe(systemAToken);
        // }
    }

    useEffect(() => {
        getSystemTokens()
    }, []);

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
                        <input className='order-input' value={value} onChange={(e) => setValue(e.target.value)} />
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
                                    <input onClick={(e) => handleDe('SYSA', e)} type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input onClick={(e) => handleDe('SYSB', e)} type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input onClick={(e) => handleDe('SYSC', e)} type="checkbox" />
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='orders-title'>Enviar de:</div>
                            <div className='systems'>
                                <div className='system-wraper'>
                                    <span className='system-icon'>SYSA</span>
                                    <input onClick={(e) => handlePara('SYSA', e)} type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input onClick={(e) => handlePara('SYSB', e)} type="checkbox" />
                                    <span className='system-icon'>SYSA</span>
                                    <input onClick={(e) => handlePara('SYSC', e)} type="checkbox" />
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