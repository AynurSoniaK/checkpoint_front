import React from 'react';
import { useRouter } from 'next/router';
import { useCountryQuery } from '@/graphql/generated/schema';
import Header from '@/components/Header';

const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;
  console.log(code)
  const { data } = useCountryQuery({
    variables: { code: code as string},
    skip: typeof code === "undefined",
  });

  const country = data?.country;

  if (!country) return <p>Country not found.</p>;

  return (
    <div>
      <Header />
      <h1>Country Details</h1>
      <p>{country.code}</p>
      <p>{country.name}</p>
      <p>{country.emoji}</p>
      <p>{country.continent?.name}</p>
    </div>
  );
};

export default CountryDetails;
