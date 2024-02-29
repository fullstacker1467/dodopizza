import React from "react";
import { Combo } from "../Components/Combo/Combo";
import { Pizza } from "../Components/Pizza/Pizza";
import { Snack } from "../Components/Snack/Snack";
import { Desert } from "../Components/Desert/Desert";

export const Home = () => {
  return (
    <div className="py-20">
      <Combo />
      <Pizza />
      <Snack />
      <Desert />
    </div>
  );
};
