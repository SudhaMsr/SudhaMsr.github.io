/** Shared by the scroll thread, the particle stream and the contact brain. */
export const BUILD_SECTIONS = ["about", "skills", "projects", "experience", "education"];
export const BUILD_COLORS = ["--v-analytics", "--v-nlp", "--v-ml", "--v-vision", "--v-llm"];

/** Progress broadcast by ScrollThread on every scroll frame. */
export type BuildProgress = {
  /** 0..1 how far the thread has drawn */
  p: number;
  /** sections passed so far (0..5) */
  k: number;
  /** thread x position in viewport pixels */
  x: number;
  /** scroll distance since the last frame */
  dy: number;
};

export const BUILD_EVENT = "build:progress";

declare global {
  interface Window {
    __build?: BuildProgress;
  }
}
