import { useCountriesQuery, CountriesDocument  } from "@/graphql/generated/schema";
import { gql, useMutation } from "@apollo/client";
import React, { useState } from 'react';

export default function Countries() {
  const { data } = useCountriesQuery();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  const ADD_COUNTRY = gql`
    mutation AddCountry($data: NewCountryInput!) {
      addCountry(data: $data) {
        code
        name
        emoji
      }
    }
  `;

  const [createCountry] = useMutation(ADD_COUNTRY);

  const handleAddCountry = async () => {
    try {
      await createCountry({
        variables: { data: { code, name, emoji } },
        refetchQueries: [{ query: CountriesDocument }]
      });
      setCode('');
      setName('');
      setEmoji('');
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    handleAddCountry();
  };

  return (
    <div className="min-h-screen">
      <h1>List of Countries</h1>
      <p>Add a country</p>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label htmlFor="code" className="w-20 font-bold">Code:</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="name" className="w-20 font-bold">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="emoji" className="w-20 font-bold">Emoji:</label>
          <input
            id="emoji"
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-2 py-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Country
        </button>
      </form>
      <ul>
        {data?.countries.map((country) => (
          <li key={country.id}>
            <a href={`/${country.code}`}>
              <h2>{country.name}</h2>
              <p>{country.emoji}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
