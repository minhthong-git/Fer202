export function Exercise2() {
  //khai bao mang so nguyen
    const number = [1, -20, 13, 4, -5, 6, 9, -10, 8, 7 ,-15];
  //khai bao mang chuoi name
    const name = ["An", "Linh", "Cuong", "Phuc", "Hung" ];
  //khai bao mang people gom 10 phan tu
    const people = [
        { id: 1, name: "An", age: 12 },
        { id: 2, name: "Linh", age: 15 },
        { id: 3, name: "Cuong", age: 18 },
        { id: 4, name: "Phuc", age: 20 },
        { id: 5, name: "Hung", age: 17 },
        { id: 6, name: "Mai", age: 22 },
        { id: 7, name: "Hoa", age: 16 },
        { id: 8, name: "Long", age: 19 },
        { id: 9, name: "Nam", age: 13 },
        { id: 10, name: "Vy", age: 11 },
    ];
  //loc ra nhung nguoi tuoi teen 
  const teenList = people.filter(p =>p.age >= 13 && p.age <= 19);
  //tinh tong cac phan tu trong mang
    const sum = number.reduce((acc, cur) => acc + cur, 0);
    return (
        <>
            <p> Cac phan tu cua mang la: </p>
            <ul>
                {number.map((number, index) => (
                    <li key={index}>{number}</li>
                    ))}
            </ul>
            <p> Tong cac phan tu cua mang la: <strong>(sum)</strong></p>
            <p> So luong phan tu la: {number.length}</p>
            <p> Hien thi danh sach ten tang dan</p>
            <ul>
                {name.sort().map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </ul>
            <p> Hien thi danh sach nguoi tuoi teen</p>
            <ul>
                {teenList.map((person) => (
                <li key={person.id}>
            {person.name} - {person.age}
          </li>
        ))}
      </ul>
        </>
    );
} 