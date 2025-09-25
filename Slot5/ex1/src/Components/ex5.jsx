export function Exercise5() {
  const people = [
    { name: "An", age: 12 },
    { name: "Binh", age: 15 },
    { name: "Chi", age: 19 },
    { name: "Dung", age: 22 }
  ];

  // lọc tuổi teen
  const teenList = people
    .filter(p => p.age >= 13 && p.age <= 19)
    .map(p => `${p.name} (${p.age})`);

  return (
    <>
      <h2>Exercise5</h2>
      <ul>
        {teenList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
