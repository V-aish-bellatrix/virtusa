import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressDisplay = ({ lat, lon }) => {
  const [address, setAddress] = useState('Fetching address...');

  useEffect(() => {
    if (lat && lon) {
      axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          format: 'jsonv2',
          lat,
          lon
        },
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'virtusa-traffic-app/1.0 (your-email@example.com)'
        }
      })
      .then(res => setAddress(res.data.display_name || 'Unknown location'))
      .catch(() => setAddress('Unknown location'));
    }
  }, [lat, lon]);

  return <span>{address}</span>;
};

export default AddressDisplay; 