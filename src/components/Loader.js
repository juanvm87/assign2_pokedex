import { LineWobble } from "@uiball/loaders";
const Loader = () => {
  return (
    <div className="container-loader">
      <LineWobble size={80} lineWeight={5} speed={1.75} color="black" />
    </div>
  );
};

export default Loader;