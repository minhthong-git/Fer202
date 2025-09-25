export function Exercise4() {
  const ages = [33, 12, 20, 16];

  // lấy first, bỏ qua phần tử thứ 2, lấy third, phần còn lại
  const [first, , third = 0, ...restAges] = ages;

  return (
    <>
      <h2>Exercise4</h2>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </>
  );
}
