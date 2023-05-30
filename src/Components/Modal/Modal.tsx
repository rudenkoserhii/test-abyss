// import React, { useEffect, useState } from "react";
 import {
  Wrapper,
Title,
BoxButtons,
Button } from "./Modal.styled";

interface ModalProps {
  type(value: React.MouseEvent<HTMLButtonElement, MouseEvent>): any;
}

export const Modal = ({ type }: ModalProps) => {
  //   const valuesIn = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];
  //   const valuesOut = [
  //     20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
  //   ];

  //   const [zoomValue, setZoomValue] = useState<number>(100);
  //   const [values, setValues] = useState<number[]>(valuesIn);

  // useEffect(() => {transitZoomValue(zoomValue)}, [transitZoomValue, zoomValue])

  //   function onCenter() {
  //     const tree = document.querySelector(".tree") as HTMLDivElement | null;

  //     if (tree != null) {
  //       tree.style.top = "50%";
  //       tree.style.left = "50%";
  // // tree.style.transform = 'translateX(-50%) translateY(-50%) scale(1)';
  //     }
  //   }

  //   function zoomDecrement() {
  //     setValues(valuesOut);

  //     setZoomValue((prev) => (zoomValue <= 20 ? 20 : zoomValue % 10 !== 0 ? prev - 5 : prev - 10));
  //     setZoom(zoomValue <= 20 ? 20 : zoomValue - 10);
  //   }

  //   function zoomIncrement() {
  //     setValues(valuesOut);

  //     setZoomValue((prev) => (zoomValue >= 150 ? 150 : zoomValue % 10 !== 0 ? prev + 5 : prev + 10));
  //     setZoom(zoomValue >= 150 ? 150 : zoomValue + 10);
  //   }

  //   function setZoom(value: number) {
  //     const tree = document.querySelector(".tree") as HTMLDivElement | null;

  //     if (tree != null) {
  //       tree.style.transform = `translateX(-50%) translateY(-50%) scale(${
  //         value / 100
  //       })`;
  //     }
  //   }

  return (
    <Wrapper>
      <Title>What do you want to create?</Title>
      <BoxButtons>
        <Button type="button" onClick={(e) => type(e)}>
          Category
        </Button>
        <Button type="button" onClick={(e) => type(e)}>
          Service
        </Button>
      </BoxButtons>
    </Wrapper>
  );
};
