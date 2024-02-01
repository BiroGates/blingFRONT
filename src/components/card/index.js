import './index.css';
import icon from '../../assets/icons8-coração-50.png';

function Card({ systemName, urlToAuth }) {

  const handleClick = () => {
    window.location.href = urlToAuth;
  }

  return (
    <div onClick={() => handleClick()} className="card-main">
      <div className='upper'>
        <div className='icon'>
          <img className='rounded-image' src={icon} alt="" />
        </div>
      </div>
      <div className='lower'>
        <span>{systemName}</span>
      </div>
    </div>
  );
}

export default Card;
