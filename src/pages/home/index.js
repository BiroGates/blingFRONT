import { useEffect, useState } from 'react';
import Card from '../../components/card';
import './index.css';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function Home() {
  const [canGoToNextPage, setCanGoNextPage] = useState(false);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const system = queryParams.get('system');
  const token = queryParams.get('token');


  const setCookies = () => {
    Cookies.set(system, token);
  }


  useEffect(() => {
    if (system && token) {
      setCookies();
      toast.dark('🚀 Autenticação realizada com sucesso');
    }

    if (Cookies.get('SYSA') && Cookies.get('SYSB')) {
      setCanGoNextPage(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="main">
      <div className='content'>
        <div className='title'>
          <span>Bem vindo</span>
          <span>Você precisa se autentica em todos os serviços antes de prosseguir</span>
        </div>
        <div className='cards'>
          <Card
            urlToAuth='https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=adbc37d2c8b943145a707dc9392a271cd8294b7b&state=78bfd79b1153c128c5672fa7551cccc8'
            systemName="SYSA" />
          
          <Card
          urlToAuth='https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=ad83574954a5848ee8b715e56b835bdeabafdb72&state=4dadb5d5a6a5c51fa3cc2f4bd35e1872f' 
          systemName="SYSB" />
          
          <Card
          urlToAuth='https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=ad83574954a5848ee8b715e56b835bdeabafdb72&state=4dadb5d5a6a5c51fa3cc2f4bd35e1872f' 
          systemName="SYSC" />
        </div>
        <div className='btn-layer'>
          {
            canGoToNextPage ? (
              <div className='btn'>CONTINUAR</div>
            ) : (<div></div>)
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
