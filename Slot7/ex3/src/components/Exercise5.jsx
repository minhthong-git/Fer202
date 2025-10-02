export default function Exercise5() {
  return (
    <section className="my-5">
      
      <div className="bg-warning text-center py-3">
        <h2>Students Detail</h2>
      </div>

      
      <div className="container my-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/200x200.png?text=Student+1" className="card-img-top" alt="Student 1"/>
              <div className="card-body text-center">
                <h6>Nguyen Van A</h6>
                <p>ID: DE180001</p>
                <div>
                  <label className="me-2"><input type="radio" name="st1" /> Absent</label>
                  <label><input type="radio" name="st1" /> Present</label>
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card">
              <img src="https://via.placeholder.com/200x200.png?text=Student+2" className="card-img-top" alt="Student 2"/>
              <div className="card-body text-center">
                <h6>Tran Van B</h6>
                <p>ID: DE180002</p>
                <div>
                  <label className="me-2"><input type="radio" name="st2" /> Absent</label>
                  <label><input type="radio" name="st2" /> Present</label>
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-warning text-center py-3">
        <small>© 2023 - Student Page</small>
      </footer>
    </section>
  );
}
