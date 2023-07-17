function createButtonCopy() {
  const footerQuiz = document.querySelector(".sa-assessment-quiz__footer div");
  const buttonNextQuestion = document.querySelector(
    ".sa-assessment-quiz__primary-action"
  );
  const buttonCopy = document.createElement("button");

  buttonCopy.classList.add(
    "button-copy",
    "sa-assessment-quiz__primary-action",
    "artdeco-button",
    "artdeco-button--2",
    "artdeco-button--primary",
    "ember-view"
  );
  buttonCopy.style.cssText = `
    position: absolute;
    left: 220px;
  `;

  footerQuiz.style.cssText = `
    position: relative;
  `;

  buttonCopy.innerText = "Copiar";

  const searchQuestion = () => {
    const questionText = () => {
      const question = document.querySelector(
        ".sa-assessment-quiz__title-question .sa-assessment-quiz__multi-line span"
      ).innerText;

      const complementQuestion =
        document.querySelector(
          ".sa-assessment-quiz__title-detail div p span:nth-child(1)"
        )?.innerText ?? null;
      return `${question}${
        complementQuestion ? `--> (${complementQuestion})` : ""
      }`;
    };
    const alternatives = document.querySelectorAll(
      ".sa-assessment-quiz__response ul li label p"
    );
    const alternativesText = Array.from(alternatives)
      .map((alternativeParagraph, index) => {
        const textDefault = alternativeParagraph.querySelector(
          ".sa-question-basic-multichoice__multiline span:nth-child(2)"
        );

        const alternative = (textDefault ?? alternativeParagraph).innerText;
        const lastCharAlternative = alternative[alternative.length - 1];
        return `${index + 1}) ${
          [";", "."].includes(lastCharAlternative)
            ? alternative
            : `${alternative};`
        }`;
      })
      .join(" ");
    return `${questionText()} ${alternativesText} | Qual alternativa é a correta? `;
  };

  const handleCopy = () => {
    const inputTemp = document.createElement("input");
    inputTemp.value = searchQuestion();
    document.body.appendChild(inputTemp);
    inputTemp.select();
    document.execCommand("copy");
    buttonCopy.innerText = "Copiado!";
    setTimeout(() => {
      buttonCopy.innerText = "Copiar";
    }, 1500);
    document.body.removeChild(inputTemp);
  };

  buttonNextQuestion.addEventListener("click", () => {
    buttonCopy.removeEventListener("click", handleCopy);
    buttonCopy.addEventListener("click", handleCopy);
  });

  document
    .querySelectorAll(".button-copy")
    .forEach((buttons) => buttons.remove());

  buttonCopy.addEventListener("click", handleCopy);
  footerQuiz.appendChild(buttonCopy);
}

createButtonCopy();
