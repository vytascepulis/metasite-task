import "./style.sass";
import Header from "../../components/Header";

const App = () => {
  return (
    <main className="main">
      <Header />
      <div className="content">
        <div className="inner">content</div>
      </div>
    </main>
  );
};

export default App;
