import { faDog, faPersonSwimming, faWifi } from '@fortawesome/free-solid-svg-icons';
import './HotelCharacteristicsIcons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HotelCharacteristicsIcons = ({ has_pool, free_wifi, pets_allowed }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      {has_pool ? (
        <div className='icon-pos'>
          <FontAwesomeIcon icon={faPersonSwimming} />
          <b>has an in-house swimming pool</b>
        </div>
      ) : (
        <div className='icon-neg'>
          <FontAwesomeIcon icon={faPersonSwimming} />
          no in-house swimming pool
        </div>
      )}

      {free_wifi ? (
        <div className='icon-pos'>
          <FontAwesomeIcon icon={faWifi} />
          <b>has free WIFI</b>
        </div>
      ) : (
        <div className='icon-neg'>
          <FontAwesomeIcon icon={faWifi} />
          no free WIFI
        </div>
      )}

      {pets_allowed ? (
        <div className='icon-pos'>
          <FontAwesomeIcon icon={faDog} />
          <b>pets allowed</b>
        </div>
      ) : (
        <div className='icon-neg'>
          <FontAwesomeIcon icon={faDog} />
          pets forbidden
        </div>
      )}
    </div>
  );
};

export default HotelCharacteristicsIcons;
