import ManagerInitializer from "./ManagerInitializer";
import ManagerProvider from "./Redux/Provider";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="block lg:hidden">
        <ManagerProvider>
          <ManagerInitializer />
          {children}
        </ManagerProvider>
      </div>
      <div className="h-screen w-screen hidden text-white lg:flex justify-center align items-center">
        <h1 className="text-3xl">This Page is Blocked in desktop devices. Kindly access from Mobile/Tablet</h1>
      </div>
    </>
  )
};
