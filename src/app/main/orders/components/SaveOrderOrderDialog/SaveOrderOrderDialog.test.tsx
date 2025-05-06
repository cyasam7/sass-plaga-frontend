import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import OrderDialog from "./OrderDialog"
import { renderWithRedux } from "src/app/shared/test-utils"


describe("SaveOrderOrderDialog", () => {
  it("should render", () => {

    renderWithRedux(<OrderDialog onCancel={() => { }} onSubmit={() => { }} open shouldOpenDialogAssign />)




    expect(true).toBe(true)
  })
})