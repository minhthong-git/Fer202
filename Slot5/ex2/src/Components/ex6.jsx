export function Exercise6() {
  const companies = [
    { name: "Company A", category: "Finance", start: 1990, end: 2005 },
    { name: "Company B", category: "Retail", start: 1985, end: 1999 },
    { name: "Company C", category: "Tech", start: 2000, end: 2020 },
    { name: "Company D", category: "Auto", start: 1995, end: 2010 },
  ];

  // copy & sort theo end tăng dần
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

  // lấy 3 công ty đầu
  const top3 = sortedCompanies.slice(0, 3);

  return (
    <>
      <h2>Exercise6</h2>
      <ul>
        {top3.map((c, index) => (
          <li key={index}>{c.name} - {c.end}</li>
        ))}
      </ul>
    </>
  );
}
