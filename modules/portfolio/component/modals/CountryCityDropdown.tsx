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
  const [cities, setCities] = useState<string[]>([]); // Store cities as a plain string array
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
    <div className="w-full flex md:flex-row gap-4 justify-between mt-[-15px]">
      <div className="w-full md:w-[47%]">
        <label>
          Select Country
          <Select
            onValueChange={(value: string) => {
              setSelectedCountry(value);
            }}
            value={selectedCountry || ''}
          >
            <SelectTrigger className="border-[#59595977] text-grey-300 h-[50px] rounded-[10px]">
              <SelectValue defaultValue={selectedCountry || ''} placeholder={"Select Country"} />
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
            <SelectTrigger className="border-[#59595977] text-grey-300 h-[50px] rounded-[10px]">
              <SelectValue defaultValue={selectedCity || ''} placeholder={"Select City"} />
            </SelectTrigger>
            <SelectContent className="border-[#FFFFFF] text-gray-300 hover:border-green-500 bg-white-100" style={{ maxHeight: '200px', overflowY: 'auto' }}>
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
