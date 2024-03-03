import { Loader } from '@googlemaps/js-api-loader';
import React from 'react';
import styles from './SurveyLocation.module.scss';
import { GOOGLE_MAPS_API_KEY } from '../../../config/constants';

interface SurveyLocationProps {
  city: string;
  country: string;
  preventFocus?: boolean;
  required?: boolean;
  onChangeHandler: (requestedCity: string, requestedCountry: string) => void;
}

const SurveyLocation: React.FC<SurveyLocationProps> = (
  props: SurveyLocationProps
) => {
  const { preventFocus, city, country, required, onChangeHandler } = props;

  const inputRef = React.useRef<any>(null);

  let autocomplete: any;

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      autocomplete = new (window as any).google.maps.places.Autocomplete(
        inputRef.current,
        { types: ['(cities)'] }
      );

      if (city !== '') {
        inputRef.current.value = `${city}, ${country}`;
      }
      !preventFocus && inputRef.current.focus();

      autocomplete.addListener('place_changed', locationChangeHandler);
    });
  }, []);

  const locationChangeHandler = () => {
    const place = autocomplete.getPlace()?.formatted_address.split(',');
    onChangeHandler(place[0], place[place.length - 1]);
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        required={required}
        autoComplete="off"
      />
    </div>
  );
};

export default SurveyLocation;
