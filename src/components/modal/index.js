import './index.css';


export default function Modal({ succes, failures, handleClose }) {
    //{succes?.map(n => {
    //    return(
    //        <>
    //            {n}
    //        </>
    //    ) 
    //})}
    //
    //{failures?.map(n => {
    //    return (
    //        <>
    //            {n}
    //        </>
    //    )
    //})}


    console.log(succes);
    return (
        <main className="modal-main">
            <div className="modal-box">
                <div className="upper-box">
                    <div className='title-modal'>Enviados com sucesso: </div>
                    <div className='numbers-modal'>
                        {succes?.map(n => {
                            return(
                                <div>
                                    <span>
                                        {n.value}
                                    </span>
                                    
                                    <span>
                                        {n.status}
                                    </span>
                                </div>
                            ) 
                        })}
                    </div>
                </div>
                <div className="lower-box">
                    <div className='title-modal'>Erro durante o envio: </div>
                    <div className='numbers-modal'>
                        {failures?.map(n => {
                                return(
                                    <div>
                                    <span>
                                        {n.value}
                                    </span>
                                    
                                    <span>
                                        {n.status}
                                    </span>
                                </div>
                                ) 
                        })}
                    </div>
                </div>
                <div className="modal-btn-div">
                    <div className='order-btn' onClick={() => handleClose(false)}>FECHAR</div>
                </div>
            </div>       
        </main>
    )
}