


import { Link } from 'react-router-dom'
import Astronauta from '../../assets/astronaut.png'

import './index.css'



export default function ErrorPage() {


    return (
        <main className="error-main">
            <img alt="astronaut" src={Astronauta} className="error-img"/>
            <div className="error-text">Algo deu errado, se persistir contate os admnistradores</div>
            <div className="error-btn">
                <Link to="/" className='er-btn'> VOLTAR </Link>
            </div>
        </main>
    )

}