import assert from "assert";

beforeEach(() => {
  document.body.innerHTML = `<div class="root"></div>`;
});

test("Run app", () => {
  require("../main");
  assert(document.body.textContent === "Hello, {app_name}");
});
