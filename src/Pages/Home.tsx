import { FC } from "react";
import ClothesList from "../components/Clothes/ClothesList";
import { RouteComponentProps } from "react-router-dom";

type Props = {};

const Home: FC<Props & RouteComponentProps> = () => {
  return (
    <section>
      <h3>Welcome</h3>
      <ClothesList />
    </section>
  );
};

export default Home;
