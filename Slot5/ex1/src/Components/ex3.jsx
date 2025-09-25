export function Exercise3() {
  const person = {
    name: "An",
    age: 20,
    address: {
      street: "123 Le Loi",
      // city: "Da Nang"   // thử comment để test mặc định
    }
  };

  // destructuring lồng nhau, city mặc định "Unknown City"
  const { address: { street, city = "Unknown City" } } = person;

  return (
    <>
      <h2>Exercise3</h2>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </>
  );
}
