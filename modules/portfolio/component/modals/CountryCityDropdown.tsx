import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

type OptionType = {
  label: string;
  value: string;
  cities: string[];
};

type Props = {
  selectedCountry: string | null;
  selectedCity: string | null;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

const CountryCityDropdown: React.FC<Props> = ({ onCountryChange, onCityChange }) => {
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<string[]>([]); // Store cities as a plain string array
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    // Fetch the list of countries from the API
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        if (!data.error && data.data && data.data.length > 0) {
          // Extract the list of countries from the API response
          const countryNames = data.data.map((country: { country: string; cities: string[] }) => ({
            label: country.country,
            value: country.country,
            cities: country.cities, // Include the list of cities for each country
          }));

          setCountries(countryNames);
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Find the selected country and its cities
      const selectedCountryData = countries.find((country) => country.value === selectedCountry);

      if (selectedCountryData) {
        setCities(selectedCountryData.cities);
      }
    }
  }, [selectedCountry, countries]);

  return (
    <div className="w-full flex md:flex-row gap-4 justify-between">
      <div className="w-full md:w-[47%]">
        <label>
          Select Country
          <Select
            onValueChange={(value: string) => {
              setSelectedCountry(value);
            }}
            value={selectedCountry || ''}
          >
            <SelectTrigger className="border-[#59595977] text-green-300 h-[50px] rounded-[10px]">
              <SelectValue defaultValue={selectedCountry || ''} placeholder={selectedCountry} />
            </SelectTrigger>
            <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
      <div className="w-full md:w-[47%]">
        <label>
          Select City
          <Select
            onValueChange={(value: string) => {
              setSelectedCity(value);
            }}
            value={selectedCity || ''}
          >
            <SelectTrigger className="border-[#59595977] text-green-300 h-[50px] rounded-[10px]">
              <SelectValue defaultValue={selectedCity || ''} placeholder={selectedCity} />
            </SelectTrigger>
            <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
    </div>
  );
};

export default CountryCityDropdown;
