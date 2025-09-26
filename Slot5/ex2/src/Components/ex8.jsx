export function Exercise8() {
  const ages = [33, 12, 20, 16, 18, 25, 14, 19];

  const stats = ages.reduce(
    (acc, age) => {
      acc.total += age;
      if (age < acc.min) acc.min = age;
      if (age > acc.max) acc.max = age;

      if (age >= 13 && age <= 19) {
        acc.buckets.teen += 1;
      } else if (age >= 20) {
        acc.buckets.adult += 1;
      }

      return acc;
    },
    { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
  );

  return (
    <>
      <h2>Exercise8</h2>
      <p>Total: {stats.total}, Min: {stats.min}, Max: {stats.max}</p>
      <p>Buckets: teen = {stats.buckets.teen}, adult = {stats.buckets.adult}</p>
    </>
  );
}
