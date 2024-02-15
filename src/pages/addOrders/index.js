
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../../components/modal';



export default function AddOrder() {
    const [modalOpen, setModalOpen] = useState(false);

    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');

    const [systemAToken, setSystemAToken] = useState();
    const [systemBToken, setSystemBToken] = useState();
    const [systemCToken, setSystemCToken] = useState();

    const [de, setDe] = useState();
    const [para, setPara] = useState();

    const [checkSystem, setCheckSystem] = useState({
        SYSA: false,
        SYSB: false,
        SYSC: false,
    })

    const [checkSystemPara, setCheckSystemPara] = useState({
        SYSA: false,
        SYSB: false,
        SYSC: false,
    })

    const pushToOrders = (e) => {
        setOrders([...orders, { status: null, erro: null, value }]);
        setValue('')
    };

    const getSystemTokens = () => {
        setSystemAToken(Cookies.get('SYSA'));
        setSystemBToken(Cookies.get('SYSB'));
        setSystemCToken(Cookies.get('SYSC'));
    }

    //{
    //    "data": [
    //        {
    //            "numeroAntigoDoPedido": 2010,
    //            "numeroNovoDoPedido": 596,
    //            "status": "Sucesso"
    //        },
    //        {
    //            "numeroAntigoDoPedido": 2410,
    //            "Erro": "O número de pedido informado não existe",
    //            "status": "Erro na aplicação"
    //        }
    //    ]
    //}

    async function makeRequest() {
        try {

            toast.dark("Enviando numeros...");
            const { data } = await axios.post(process.env.REACT_APP_API_MOCK === true ? `${process.env.REACT_APP_API_URL_MOCK}` : `${process.env.REACT_APP_API_URL}sendOrderSale`,
                {
                    authorizationCodeSYS01: de,
                    authorizationCodeSYS02: para,
                    numberSaleOrders: orders,
                });



            console.log(data);
            data.data.map((item, index) => {
                const copyOrders = orders;
                if (item.numeroAntigoDoPedido === orders[index].value) {
                    copyOrders[index].status = item.status;
                }
                if (item.Erro) {
                    copyOrders[index].erro = item.Erro;
                }
                console.log(copyOrders);
                setOrders(copyOrders);
            });
            setModalOpen(true);
            toast.dark("Numeros enviados com sucesso");

        } catch (e) {
            console.log(e.message);
            toast.error("❌ Erro inesperado tente novamente");
        }
    }


    const checkIfThereIsAnyOtherBesidesMeChecked = (sys, obj) => {
        for (const key in checkSystem) {
            if (obj[key] && String(key) !== sys) {
                return true;
            }
        }
        return false
    }

    const handleDe = (sys, e) => {
        if (sys === "SYSA" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe(systemAToken);
            setCheckSystem((prev) => {
                const x = {
                    ...prev,
                    SYSA: true
                }
                return x;
            });
        } else if (sys === "SYSA" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setCheckSystem((prev) => {
                const x = {
                    ...prev,
                    SYSA: false
                }
                return x;
            });
            setDe('');
        }

        if (sys === "SYSB" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe(systemBToken);
            setCheckSystem({ ...checkSystem, SYSB: true });
        } else if (sys === "SYSB" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe('');
            setCheckSystem({ ...checkSystem, SYSB: false });
        }

        if (sys === "SYSC" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe(systemCToken);
            setCheckSystem({ ...checkSystem, SYSC: true });
        } else if (sys === "SYSC" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystem) === false) {
            setDe('');
            setCheckSystem({ ...checkSystem, SYSC: false });
        }
    }

    const handlePara = (sys, e) => {
        if (sys === "SYSA" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara(systemAToken);
            setCheckSystemPara((prev) => {
                const x = {
                    ...prev,
                    SYSA: true
                }
                return x;
            });
        } else if (sys === "SYSA" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setCheckSystemPara((prev) => {
                const x = {
                    ...prev,
                    SYSA: false
                }
                return x;
            });
            setPara('');
        }

        if (sys === "SYSB" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara(systemBToken);
            setCheckSystemPara({ ...checkSystemPara, SYSB: true });
        } else if (sys === "SYSB" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara('');
            setCheckSystemPara({ ...checkSystemPara, SYSB: false });
        }

        if (sys === "SYSC" && e.target.checked && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara(systemCToken);
            setCheckSystemPara({ ...checkSystemPara, SYSC: true });
        } else if (sys === "SYSC" && e.target.checked === false && checkIfThereIsAnyOtherBesidesMeChecked(sys, checkSystemPara) === false) {
            setPara('');
            setCheckSystemPara({ ...checkSystemPara, SYSC: false });
        }
    }

    useEffect(() => {
        getSystemTokens()
    }, [orders]);

    return (
        <div className="order-main">
            {modalOpen ? 
                <Modal
                    succes={orders.filter(x => x.status === "Sucesso")}
                    failures={orders.filter(x => x.status === "Erro na aplicação")}
                    handleClose={setModalOpen}
                /> : <></>
            }

            <div className="upper-order">
                <div className="wraper">
                    <div className='orders-title'>DIGITE OS NUMEROS DOS PEDIDOS QUE DESEJA ADICIONAR</div>
                    <div className="orders">
                        {orders.map((x, index) => {
                            return (
                                <div key={index} className='wraper-span'>
                                    <span> {x.value}</span> <span> {x.erro ?? x.status }</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="order-footer">
                        <input type='number' className='order-input' value={value} onChange={(e) => setValue(Number(e.target.value))} />
                        <div className='order-btn' onClick={() => pushToOrders()}>ADICIONAR</div>
                        <div className='order-btn' onClick={() => setOrders([])}>LIMPAR</div>
                    </div>
                </div>
            </div>
            <div className="lower-order">

                <div className="lower-wraper">
                    <div className='row'>
                        <div className='orders-title'>Enviar de:</div>
                        <div className='systems'>
                            <div className='system-wraper'>
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_A_NAME}</span>
                                <input onChange={(e) => handleDe('SYSA', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSA", checkSystem)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_B_NAME}</span>
                                <input onChange={(e) => handleDe('SYSB', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSB", checkSystem)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_C_NAME}</span>
                                <input onChange={(e) => handleDe('SYSC', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSC", checkSystem)} type="checkbox" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='orders-title'>Enviar para:</div>
                        <div className='systems'>
                            <div className='system-wraper'>
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_A_NAME}</span>
                                <input onChange={(e) => handlePara('SYSA', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSA", checkSystemPara)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_B_NAME}</span>
                                <input onChange={(e) => handlePara('SYSB', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSB", checkSystemPara)} type="checkbox" />
                                <span className='system-icon'>{process.env.REACT_APP_SYSTEM_C_NAME}</span>
                                <input onChange={(e) => handlePara('SYSC', e)} disabled={checkIfThereIsAnyOtherBesidesMeChecked("SYSC", checkSystemPara)} type="checkbox" />
                            </div>
                        </div>
                    </div>


                    <div className="order-footer">
                        <div className='order-btn' onClick={() => makeRequest()}>ENVIAR</div>
                    </div>
                </div>
            </div>

        </div>
    );

}