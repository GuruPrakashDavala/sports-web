/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui";

const container: ThemeUICSSObject = {
  width: "80vw",
  margin: "40px auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const searchBox = {
  widht: "80%",
  padding: "10px 15px",
  border: "1px solid #ccc",
  borderRadius: "20px",
};

const links = {
  marginTop: "30px",
};

const link = {
  margin: "10px",
  color: "blue",
  textDecoration: "underline",
  "&:hover": {
    color: "red",
  },
};

const NotFoundPage = () => {
  return (
    <div sx={container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, there is nothing to see here</p>
      {/* <p>
        Use the search box or the links below to explore our amazing application
      </p>
      <input
        type="search"
        placeholder="Just a dummy search box..."
        sx={searchBox}
      />
      <div sx={links}>
        <Link href="/" sx={link}>
          Homepage
        </Link>
        <Link href="/latest" sx={link}>
          Latest Products
        </Link>
        <Link href="/contact" sx={link}>
          Contact US
        </Link>
      </div> */}
    </div>
  );
};

export default NotFoundPage;
