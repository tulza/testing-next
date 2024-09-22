import RouteButton from "../common/RouteButton";

export default function Home() {
  return (
    <>
      <div className="bg-white w-dvw h-dvh grid place-items-center text-black">
        <RouteButton path="page1">page</RouteButton>
      </div>
      <div className="bg-white w-dvw h-dvh grid place-items-center text-black">
        <RouteButton path="page1">page</RouteButton>
      </div>
    </>
  );
}
