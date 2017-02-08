import Immutable from "immutable"

import { selectedResource } from "../"

describe("selectedResource", () => {
  describe("when there is a database selected", () => {
    const state = Immutable.fromJS({
      router: {
        database: ["a", "b"]
      }
    })

    const selected = selectedResource(state).toJS()

    it("contains database path", () => expect(selected.database.path).toEqual(["a", "b"]))
    it("contains database url", () => expect(selected.database.url).toEqual("/a/b"))
  })

  describe("when there is NO database selected", () => {
    const state = Immutable.fromJS({
      router: {
        database: []
      }
    })

    const selected = selectedResource(state).toJS()

    it("contains empty database path", () => expect(selected.database.path).toEqual([]))
    it("contains root url", () => expect(selected.database.url).toEqual("/"))
  })
})
