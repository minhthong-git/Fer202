import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
    return (
       <div className="footer">
       <h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}></h2>
       <MyFooter author="ThongNM" email = "thongnmde180396@fpt.edu.vn" linkGithub="Movie Management Project" />
       </div>
    );
}
