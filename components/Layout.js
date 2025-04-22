import Header from "./Header";

function Layout(props) {
  return (
    <div className="container mx-auto max-w-5xl transition-colors duration-200">
      <Header />
      {props.children}
    </div>
  );
}

export default Layout;
