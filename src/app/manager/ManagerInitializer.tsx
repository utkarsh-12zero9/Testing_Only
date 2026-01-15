"use client";

import { useEffect } from "react";
import { useManagerDispatch, useManagerSelector } from "./Redux/hooks";
import getManagerData from "./Redux/thunks/get-manager-data";
import getBusinessData from "./Redux/thunks/get-business-data";
import { selectManagerError, selectManagerStatus } from "./Redux/slice/manager-slice";
import CommonPopup from "@/globalComponents/Popups/Common/CommonPopup";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import { selectBusinessError, selectBusinessStatus } from "./Redux/slice/business-slice";

export default function ManagerInitializer() {
  const managerStatus = useManagerSelector(selectManagerStatus);
  const managerError = useManagerSelector(selectManagerError);

  const businessStatus = useManagerSelector(selectBusinessStatus);
  const businessError = useManagerSelector(selectBusinessError);

  const dispatch = useManagerDispatch();

  // get the manager data
  // if the user is not found, redirect  to /manager/login route.
  useEffect(() => {
    dispatch(getManagerData())
      .unwrap().then((manager) => {
        if (manager?.ID && manager?.accCreated >= 2) {
          dispatch(getBusinessData(manager?.ID));
        }
      })
  }, [dispatch]);

  // // get business data after getting mangerID
  // useEffect(() => {
  //   if (manager?.ID && manager?.accCreated >= 2) {
  //   }
  // }, [dispatch, manager?.ID, manager?.accCreated]);

  if (managerStatus === "error" || businessStatus === "error") return (
    <CommonPopup
      variant="warning"
      title="Something went wrong"
      buttonText={"Refresh"}
      onClick={() => window.location.reload()}>
      {managerError || businessError || "Please refresh the page"}
    </CommonPopup>
  );
  if (managerStatus === "loading" || businessStatus === "loading") return <LoadingPage />
  return null;
}