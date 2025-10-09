import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({ author, email, githubLink }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved</p>
      <Button variant="link" href={githubLink}>
        My Link Github's project: Movies Management
      </Button>
    </footer>
  );
}

export default MyFooter;