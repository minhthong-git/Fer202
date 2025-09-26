export function Exercise7() {
  const companies = [
    { name: "Company A", category: "Finance", start: 1990, end: 2005 },
    { name: "Company B", category: "Retail", start: 1985, end: 1999 },
    { name: "Company C", category: "Tech", start: 2000, end: 2020 },
  ];

  // copy company[0] và tăng start thêm 1, không làm đổi companies[0]
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // hàm concatAll dùng rest parameter
  const concatAll = (...arrays) => arrays.reduce((acc, cur) => [...acc, ...cur], []);

  const merged = concatAll([1, 2], [3], [4, 5]);

  return (
    <>
      <h2>Exercise7</h2>
      <p>Original company[0]: {companies[0].name} - {companies[0].start}</p>
      <p>New company0: {company0New.name} - {company0New.start}</p>
      <p>Kết quả concatAll: {merged.join(", ")}</p>
    </>
  );
}
