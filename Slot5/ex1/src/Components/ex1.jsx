export function Exercise1() {
    const double = x => x * 2;
    const issPositive = x => x > 8;
    return (
        <>
            <p> Hello <strong>Exercise1</strong></p>
            <h2>Chi tiết bài tập 1</h2>
            <p>Hàm double(5): {double(5)}</p>
            <p>issPositive 5: {issPositive(5).toString()}</p>
        </>
    );
}
