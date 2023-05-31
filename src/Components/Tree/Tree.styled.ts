import styled from "styled-components";
import { ReactComponent as Icon } from "../../Assets/svg/btn_x.svg";
import { ReactComponent as Edit } from "../../Assets/svg/btn_edit.svg";
import { ReactComponent as Done } from "../../Assets/svg/btn_done.svg";

export const BackDrop = styled.div`
  position: absolute;
top: 0;
left: 0;

  height: 100vh;
width: 100vw;
`;

export const Wrapper = styled.div`
  cursor: auto;

  position: absolute;
  left: 50%;
  top: 20%;

  transform: translateX(-50%) scale(1);

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;

  &:active {
    cursor: move;
  }
`;

export const Block = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

interface Props {
  width: string;
  left: string;
  children: any;
  id: string;
  className: string;
}

export const Line = styled.div<Props>`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;

  &::before {
    content: "";
    position: absolute;
    left: ${(props: any) => props?.left};
    top: -35px;
    height: 2px;
    width: ${(props: any) => props?.width};
    background-color: lightgray;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props: any) => props['data-gap']};

`;

export const IconAdd = styled(Icon)`
  width: 16px;
  height: 16px;

  fill: white;
`;

export const IconEdit = styled(Edit)`
  width: 16px;
  height: 16px;

  fill: white;
`;

export const IconDone = styled(Done)`
  width: 16px;
  height: 16px;

  fill: white;
`;

export const IconDelete = styled(Icon)`
  width: 16px;
  height: 16px;

  transform: rotate(45deg);

  fill: white;
`;

export const ButtonAdd = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
  border: none;
  border-radius: 50%;

  background-color: lightgray;

  &.is-hidden {
    display: none;
  }

  &:hover {
    background-color: white;
    transition: all 200ms ease;

    & ${IconAdd} {
      fill: lightgray;

      transition: all 200ms ease;
    }
  }
`;

export const ButtonEdit = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
  border: none;
  border-radius: 50%;

  background-color: green;

  /* & ${IconEdit} {
display: none;
    } */

  &.edit {
    background-color: lightgray;

    /* & ${IconDone} {
display: none;
    } */
  }

  &:hover {
    background-color: white;
    transition: all 200ms ease;

    & ${IconDone} {
      fill: green;

      transition: all 200ms ease;
    }
  }

  &.edit:hover {
    background-color: white;
    transition: all 200ms ease;

    & ${IconEdit} {
      fill: lightgray;

      transition: all 200ms ease;
    }
  }
`;

export const ButtonDelete = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
  border: none;
  border-radius: 50%;

  background-color: orange;

  &.delete {
    background-color: red;
  }

  &:hover {
    background-color: white;
    transition: all 200ms ease;

    & ${IconDelete} {
      fill: orange;

      transition: all 200ms ease;
    }
  }

  &.delete:hover {
    background-color: white;
    transition: all 200ms ease;

    & ${IconDelete} {
      fill: red;

      transition: all 200ms ease;
    }
  }
`;

export const Name = styled.p`
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: 30px;
  border: 1px dotted gray;
  border-radius: 5px;
  padding: 20px;
  margin: 0;

  font-size: 24px;
  line-height: 0.8;

  background-color: white;
`;

export const Input = styled.input`
  width: ${(props: any) => props?.width || "fit-content"};
  min-width: 100px;
  max-width: 400px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 20px;
  margin: 0;

  font-size: 24px;
  line-height: 0.8;
  text-align: center;

  background-color:   ${(props: any) => props['data-background-color']};
  color:   ${(props: any) => props['data-color']};
&:focus, &:focus-within {
background-color: white !important;
color: black;
}
&:disabled {
cursor: move;
}
`;

export const Label = styled.label`
  position: relative;

  height: fit-content;

  &.child::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -35px;
    width: 2px;
    height: 35px;
    background-color: lightgray;

    transform: translateX(-50%);
  }

  &.parent::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -35px;
    width: 2px;
    height: 35px;
    background-color: lightgray;

    transform: translateX(-50%);
  }

&.alone {

}
`;
