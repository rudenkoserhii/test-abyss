import React, { useState, useEffect } from "react";
import {
  Wrapper,
  ButtonAdd,
  ButtonEdit,
  ButtonDelete,
  IconAdd,
  IconEdit,
  IconDone,
  IconDelete,
  Label,
  Input,
  Block,
  Line,
  Column,
} from "./Tree.styled";
import { nanoid } from "nanoid";
import { Modal } from "../Modal/Modal";
import { randomColor } from "../../utils/randomColor";
import { concatObject } from "../../utils/concatObject";

interface TreeProps {
  transitCount(value: number): any;
  zoomValue: number;
}

export const Tree = ({ transitCount, zoomValue }: TreeProps) => {
  const firstColor = randomColor();

  const [xStart, setXStart] = useState<number>(0);
  const [yStart, setYStart] = useState<number>(0);
  const [leftStart, setLeftStart] = useState<number>(0);
  const [topStart, setTopStart] = useState<number>(0);
  const [width, setWidth] = useState<any>({});
  const [left, setLeft] = useState<any>({});
  const [classLabel, setClassLabel] = useState<any>({});
  const [color, setColor] = useState<any>({
    1: firstColor,
  });
  const [disablessInput, setDisablessInput] = useState<any>({});
  const [widthInput, setWidthInput] = useState<any>({});
  const [inputValue, setInputValue] = useState<any>({ first: "Categories" });
  const [columnGap, setColumnGap] = useState<any>({ first: "70px" });
  const [modalVisibility, setModalVisibility] = useState<any>([
    false,
    null,
    "",
  ]);
  const [type, setType] = useState<string>("category");
  const [categoryTree, setCategoryTree] = useState<any[]>([
    {
      id: "first",
      buttonAdd: true,
      buttonEdit: false,
      buttonDelete: false,
      globalLine: 1,
      type: type,
      children: [],
    },
  ]);

  function countParents(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let parent: any = e.target;
    let i: number = 1;
    while (parent.id !== "column-first") {
      parent = parent["parentElement"];
      if (parent.id.split("")[0] === "c") {
        i += 1;
      }
    }
    if (!color || !Object.keys(color).includes(`${i}`)) {
      setColor((prev: any) => concatObject(prev, i, randomColor()));
    }
    return i;
  }

  const handleAddCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    parentId: any,
    value: number
  ) => {
    const backdrop = document.getElementById("backdrop");
    if (backdrop != null) {
      backdrop.style.pointerEvents = "none";
    }

    if (value + 1 > 2) {
      setModalVisibility([true, e, parentId]);
    } else {
      createCategory(e, parentId, type);
    }
  };

  const createCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    parentId: any,
    type: string
  ) => {
    const newCategory = {
      id: nanoid(),
      buttonAdd: false,
      buttonEdit: false,
      buttonDelete: false,
      globalLine: countParents(e),
      type: type,
      children: [],
    };

    setCategoryTree((prevTree: any) => {
      const updatedTree = [...prevTree];
      const parentCategory = findCategoryById(updatedTree, parentId);

      if (parentCategory) {
        parentCategory.children.push(newCategory);
      }
      return updatedTree;
    });
  };

  const onType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setModalVisibility((prev: any) =>
      prev.map((i: any, index: number) => (index === 0 ? false : i))
    );
    const tempType = (e.target as HTMLButtonElement).innerText.toLowerCase();
    setType(tempType);

    createCategory(modalVisibility[1], modalVisibility[2], tempType);
    if ((e.target as HTMLButtonElement).innerText.toLowerCase() === "service") {
      transitCount(1);
    }
  };

  const findCategoryById = (tree: any, categoryId: string) => {
    for (const category of tree) {
      if (category.id === categoryId) {
        return category;
      } else if (category.children.length > 0) {
        const subcategory: any = findCategoryById(
          category.children,
          categoryId
        );
        if (subcategory) {
          return subcategory;
        }
      }
    }

    return null;
  };

  function findParentCategoryForDelete(tree: any, id: string) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        return tree[i];
      } else if (tree[i].children.length > 0) {
        const subcategory: any = findParentCategoryForDelete(
          tree[i].children,
          id
        );
        if (subcategory) {
          return subcategory;
        }
      }
    }
  }

  const findServices = (category: any, count: number) => {
    for (let i = 0; i < category.length; i++) {
      if (category[i].type === "service") {
        count = count + 1;
      }
      if (category[i].children.length > 0) {
        findServices(category[i].children, count);
      }
    }
    console.log(count);
    if (count > 0) {
      transitCount(-1 * count);
    }
  };

  function onDeleteClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
console.log('click')
    const idInput = (
      (e.currentTarget as HTMLButtonElement).parentElement?.parentElement?.parentElement?.parentElement
        ?.firstChild as Element
    ).id.slice(6);
    const idButton = ((e.currentTarget as HTMLButtonElement).previousSibling as Element).id.slice(8);
    if (
      ((e.currentTarget as HTMLButtonElement).previousSibling as Element).classList.contains("edit")
    ) {
      findServices([findCategoryById(categoryTree, idButton)], 0);

      setCategoryTree((prevTree: any) => {
        const updatedTree = [...prevTree];
        const parentCategory = findParentCategoryForDelete(
          updatedTree,
          idInput
        );

        if (parentCategory) {
          parentCategory.children.splice(
            parentCategory.children.findIndex((el: any) => el.id === idButton),
            1
          );
        }
        return updatedTree;
      });
      setClassLabel((prev: any) =>
        Object.fromEntries(
          Object.entries(prev).map((el: any) =>
            el[0] === `label-${idInput}`
              ? [el[0], el[1].split("parent").join("")]
              : el
          )
        )
      );
    } else {
      const tempName = (
        e.currentTarget.parentElement?.firstChild
          ?.firstChild as HTMLInputElement
      ).name;
      setInputValue((prev: any) => concatObject(prev, tempName, ""));
    }
  }

  function onEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = e.currentTarget.id.slice(8);
    const input = document.querySelector(`#input-${id}`);

    if (!(e.currentTarget as HTMLButtonElement).classList.contains("edit")) {
      if ((input as HTMLInputElement).value === "") {
        alert("You must enter the name!");
        e.preventDefault();
        (input as HTMLInputElement).focus();
      } else {
        setCategoryTree((prevTree: any) => {
          const updatedTree = [...prevTree];
          const category = findCategoryById(updatedTree, id);

          if (category) {
            category.buttonAdd = true;
            category.buttonEdit = true;
            category.buttonDelete = true;
          }
          return updatedTree;
        });

        setWidthInput((prev: any) =>
          concatObject(
            prev,
            id,
            `${(input as HTMLInputElement).value.length}ch`
          )
        );

        setDisablessInput((prev: any) => concatObject(prev, `input-${id}`, true));
        const backdrop = document.getElementById("backdrop");
        if (backdrop != null) {
          backdrop.style.pointerEvents = "auto";
        }
      }
    } else {
      setCategoryTree((prevTree: any) => {
        const updatedTree = [...prevTree];
        const category = findCategoryById(updatedTree, id);

        if (category) {
          category.buttonEdit = false;
          category.buttonDelete = false;
        }
        return updatedTree;
      });

      setDisablessInput((prev: any) => concatObject(prev, `input-${id}`, false));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue((prev: any) =>
      concatObject(prev, e.target.name, e.target.value)
    );

    setWidthInput((prev: any) =>
      concatObject(
        prev,
        e.target.id.slice(5),
        `${(e.target as HTMLInputElement).value.length}ch`
      )
    );

    setNet();
  }
  const renderCategory = (category: any, colorForLabel: any) => {
    return (
      <Column
        key={nanoid()}
        id={`column-${category.id}`}
        className="column"
        data-gap={columnGap[`${category.id}`]}
      >
        <Block className={"block"} id={`block-${category.id}`}>
          <Label
            id={`label-${category.id}`}
            className={classLabel[`label-${category.id}`]}
          >
            <Input
              onChange={handleChange}
              type="text"
              name={category.id}
              id={`input-${category.id}`}
              autoFocus
              value={inputValue[`${category.id}`]}
              placeholder={
                category.id === "first"
                  ? "Categories"
                  : `${type.charAt(0).toUpperCase() + type.slice(1)} name`
              }
              data-background-color={
                category.id === "first" || !inputValue[`${category.id}`]
                  ? "white"
                  : colorForLabel
              }
              data-color={category.id === "first" ? "black" : "white"}
              disabled={
                category.id === "first" || disablessInput[`input-${category.id}`]
                  ? true
                  : false
              }
              width={widthInput[`${category.id}`]}
            />
          </Label>
          <ButtonAdd
            id={`buttonA-${category.id}`}
            type="button"
            className={
              category.id !== "first" && !category.buttonAdd
                ? "btn is-hidden"
                : "btn"
            }
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleAddCategory(e, category.id, category.globalLine)
            }
          >
            <IconAdd />
          </ButtonAdd>
          <ButtonEdit
            id={`buttonE-${category.id}`}
            type="submit"
            style={{
              display: `${category.id === "first" && "none"}`,
              pointerEvents: document.activeElement?.id !== `input-'+${category.id}`
                ? "none"
                : "auto",
            }}
            className={category.buttonEdit ? "btn edit" : "btn"}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onEditClick(e)

            }
          >
            <IconEdit
              style={{ display: `${!category.buttonEdit && "none"}` }}
            />
            <IconDone style={{ display: `${category.buttonEdit && "none"}` }} />
          </ButtonEdit>
          <ButtonDelete
            id={`buttonD-${category.id}`}
            type="button"
            style={{
              display: `${category.id === "first" && "none"}`,
              pointerEvents: document
                .getElementById(`input-'+${category.id}`)
                ?.focus()
                ? "none"
                : "auto",
            }}
            className={category.buttonDelete ? "btn delete" : "btn"}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onDeleteClick(e)
            }
          >
            <IconDelete />
          </ButtonDelete>
        </Block>
        {category.children.length > 0 && (
          <Line
            id={`line-${category.id}`}
            className="line"
            width={width[`line-${category.id}`]}
            left={left[`line-${category.id}`]}
          >
            {category.children.map((child: any) =>
              renderCategory(child, color[`${category.globalLine}`])
            )}
          </Line>
        )}
      </Column>
    );
  };

  useEffect(() => {
    setNet();
  }, [categoryTree]);

  function setNet() {
    const labels = document.querySelectorAll("label");
    if (labels != null) {
      for (const label of labels) {
        if ((label as HTMLLabelElement).id !== "label-first") {
          setClassLabel((prev: any) => concatObject(prev, label.id, "child"));
        }
        if ((label?.parentElement as HTMLFormElement).nextSibling) {
          setClassLabel((prev: any) =>
            concatObject(prev, label.id, "parent child")
          );
        }

        if (
          (label?.parentElement as HTMLFormElement).nextSibling &&
          (label as HTMLLabelElement).id === "label-first"
        ) {
          setClassLabel((prev: any) => concatObject(prev, label.id, "parent"));
        }
      }
    }
    const lines = document.querySelectorAll(".line");

    if (lines != null) {
      for (const line of lines) {
        setColumnGap((prev: any) =>
          concatObject(prev, line.id.slice(5), "70px")
        );

        const labelZero = (
          line.children[0].firstChild?.firstChild as HTMLLabelElement
        ).getBoundingClientRect();
        const labelPrev = (
          line.previousSibling?.firstChild as HTMLLabelElement
        ).getBoundingClientRect();

        const lineDiv = (line as HTMLDivElement).getBoundingClientRect();

        let tempLeft =
          (labelZero.right - labelZero.left) / 2 +
          (labelZero.left - lineDiv.left);

        if (line.children.length === 1) {
          let tempWidth =
            (labelPrev.right + labelPrev.left) / 2 -
            (labelZero.right + labelZero.left) / 2;
          if (tempWidth < 0) {
            tempWidth *= -1;
            tempLeft -= tempWidth;
          }

          if (Math.floor(tempWidth) === 0) {
            setClassLabel((prev: any) =>
              Object.fromEntries(
                Object.entries(prev).map((el: any) =>
                  el[0] === `${line.id.slice(5)}`
                    ? [el[0], el[1].split("child").join("")]
                    : el
                )
              )
            );
            setColumnGap((prev: any) =>
              Object.fromEntries(
                Object.entries(prev).map((el: any) =>
                  el[0] === `${line.id.slice(5)}` ? [el[0], "35px"] : el
                )
              )
            );
          }
          setWidth((prev: any) =>
            concatObject(prev, line.id, `${(tempWidth / zoomValue) * 100}px`)
          );

          setLeft((prev: any) =>
            concatObject(prev, line.id, `${(tempLeft / zoomValue) * 100}px`)
          );
        }
        if (line.children.length === 2) {
          const labelNext = (
            line.children[1].firstChild?.firstChild as HTMLLabelElement
          ).getBoundingClientRect();

          let tempWidth =
            (labelNext.right + labelNext.left) / 2 -
            (labelZero.right + labelZero.left) / 2;
          if (tempWidth < 0) {
            tempWidth *= -1;
            tempLeft -= tempWidth;
          }

          setWidth((prev: any) => {
            concatObject(prev, line.id, `${(tempWidth / zoomValue) * 100}px`);
          });
          setLeft((prev: any) => {
            concatObject(prev, line.id, `${(tempLeft / zoomValue) * 100}px`);
          });
        }

        if (line.children.length > 2) {
          const labelLast = (
            line.lastChild?.firstChild?.firstChild as HTMLLabelElement
          ).getBoundingClientRect();

          let tempWidth =
            (labelLast.right + labelLast.left) / 2 -
            (labelZero.right + labelZero.left) / 2;

          if (tempWidth < 0) {
            tempWidth *= -1;
            tempLeft -= tempWidth;
          }

          setWidth((prev: any) => {
            concatObject(prev, line.id, `${(tempWidth / zoomValue) * 100}px`);
          });
          setLeft((prev: any) => {
            concatObject(prev, line.id, `${(tempLeft / zoomValue) * 100}px`);
          });
        }
      }
    }
  }

  function dragStart(e: React.DragEvent<HTMLDivElement>) {
    setXStart(e.clientX);
    setYStart(e.clientY);

    const tree = document.querySelector(".tree") as HTMLDivElement | null;

    if (tree != null) {
      setLeftStart(tree.offsetLeft);
      setTopStart(tree.offsetTop);
    }
  }

  function dragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const xMove = e.clientX - xStart;
    const yMove = e.clientY - yStart;

    const tree = document.querySelector(".tree") as HTMLDivElement | null;

    if (tree != null && tree.offsetParent != null) {
      const positionLeft = tree.offsetLeft + xMove;
      const maxRight = tree.offsetParent.clientWidth;
      const positionTop = tree.offsetTop + yMove;
      const maxBottom = tree.offsetParent.clientHeight;

      if (
        positionLeft < 0 ||
        positionLeft > maxRight ||
        positionTop < 0 ||
        positionTop > maxBottom
      ) {
        tree.style.left = `${leftStart}px`;
        tree.style.top = `${topStart}px`;
      } else {
        tree.style.left = `${positionLeft}px`;
        tree.style.top = `${positionTop}px`;
      }
    }
  }

  return (
    <Wrapper
      className="tree"
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >
      <Column>
        {categoryTree.map((category) => renderCategory(category, ""))}
      </Column>
      {modalVisibility[0] && <Modal type={onType} />}
    </Wrapper>
  );
};
