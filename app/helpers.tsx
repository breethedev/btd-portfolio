export const convertMillisecondsToTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const animateText = (elementId: string) => {
  const textElement = document.getElementById(elementId) as HTMLElement;
  const textContent = textElement.textContent || "";
  textElement.innerHTML = ""; // Clear original text

  for (let i = 0; i < textContent.length; i++) {
    const charSpan = document.createElement("span") as HTMLSpanElement;
    charSpan.textContent = textContent[i];
    charSpan.style.opacity = "0.5"; // Start invisible
    charSpan.style.transition = `opacity 0.5s ease ${i * 0.1}s`; // Staggered transition
    textElement.appendChild(charSpan);
  }

  // Trigger the animation after a short delay
  setTimeout(() => {
    const spans = textElement.querySelectorAll("span") as NodeListOf<HTMLSpanElement>;
    spans.forEach((span) => {
      span.style.opacity = "1"; // Fade in
    });
  }, 100);
};
