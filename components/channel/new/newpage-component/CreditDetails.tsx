import React, { useState, useEffect } from "react";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";

import Style from "../../../../styles/pages/channel/new/newpage-component/credit-details.module.css";
import Link from "next/link";
import InputText from "../../../modals/InputText";
import SmallTextBlack from "../../../modals/SmallTextBlack";
import BlueButton from "../../../modals/BlueButton";
import CancelButton from "../../../modals/CancelButton";
import { useDispatch, useSelector } from "react-redux";
import {
  walletConnectReducer,
  walletReducer,
} from "../../../../redux/style-slice/general-style/GenrealStyle";
import { ActionGenaralChanging } from "../../../../redux/channel-slice/ChannelSlice";
const CreditDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var walletconnect = JSON.parse(
      localStorage.getItem("walletconnect") || "false"
    );
    const iswalletConnect = walletconnect?.connected;
    console.log(iswalletConnect);

    if (iswalletConnect) {
      dispatch(
        walletReducer({
          value: false,
          walletAdress: walletconnect?.accounts[0],
        })
      );
    }
    if (!iswalletConnect && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((handleAccountsChanged: any) => {
          if (handleAccountsChanged && handleAccountsChanged.length >= 1) {
            dispatch(
              walletReducer({
                value: false,
                walletAdress: handleAccountsChanged[0],
              })
            );
          }
        })
        .catch(console.error);
    }

    dispatch(
      ActionGenaralChanging({
        id: "wallet_id",
        wallet_id: walletAdressInput,
      })
    );
  });

  const HandelSubmiteNewGeneral = () => {
    dispatch(walletConnectReducer({ value: true }));
  };
  const walletAdress = useSelector(
    (state: any) => state.GenrealStyle.walletAdress
  );
  const [walletAdressInput, setWalletAdressInput] = useState(walletAdress);

  const HandelChangeDeposit = (e: any) => {
    setWalletAdressInput(e.target.value);
    dispatch(
      ActionGenaralChanging({
        id: "wallet_id",
        wallet_id: e.target.value,
      })
    );
  };

  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <InputText
            // Number={true}
            Icon={<FcCircuit />}
            HandelChange={HandelChangeDeposit}
            Text={"Wallet address"}
            Placeholder="enter your address"
            DefualtValue={walletAdress}
            // Value={walletAdressInput.length > 1 && walletAdressInput}
          />

          <SmallTextBlack
            Text={
              "all transactions will be sent to the wallet address you entered above, you can change it anytime."
            }
          />
          <BlueButton
            HandelClick={HandelSubmiteNewGeneral}
            Text={"connect  wallet"}
          />

          {/* <SmallTextBlack Icon={<FcCircuit />} Text={"0.2581 available. ."} /> */}
        </div>
      </div>
    </div>
  );
};

export default CreditDetails;
