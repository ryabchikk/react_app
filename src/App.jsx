import MainPage from "./pages/MainPage/MainPage";
import style from "./global.module.scss"
import Playbar from "./components/Playbar/PLaybar";
import "./app.module.scss";
const App = () => (
  <div className={style.wrapper}>
    <div className={style.contentWrapper}>
      <MainPage/>
      <Playbar />
    </div>
  </div>
);
export default App
