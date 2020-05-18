import { render } from "@testing-library/svelte";
import Statusbar from "./Statusbar.svelte";

describe("Statusbar component", () => {
  it("should render correctly", () => {
    const { container } = render(Statusbar);
    const component = container.querySelector("#statusbar");
    const interactionSection = container.querySelector("#interaction");
    const statsSection = container.querySelector("#stats");

    expect(component).toBeInTheDocument();
    expect(interactionSection).toBeInTheDocument();
    expect(statsSection).toBeInTheDocument();
  });
});
