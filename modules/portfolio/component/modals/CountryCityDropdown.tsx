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
  setSelectedCity: (city: string) => void;
  setSelectedCountry: (country: string) => void;
};
const CountryCityDropdown: React.FC<Props> = ({
  selectedCity,
  selectedCountry,
  setSelectedCity,
  setSelectedCountry,
}) => {
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [cityError, setCityError] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((data) => {
        if (!data.error && data.data && data.data.length > 0) {

          const countryNames = data.data.map((country: { country: string; cities: string[] }) => ({
            label: country.country,
            value: country.country,
            cities: country.cities,
          }));
          setCountries(countryNames);
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);
  useEffect(() => {
    if (!selectedCountry) {
      setCityError('Pick a country first');
      setCities([]);
    } else {
      setCityError(null);
      if (selectedCountry) {
        const selectedCountryData = countries.find((country) => country.value === selectedCountry);
        if (selectedCountryData) {
          setCities(selectedCountryData.cities);
        }
      }
    }
  }, [selectedCountry, countries]);

  return (
    <div className="w-full flex md:flex-row gap-4 justify-between mt-[-17px]">
      <div className="w-full md:w-[47%]">
        <label>
          Select Country
          <Select
            onValueChange={(value: string) => {
              setSelectedCountry(value);
            }}
            value={selectedCountry || ''}
          >
            <SelectTrigger className="border-[#59595977]  h-[50px] rounded-[10px]">
              <SelectValue
                defaultValue={selectedCountry || ''}
                placeholder='Select Country'
                className="hover:border-green-500"
              />
            </SelectTrigger>
            <SelectContent className="hover:border-green-500" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {countries.map((country) => (
                <SelectItem className="text-black hover:border-green-500" key={country.value} value={country.value}>
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
            <SelectTrigger className="border-[#59595977] text-grey-300 h-[50px] rounded-[10px]">
              <SelectValue
                defaultValue={selectedCity || ''}
                placeholder='Select City'
                className="hover:border-green-500"
              />
            </SelectTrigger>
            <SelectContent
              className="border-[#FFFFFF]  hover:border-green-500 bg-white-100"
              style={{ maxHeight: '200px', overflowY: 'auto' }}
            >
              {cities.map((city) => (
                <SelectItem className="text-black" key={city} value={city}>
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
