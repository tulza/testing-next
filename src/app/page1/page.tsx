import RouteButton from "../common/RouteButton";

export default function Home() {
  return (
    <>
      <div className="bg-white w-[dvw] h-[110dvh] grid place-items-center text-black">
        <RouteButton path="page">page1</RouteButton>
      </div>
      {/* <div className="bg-slate-500 w-dvw h-dvh grid place-items-center text-black">
        <RouteButton path="page">page1</RouteButton>
      </div> */}
    </>
  );
}
